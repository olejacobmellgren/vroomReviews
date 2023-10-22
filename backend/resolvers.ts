import Car from './models/car'

interface carArgs {
  company: string;
  model: string;
}

interface carsByCompanyArgs {
  company: string;
}

interface carsByFilterArgs {
  company: string;
  year: number;
  carBody: string;
}

export const resolvers = {
  Query: {
    car: async (_: any, { company, model }: carArgs) => {
      return await Car.findOne({ company: company, model: model })
    },
    carsByCompany: async (_: any, { company }: carsByCompanyArgs) => {
      return await Car.find({ company: company })
    },
    carsByFilter: async (_: any, { company, year, carBody }: carsByFilterArgs) => {
      return await Car.find({ company: company, year: year, carBody: carBody })
    }

  }
}