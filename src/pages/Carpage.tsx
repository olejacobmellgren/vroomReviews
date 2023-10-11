import { useParams } from 'react-router-dom';
import cars from '../data/cars.json';
import allreviews from '../data/reviews.json';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import Heart from '@react-sandbox/heart';
import '../assets/Carpage.css';
import { useState } from 'react';

const Carpage = () => {
  const { id } = useParams();
  const carID = typeof id === 'string' ? id : '';
  const car = cars.find((car) => car?.id.toString() === carID);
  const reviews = allreviews.filter(
    (review) => review?.carID.toString() === carID,
  );
  const userReview = reviews.find((review) => review?.userID === '1');

  const [activeHeart, setActiveHeart] = useState(
    userReview?.isFavorite || false,
  );

  return (
    <div className="carpage-container">
      <div className="top-section">
        <img className="carpage-image" src={car?.image} alt={car?.image} />
        <div>
          <p className="title">
            {car?.brand} {car?.model}
          </p>
          <p className="year">{car?.year}</p>
          <div className="rating">
            {car && <StarRating readOnly={true} initialRating={car?.rating} />}
            <div className="amount-rating">
              <p>{car?.rating} / 5 </p> <p>|</p>
              <p> {reviews.length} ratings</p>
            </div>
          </div>

          <div className="heart-info-container">
            <Heart
              width={100}
              className="heart"
              height={100}
              inactiveColor="#fff"
              active={activeHeart}
              onClick={() => setActiveHeart(!activeHeart)}
            />
          </div>
        </div>
      </div>
      <div className="info">
        <div className="info-container">
          <p className="info-text">Price: {car?.price}</p>
          <p className="info-text">Drivetrain: {car?.drivetrain}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Type: {car?.carBody}</p>
          <p className="info-text">Horsepower: {car?.horsepower}</p>
        </div>
        <div className="info-container">
          <p className="info-text">Number of doors: {car?.numOfDoors}</p>
          <p className="info-text">Type of engine: {car?.engineType}</p>
        </div>
      </div>
      <div>
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div>
  );
};

export default Carpage;
