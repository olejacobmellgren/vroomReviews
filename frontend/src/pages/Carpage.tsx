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

  const carID: string = carData?.car.id;
  const carImg: string = carData?.car.image;
  const carName: string = carData?.car.model + ' ' + carData?.car.company;
  const carRating: number = carData?.car.rating;
  const carYear: number = carData?.car.year;
  const carBody: string = carData?.car.carBody;
  const carDrivetrain: string = carData?.car.drivetrain;
  const carHorsepower: number = carData?.car.horsepower;
  const carNumOfDoors: number = carData?.car.numOfDoors;
  const carEngineType: string = carData?.car.engineType;
  const formattedPrice = carData?.car
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(carData?.car?.price)
    : '';

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

  const companyLogo: string = companyData?.company.logo;

  if (carLoading || reviewsLoading || userReviewLoading || companyLoading)
    return <CircularProgress color="warning" />;
  if (carError || reviewsError || userReviewError || companyError)
    console.log(carError, reviewsError, userReviewError, companyError);

  return (
    <div className="carpage-container">
      <div className="top-section">
        <img className="carpage-image" src={carImg} alt={carImg} />
        <div>
          <div className="title-wrapper">
            <img className="logo-img" src={companyLogo} />
            <p className="title">{carName}</p>
          </div>
          <p className="year">{carYear}</p>
          <div className="rating">
            <StarRating readOnly={true} initialRating={carRating} />
            <div className="amount-rating">
              <p>{carRating} / 5 </p> <p>|</p>
              <p> {reviewsData.carReviews.length} ratings</p>
            </div>
          </div>
          <FavoriteButton car={carID} />
        </div>
      </div>
      <div className="info">
        <div className="info-container">
          <p className="info-text">Price: {formattedPrice}</p>
          <p className="info-text">Drivetrain: {carDrivetrain}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Type: {carBody}</p>
          <p className="info-text">Horsepower: {carHorsepower}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Number of doors: {carNumOfDoors}</p>
          <p className="info-text">Type of engine: {carEngineType}</p>
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
