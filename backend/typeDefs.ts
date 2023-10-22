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

  type Query {
    car(company: String!, model: String!): Car
    carsByCompany(company: String!): [Car]
    carsByFilter(company: String, year: Int): [Car]
  }
`);