import { useParams } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';
import FavoriteButton from '../components/FavoriteButton';
import InfoDropdown from '../components/InfoDropdown';
import '../assets/Carpage.css';
import { CircularProgress, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useQuery } from '@apollo/client';
import {
  GET_CAR,
  GET_USER_REVIEW_FOR_CAR,
  GET_CAR_REVIEWS,
  GET_COMPANY_BY_NAME,
} from '../graphQL/queries';
import Arrow_left from '../assets/images/arrow-left.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/configureStore';
import { toggleShowInfo } from '../redux/showInfoSlice';

const Carpage = () => {
  const dispatch = useDispatch();
  const showCarInfo = useSelector((state: RootState) => state.showInfo.value);

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
  const carName: string = carData?.car.model;
  const carCompany: string = carData?.car.company;
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

  const handlePageBack = () => {
    window.history.back();
  };

  if (carLoading || reviewsLoading || userReviewLoading || companyLoading)
    return <CircularProgress color="warning" />;
  if (carError || reviewsError || userReviewError || companyError)
    console.log(carError, reviewsError, userReviewError, companyError);

  return (
    <>
      <button className="back-button" onClick={handlePageBack}>
        <img src={Arrow_left} className="back-button-arrow" alt="Go back"></img>
        <p>Go back</p>
      </button>
      <div className="carpage-container">
        <div className="first-section">
          <div className="img-wrapper">
            <img className="carpage-image" src={carImg} alt={carName} />
          </div>
          <div className="overview-wrapper">
            <div className="title-wrapper">
              <img className="logo-img" src={companyLogo} alt={carCompany} />
              <h1 className="title"> {carCompany} </h1>
              <p className="title"> {carName} </p>
              <p className="year"> {carYear} </p>
            </div>
            <div className="rating">
              <Rating
                precision={0.5}
                value={carRating}
                emptyIcon={
                  <StarIcon style={{ color: 'white', fontSize: '1.85rem' }} />
                }
                size="large"
                readOnly
              />
              <div className="amount-rating">
                <p>{Math.round(carData?.car?.rating * 10) / 10} / 5 </p>{' '}
                <p>|</p>
                <p> {reviewsData.carReviews.length} ratings</p>
              </div>
            </div>
            <div>
              <FavoriteButton car={carID} />
            </div>
          </div>
        </div>
        <InfoDropdown
          showInfo={showCarInfo}
          toogleShowInfo={() => dispatch(toggleShowInfo())}
          formattedPrice={formattedPrice}
          carDrivetrain={carDrivetrain}
          carBody={carBody}
          carHorsepower={carHorsepower}
          carNumOfDoors={carNumOfDoors}
          carEngineType={carEngineType}
        />
        <div>
          <ReviewSection
            userReview={userReviewData.userReviewForCar}
            reviews={reviewsData.carReviews}
            carID={carID}
          />
        </div>
      </div>
    </>
  );
};

export default Carpage;
