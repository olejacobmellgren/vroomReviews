import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
  type Car {
      _id: ID!
      company: String!
      model: String!
      image: String!
      horsepower: String!
      transmissionType: String!
      drivetrain: String!
      numOfDoors: String!
      price: String!
      year: Int!
      carBody: String!
      engineType: String!
      numOfCylinders: String!
      rating: Int!
  }

  type FavoriteCar {
    user: Int!
    car: Car!
  }

  input carsFilters {
    company: String
    year: Int
    carBody: String
  }

  enum Sort {
    asc
    desc
  }
  
  input orderByArg {
    year: Sort
    rating: Sort
  }

  type Query {
    car(company: String!, model: String!): Car
    carsByCompany(company: String!): [Car]
    cars(filters: carsFilters, offset: Int, orderBy: orderByArg): [Car]
  }
`);