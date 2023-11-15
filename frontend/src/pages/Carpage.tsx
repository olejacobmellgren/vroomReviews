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
  GET_COMPANY_BY_NAME,
} from '../graphQL/queries';
import { useState } from 'react';

const Carpage = () => {
  const [showInfo, setShowInfo] = useState(false);

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

  return (
    <div className="carpage-container">
      <div className="first-section">
        <div className="img-wrapper">
          <img
            className="carpage-image"
            src={carData?.car?.image}
            alt={carData?.car?.image}
          />
        </div>
        <div className="overview-wrapper">
          <div className="title-wrapper">
            <img className="logo-img" src={companyData?.company?.logo} />
            <h1 className="title"> {carData?.car?.company} </h1>
            <p className="title"> {carData?.car?.model} </p>
            <p className="year"> {carData?.car?.year} </p>
          </div>
          <div className="rating">
            {carData && (
              <StarRating
                readOnly={true}
                initialRating={carData?.car?.rating}
              />
            )}
            <div className="amount-rating">
              <p>{Math.round(carData?.car?.rating * 10)/10} / 5 </p> <p>|</p>
              <p> {reviewsData.carReviews.length} ratings</p>
            </div>
          </div>
          <div>
            <FavoriteButton car={carID} />
          </div>
        </div>
      </div>
      <div className="info-section">
        <div className="lol" style={showInfo ? {height: '200px'} : {height: '0px'}}>
          <div className="info-button-wrapper"></div>
          <div className="info">
            <p className="info-text">Price: {carData?.car?.price}</p>
            <p className="info-text">Drivetrain: {carData?.car?.drivetrain}</p>
            <p className="info-text">Type: {carData?.car?.carBody}</p>
            <p className="info-text">Horsepower: {carData?.car?.horsepower}</p>
            <p className="info-text">
              Number of doors: {carData?.car?.numOfDoors}
            </p>
            <p className="info-text">
              Type of engine: {carData?.car?.engineType}
            </p>
          </div>
        </div>
        <div className="info-button-wrapper">
          <button className="info-button" onClick={() => setShowInfo(!showInfo)}>
            <i className="arrow-info-button" style={showInfo ? {transform: 'rotate(-135deg)'} : {  transform: 'rotate(45deg)'}}></i>
          </button>
        </div>
      </div>
  
      {/* <div>
        <ReviewSection
          userReview={userReviewData.userReviewForCar}
          reviews={reviewsData.carReviews}
          carID={carID}
        />
      </div> */}
    </div>
  );
};

export default Carpage;
