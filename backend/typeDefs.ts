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
      year: String!
      carBody: String!
      engineType: String!
      numOfCylinders: String!
      rating: Int!
  }
`);