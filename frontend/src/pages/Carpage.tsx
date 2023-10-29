import { useParams } from 'react-router-dom';
import allreviews from '../data/reviews.json';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import FavoriteButton from '../components/FavoriteButton';
import '../assets/Carpage.css';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CAR } from '../graphQL/queries';

const Carpage = () => {
  const { id } = useParams();
  const carID = typeof id === 'string' ? id : '';
  const company = carID?.split('-')[0];
  const model = carID?.split('-')[1];
  // const userID = Number(localStorage.getItem('userID'));

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

  const car = carData?.car.id;

  const reviews = allreviews.filter(
    (review) => review?.carID.toString() === carID,
  );
  const userReview = reviews.find((review) => review?.userID === '1');

  if (carLoading) return <CircularProgress />;
  if (carError) console.log(carError);

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
              <p> {reviews.length} ratings</p>
            </div>
          </div>

          <FavoriteButton car={car} />
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
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div>
  );
};

export default Carpage;
