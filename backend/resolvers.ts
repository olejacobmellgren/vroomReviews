import mongoose from 'mongoose';
import Car from './models/car';
import Favorite from './models/favorite';
import Review from './models/review';
import User from './models/user';
import Company from './models/Company';
import { carArgs, carsArgs, userAndCarArgs, addReviewArgs } from './interfaces';

export const resolvers = {
  Query: {
    // Return a single car based on company and model
    car: async (_: any, { company, model }: carArgs) => {
      return await Car.findOne({ company: company, model: model });
    },
    // Return all cars from a single company
    carsByCompany: async (_: any, { company }: { company: string }) => {
      return await Car.find({ company: company });
    },
    // Return all cars fulfilling the given filters
    cars: async (_: any, args: carsArgs) => {
      const { filters, offset, orderBy, searchTerm, limit } = args;

      if (
        Object.values(filters).every((value) => value === null) &&
        Object.values(orderBy).every((value) => value === null)
      ) {
        const [company, ...modelParts] = searchTerm.split(' ');
        const argList = searchTerm.split(' ');
        const argCounter = searchTerm.split(' ').length;
        const model = modelParts.join(' ');
        if (argCounter == 1) {
          const result = await Car.find({
            $or: [
              { company: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive company search
              { model: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive model search
            ],
          })
            .limit(limit)
            .skip(offset);
          const totalCount = await Car.countDocuments({
            $or: [
              { company: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive company search
              { model: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive model search
            ],
          });
          return {
            cars: result,
            totalCount: totalCount,
          };
        } else if (argCounter == 2 && argList[1] == '') {
          const query: any = {};
          const newCompany = company.charAt(0).toUpperCase() + company.slice(1);
          query.company = newCompany;
          const result = await Car.find(query).limit(limit).skip(offset);
          const totalCount = await Car.countDocuments(query);
          console.log('Count 2: ' + totalCount);
          return {
            cars: result,
            totalCount: totalCount,
          };
        } else {
          const result = await Car.find({
            $and: [
              { company: { $regex: new RegExp(company, 'i') } }, // Case-insensitive company search
              { model: { $regex: new RegExp(model, 'i') } }, // Case-insensitive model search
            ],
          })
            .limit(limit)
            .skip(offset);

          const totalCount = await Car.countDocuments({
            $and: [
              { company: { $regex: new RegExp(company, 'i') } }, // Case-insensitive company search
              { model: { $regex: new RegExp(model, 'i') } }, // Case-insensitive model search
            ],
          });
          return {
            cars: result,
            totalCount: totalCount,
          };
        }
      }

      // Create a base query object with filter conditions
      const query: any = {};

      if (filters.company) {
        query.company = filters.company;
      }
      if (filters.year) {
        query.year = filters.year;
      }
      if (filters.carBody) {
        query.carBody = filters.carBody;
      }

      // Apply sorting based on orderBy
      const sort: any = {};
      if (orderBy) {
        if (orderBy.year) {
          sort.year = orderBy.year;
        }
        if (orderBy.rating) {
          sort.rating = orderBy.rating;
        }
      }

      const result = await Car.find({
        $and: [
          query,
          {
            $or: [
              { company: { $regex: new RegExp(searchTerm, 'i') } },
              { model: { $regex: new RegExp(searchTerm, 'i') } },
            ],
          },
        ],
      })
        .sort(sort)
        .limit(limit)
        .skip(offset);

      const totalCount = await Car.countDocuments({
        $and: [
          query,
          {
            $or: [
              { company: { $regex: new RegExp(searchTerm, 'i') } },
              { model: { $regex: new RegExp(searchTerm, 'i') } },
            ],
          },
        ],
      });
      return {
        cars: result,
        totalCount: totalCount,
      };
    },
    // Return all cars favorited by a single user, populate() is used to get the car data
    favoriteCars: async (_: any, { userID }: { userID: number }) => {
      return await Favorite.find({ userID: userID }).populate('car');
    },
    // Return all reviews for a single car
    carReviews: async (_: any, { car }: { car: string }) => {
      return await Review.find({ car: car }).populate('car');
    },
    // Return all reviews by a single user
    userReviews: async (_: any, { userID }: { userID: number }) => {
      return await Review.find({ userID: userID }).populate('car');
    },
    // Return a review by a single user for a car
    userReviewForCar: async (_: any, { userID, car }: userAndCarArgs) => {
      return await Review.findOne({ userID: userID, car: car }).populate('car');
    },
    userCount: async () => {
      return await User.countDocuments();
    },
    companies: async () => {
      return await Company.find();
    },
    company: async (_: any, { name }: { name: string }) => {
      return await Company.findOne({ name: name });
    },
  },
  Mutation: {
    addFavorite: async (_: any, { userID, car }: userAndCarArgs) => {
      const favorite = new Favorite({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        car: car,
      });
      await favorite.save();
      return favorite.populate('car');
    },
    removeFavorite: async (_: any, { userID, car }: userAndCarArgs) => {
      return await Favorite.findOneAndDelete({
        userID: userID,
        car: car,
      }).populate('car');
    },
    addReview: async (
      _: any,
      { rating, review, car, userID, username }: addReviewArgs,
    ) => {
      const reviewObj = new Review({
        _id: new mongoose.Types.ObjectId(),
        rating: rating,
        review: review,
        car: car,
        userID: userID,
        username: username,
      });
      const amountOfReviews = await Review.countDocuments({ car: car });
      const carToUpdate = await Car.findById(car);
      if (carToUpdate) {
        if (amountOfReviews === 0) {
          await carToUpdate.updateOne({ rating: rating });
        } else if (carToUpdate.rating) {
          await carToUpdate?.updateOne({
            rating:
              (carToUpdate.rating * amountOfReviews + rating) /
              (amountOfReviews + 1),
          });
        }
      }
      await reviewObj.save();
      await carToUpdate?.save();
      return reviewObj.populate('car');
    },
    removeReview: async (_: any, { userID, car }: userAndCarArgs) => {
      const amountOfReviews = await Review.countDocuments({ car: car });
      const deleteReview = await Review.findOneAndDelete({
        userID: userID,
        car: car,
      }).populate('car');

      const carToUpdate = await Car.findById(car);
      if (carToUpdate) {
        if (amountOfReviews === 1) {
          await carToUpdate.updateOne({ rating: 0 });
        } else if (carToUpdate.rating && deleteReview && deleteReview.rating) {
          await carToUpdate?.updateOne({
            rating:
              (carToUpdate.rating * amountOfReviews - deleteReview.rating) /
              (amountOfReviews - 1),
          });
        }
      }
      await carToUpdate?.save();
      return deleteReview;
    },
    addUser: async (_: any, { userID }: { userID: number }) => {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
      });
      await user.save();
      return user;
    },
  },
};
