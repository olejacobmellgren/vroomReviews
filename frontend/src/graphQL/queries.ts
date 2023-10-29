import { gql } from '@apollo/client';

export const GET_CAR = gql`
  query GetCar($company: String!, $model: String!) {
    car(company: $company, model: $model) {
      id
      company
      model
      image
      horsepower
      transmissionType
      drivetrain
      numOfDoors
      price
      year
      carBody
      engineType
      numOfCylinders
      rating
    }
  }
`;

export const GET_CARS_BY_COMPANY = gql`
  query GetCarsByCompany($company: String!) {
    carsByCompany(company: $company) {
      company
      model
      image
    }
  }
`;

export const GET_CARS = gql`
  query GetCars($filters: CarFilters, $offset: Int, $orderBy: CarOrderBy) {
    cars(filters: $filters, offset: $offset, orderBy: $orderBy) {
      company
      model
      image
    }
  }
`;

export const GET_FAVORITE_CARS = gql`
  query GetFavoriteCars($userID: Int!) {
    favoriteCars(userID: $userID) {
      car {
        id
        company
        model
        image
      }
    }
  }
`;

export const GET_CAR_REVIEWS = gql`
  query GetCarReviews($car: String!) {
    carReviews(car: $car) {
      rating
      review
      username
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query GetUserReviews($userID: Int!) {
    userReviews(userID: $userID) {
      rating
      review
      car {
        company
        model
        image
      }
    }
  }
`;

export const GET_USER_COUNT = gql`
  query GetUserCount {
    users
  }
`;
