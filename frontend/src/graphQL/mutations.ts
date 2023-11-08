import { gql } from '@apollo/client';

// All mutations used in the application are defined here

export const ADD_FAVORITE_CAR = gql`
  mutation AddFavoriteCar($userID: Int!, $car: ID!) {
    addFavorite(userID: $userID, car: $car) {
      userID
      car {
        company
        model
      }
    }
  }
`;

export const REMOVE_FAVORITE_CAR = gql`
  mutation RemoveFavoriteCar($userID: Int!, $car: ID!) {
    removeFavorite(userID: $userID, car: $car) {
      userID
      car {
        company
        model
      }
    }
  }
`;

export const ADD_REVIEW = gql`
  mutation AddReview(
    $userID: Int!
    $car: ID!
    $rating: Int!
    $review: String!
    $username: String!
  ) {
    addReview(
      userID: $userID
      car: $car
      rating: $rating
      review: $review
      username: $username
    ) {
      rating
      review
      username
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($userID: Int!, $car: ID!) {
    removeReview(userID: $userID, car: $car) {
      rating
      review
      username
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($userID: Int!) {
    addUser(userID: $userID) {
      userID
    }
  }
`;
