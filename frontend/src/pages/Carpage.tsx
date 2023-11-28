import { useParams } from 'react-router-dom';
import ReviewSection from '../components/ReviewSection';
import FavoriteButton from '../components/FavoriteButton';
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
import { useState } from 'react';
import Arrow_left from '../assets/images/arrow-left.png'

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
  }

  if (carLoading || reviewsLoading || userReviewLoading || companyLoading)
    return <CircularProgress color="warning" />;
  if (carError || reviewsError || userReviewError || companyError)
    console.log(carError, reviewsError, userReviewError, companyError);

  return (
    <>
      <button className="back-button" onClick={handlePageBack}><img src={Arrow_left} className="back-button-arrow"></img>Go back</button>
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
                  <StarIcon style={{ color: 'white', fontSize: '30px' }} />
                }
                size="large"
                readOnly
              />
              <div className="amount-rating">
                <p>{Math.round(carData?.car?.rating * 10) / 10} / 5 </p> <p>|</p>
                <p> {reviewsData.carReviews.length} ratings</p>
              </div>
            </div>
            <div>
              <FavoriteButton car={carID} />
            </div>
          </div>
        </div>
        <div className="info-section">
          <div
            className="info-wrapper"
            style={showInfo ? { height: '18rem' } : { height: '0' }}
          >
            <div className="info-line"></div>
            <div className="info">
              <table>
                <tbody>
                  <tr>
                    <td>Price</td>
                    <td>{formattedPrice}</td>
                  </tr>
                  <tr>
                    <td>Drivetrain</td>
                    <td>{carDrivetrain}</td>
                  </tr>
                  <tr>
                    <td>Type</td>
                    <td>{carBody}</td>
                  </tr>
                  <tr>
                    <td>Horsepower</td>
                    <td>{carHorsepower}</td>
                  </tr>
                  <tr>
                    <td>Number of doors</td>
                    <td>{carNumOfDoors}</td>
                  </tr>
                  <tr>
                    <td>Type of engine</td>
                    <td>{carEngineType}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="info-line">
            <button
              className="info-button"
              onClick={() => setShowInfo(!showInfo)}
              aria-label="show more info"
            >
              <i
                className={
                  showInfo ? 'arrow-info-button open' : 'arrow-info-button closed'
                }
              />
            </button>
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
    </>
  );
};

export default Carpage;
