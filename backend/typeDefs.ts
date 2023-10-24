import { buildSchema } from 'graphql';

export const typeDefs = buildSchema(`
  type Car {
      id: ID!
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

  type Favorite {
    id: ID!
    userID: Int!
    carID: Car!
  }

  type Review {
    id: ID!
    rating: Int!
    review: String!
    userID: Int!
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
    favoriteCars(userID: Int!): [Favorite]
    carReviews(carID: ID!): [Review]
  }

  type Mutation {
    addFavorite(userID: Int!, carID: String!): String
    addReview(userID: Int!, carID: String!, rating: Int!, review: String!): String
  }
`);