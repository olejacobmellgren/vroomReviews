import mongoose from 'mongoose';
import Car from './models/car';
import Favorite from './models/favorite';
import Review from './models/review';
import User from './models/user';
import {
  carArgs,
  carsArgs,
  addFavoriteArgs,
  addReviewArgs,
} from './interfaces';

export const resolvers = {
  Query: {
    car: async (_: any, { company, model }: carArgs) => {
      return await Car.findOne({ company: company, model: model });
    },
    carsByCompany: async (_: any, { company }: { company: string }) => {
      return await Car.find({ company: company });
    },
    cars: async (_: any, args: carsArgs) => {
      const { filters, offset, orderBy } = args;

      if (filters === undefined || filters === null) {
        return Car.find().limit(10).skip(offset);
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

      const result = await Car.find(query).sort(sort).limit(10).skip(offset);
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
    users: async () => {
      return await User.countDocuments();
    },
  },
  Mutation: {
    addFavorite: async (_: any, { userID, car }: addFavoriteArgs) => {
      const favorite = new Favorite({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        car: car,
      });
      await favorite.save();
      return favorite.populate('car');
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
