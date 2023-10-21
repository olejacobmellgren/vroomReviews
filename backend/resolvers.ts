import Car from './models/car'

interface ResolverArgs {
  company: string;
}

export const resolvers = {
  Query: {
    getCarsByCompany: async (_: any, { company}: ResolverArgs) => {
      return await Car.findOne({ company})
    }
  }
}