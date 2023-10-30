import mongoose from 'mongoose';
import Car from './models/car';
import Favorite from './models/favorite';
import Review from './models/review';
import User from './models/user';
import { carArgs, carsArgs, userAndCarArgs, addReviewArgs } from './interfaces';

export const resolvers = {
  Query: {
    car: async (_: any, { company, model }: carArgs) => {
      return await Car.findOne({ company: company, model: model });
    },
    carsByCompany: async (_: any, { company }: { company: string }) => {
      return await Car.find({ company: company });
    },
    cars: async (_: any, args: carsArgs) => {
      const { filters, offset, orderBy, searchTerm } = args;

      const [company, ...modelParts] = searchTerm.split(' ');
      const argList = searchTerm.split(' ')
      const argCounter = searchTerm.split(' ').length
      const model = modelParts.join(' ');
      
      if (Object.values(filters).every(value => value === null)) {
        if (argCounter == 1) {
          return Car.find({
            $or: [
              { company: { $regex: new RegExp(searchTerm, 'i') } }, // Case-insensitive company search
              { model: { $regex: new RegExp(searchTerm, 'i') } } // Case-insensitive model search
            ]
          }).limit(12).skip(offset);
        } else if (argCounter == 2 && argList[1] == "") {
          
          return Car.find({
            
            company: { $regex: new RegExp(company, 'i') } // Case-insensitive company search
            
          }).limit(12).skip(offset);
        } else {
          const query: any = {};
          query.company = company
          return Car.find({
            $and: [
              query,
              {
                model: { $regex: new RegExp(model, 'i') } 
              }
            ]
          }).limit(12).skip(offset);
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
              { model: { $regex: new RegExp(searchTerm, 'i') } }
            ]
          }
        ]
      }).sort(sort).limit(12).skip(offset);
      return result;
    },
    favoriteCars: async (_: any, { userID }: { userID: number }) => {
      return await Favorite.find({ userID: userID }).populate('car');
    },
    carReviews: async (_: any, { car }: { car: string }) => {
      return await Review.find({ car: car }).populate('car');
    },
    userReviews: async (_: any, { userID }: { userID: number }) => {
      return await Review.find({ userID: userID }).populate('car');
    },
    userReviewForCar: async (_: any, { userID, car }: userAndCarArgs) => {
      return await Review.findOne({ userID: userID, car: car }).populate('car');
    },
    users: async () => {
      return await User.countDocuments();
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
