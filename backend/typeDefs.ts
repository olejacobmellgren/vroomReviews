import { buildSchema } from 'graphql';

// GraphQL schema with type definitions, queries, and mutations
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
      rating: Float!
  }

  type Favorite {
    id: ID!
    userID: Int!
    car: Car!
  }

  type Review {
    id: ID!
    rating: Int!
    review: String!
    userID: Int!
    car: Car!
    username: String!
  }

  type User { 
    id: ID!
    userID: Int!
  }

  type Company {
    id: ID!
    name: String!
    logo: String!
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
    cars(filters: carsFilters, offset: Int, orderBy: orderByArg, searchTerm: String, limit: Int): [Car]
    favoriteCars(userID: Int!): [Favorite]
    carReviews(car: ID!): [Review]
    userReviews(userID: Int!): [Review]
    userReviewForCar(userID: Int!, car: ID!): Review
    userCount: Int
    companies: [Company]
    company(name: String!): Company
  }

  type Mutation {
    addFavorite(userID: Int!, car: ID!): Favorite
    removeFavorite(userID: Int!, car: ID!): Favorite
    addReview(userID: Int!, car: ID!, rating: Int!, review: String!, username: String!): Review
    removeReview(userID: Int!, car: ID!): Review
    addUser(userID: Int!): User
  }
`);
