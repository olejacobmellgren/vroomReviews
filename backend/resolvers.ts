import Car from './models/car';

export const resolvers = {
  carByCompany: async (args: {company: string}) => {
    try {
      // eslint-disable-next-line no-underscore-dangle
      const car = await Car.findOne({ company: args.company}).exec();
      return car;
    } catch (err) {
      throw err;
    }
  },
};