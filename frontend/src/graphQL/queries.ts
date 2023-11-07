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
      id
      company
      model
      image
    }
  }
`;

export const GET_CARS = gql`
  query GetCars(
    $filters: carsFilters
    $offset: Int
    $orderBy: orderByArg
    $searchTerm: String
    $limit: Int
  ) {
    cars(
      filters: $filters
      offset: $offset
      orderBy: $orderBy
      searchTerm: $searchTerm
      limit: $limit
    ) {
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
  query GetCarReviews($car: ID!) {
    carReviews(car: $car) {
      userID
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

export const GET_USER_REVIEW_FOR_CAR = gql`
  query GetUserReviewForCar($userID: Int!, $car: ID!) {
    userReviewForCar(userID: $userID, car: $car) {
      userID
      rating
      review
      username
    }
  }
`;

export const GET_USER_COUNT = gql`
  query GetUserCount {
    users
  }
`;

export const GET_COMPANIES = gql`
  query GetCompanies {
    companies {
      name
      logo
    }
  }
`;