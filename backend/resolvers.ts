import mongoose from 'mongoose';
import Car from './models/car'
import Favorite from './models/favorite'
import Review from './models/review'

interface carArgs {
  company: string;
  model: string;
}

interface carsFilters {
  company: string | undefined;
  year: number | undefined;
  carBody: string | undefined;
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

interface orderByArg {
  year?: SortOrder;
  rating?: SortOrder;
}

interface carsArgs {
  filters: carsFilters;
  offset: number;
  orderBy: orderByArg;
}

export const resolvers = {
  Query: {
    car: async (_: any, { company, model }: carArgs) => {
      return await Car.findOne({ company: company, model: model })
    },
    carsByCompany: async (_: any, { company }: { company: string }) => {
      return await Car.find({ company: company })
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
      return await Favorite.find({ userID: userID }).populate('carID').then(res=>console.log(res))
      .catch(error=>console.log(error));
    },
    carReviews: async (_: any, ) => {
      return await Review.find()
    }
  },
  Mutation: {
    addFavorite: async (_: any, { userID, carID }: { userID: string, carID: string }) => {
      const favorite = new Favorite({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        carID: carID
      });
      return await favorite.save();
    },
    addReview: async (_: any, { rating, review, carID, userID }: { rating: number, review: string, carID: string, userID: number }) => {
      const reviewObj = new Review({
        _id: new mongoose.Types.ObjectId(),
        rating: rating,
        review: review,
        carID: carID,
        userID: userID
      });
      return await reviewObj.save();
    }
  }
}