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
  rating?: SortOrder;
}

export interface carsArgs {
  filters: carsFilters;
  offset: number;
  orderBy: orderByArg;
}

export interface addFavoriteArgs {
  userID: string;
  car: string;
}

export interface addReviewArgs {
  rating: number;
  review: string;
  car: string;
  userID: number;
  username: string;
}
