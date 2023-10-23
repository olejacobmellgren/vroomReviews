import Car from './models/car'

interface carArgs {
  company: string;
  model: string;
}

interface carsByCompanyArgs {
  company: string;
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
    carsByCompany: async (_: any, { company }: carsByCompanyArgs) => {
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
    
  }
}