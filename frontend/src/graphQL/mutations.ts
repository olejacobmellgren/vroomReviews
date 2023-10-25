import { gql } from '@apollo/client';

export const ADD_FAVORITE_CAR = gql`
  mutation AddFavoriteCar($userID: Int!, $car: String!) {
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
  mutation RemoveFavoriteCar($userID: Int!, $car: String!) {
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
  mutation AddReview($userID: Int!, $car: String!, $rating: Int!, $review: String!, $username: String!) {
    addReview(userID: $userID, car: $car, rating: $rating, review: $review, username: $username) {
      rating
      review
      username
    }
  }
`;

export const REMOVE_REVIEW = gql`
  mutation RemoveReview($userID: Int!, $car: String!) {
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
