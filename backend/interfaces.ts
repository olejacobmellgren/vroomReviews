// Interfaces for the GraphQL resolvers

export interface carArgs {
  company: string;
  model: string;
}

interface carsFilters {
  company: string | undefined;
  year: number | undefined;
  carBody: string | undefined;
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

interface orderByArg {
  year?: SortOrder;
  price?: SortOrder;
  rating?: SortOrder;
}

export interface carsArgs {
  filters: carsFilters;
  offset: number;
  orderBy: orderByArg;
  searchTerm: string;
  limit: number;
  priceRange: number[];
  yearRange: number[];
}

export interface userAndCarArgs {
  userID: number;
  car: string;
}

export interface addReviewArgs {
  rating: number;
  review: string;
  car: string;
  userID: number;
  username: string;
}
