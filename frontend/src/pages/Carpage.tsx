import { useParams } from 'react-router-dom';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import FavoriteButton from '../components/FavoriteButton';
import '../assets/Carpage.css';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import {
  GET_CAR,
  GET_USER_REVIEW_FOR_CAR,
  GET_CAR_REVIEWS,
  GET_COMPANY_BY_NAME
} from '../graphQL/queries';
import { c } from 'vitest/dist/reporters-5f784f42.js';

const Carpage = () => {
  const { id } = useParams();
  const car = typeof id === 'string' ? id : '';
  const company = car?.split('-')[0];
  const model = car?.split('-')[1];
  const userID = Number(localStorage.getItem('userID'));

  // Get car information for car
  const {
    loading: carLoading,
    error: carError,
    data: carData,
  } = useQuery(GET_CAR, {
    variables: {
      company: company,
      model: model,
    },
  });

  const carID = carData?.car.id;

  // Get all reviews for car
  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: reviewsData,
  } = useQuery(GET_CAR_REVIEWS, {
    variables: {
      car: carID,
    },
  });

  // Get user review for car
  const {
    loading: userReviewLoading,
    error: userReviewError,
    data: userReviewData,
  } = useQuery(GET_USER_REVIEW_FOR_CAR, {
    variables: {
      userID: userID,
      car: carID,
    },
  });

  // Get company information for car
  const {
    loading: companyLoading,
    error: companyError,
    data: companyData,
  } = useQuery(GET_COMPANY_BY_NAME, {
    variables: {
      name: company,
    },
  });

  if (carLoading || reviewsLoading || userReviewLoading || companyLoading)
    return <CircularProgress color="warning" />;
  if (carError || reviewsError || userReviewError || companyError)
    console.log(carError, reviewsError, userReviewError, companyError);

  console.log(companyData)
  return (
    <div className="carpage-container">
      <div className="top-section">
        <img
          className="carpage-image"
          src={carData?.car?.image}
          alt={carData?.car?.image}
        />
        <div>
          <p className="title">
            {carData?.car?.company} {carData?.car?.model}
          </p>
          <p className="year">{carData?.car?.year}</p>
          <div className="rating">
            {carData && (
              <StarRating
                readOnly={true}
                initialRating={carData?.car?.rating}
              />
            )}
            <div className="amount-rating">
              <p>{carData?.car?.rating} / 5 </p> <p>|</p>
              <p> {reviewsData.carReviews.length} ratings</p>
            </div>
          </div>
          <FavoriteButton car={carID} />
        </div>
      </div>
      <div className="info">
        <div className="info-container">
          <p className="info-text">Price: {carData?.car?.price}</p>
          <p className="info-text">Drivetrain: {carData?.car?.drivetrain}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Type: {carData?.car?.carBody}</p>
          <p className="info-text">Horsepower: {carData?.car?.horsepower}</p>
        </div>
        <div className="info-container">
          <p className="info-text">
            Number of doors: {carData?.car?.numOfDoors}
          </p>
          <p className="info-text">
            Type of engine: {carData?.car?.engineType}
          </p>
        </div>
      </div>
      <div>
        <ReviewSection
          userReview={userReviewData.userReviewForCar}
          reviews={reviewsData.carReviews}
          carID={carID}
        />
      </div>
    </div>
  );
};

export default Carpage;
