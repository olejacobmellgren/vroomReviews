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
  const car = cars.find((car) => car?.id === carID);
  const reviews = allreviews.filter((review) => review?.carID === carID);
  const userReview = reviews.find((review) => review?.userID === '1');

  const [activeHeart, setActiveHeart] = useState(false);

  return (
    <div className="carpage-container">
      <div className="top-section">
        <img className="car-image" src={car?.image} alt={car?.image} />
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
              height={100}
              inactiveColor="#fff"
              active={activeHeart}
              onClick={() => setActiveHeart(!activeHeart)}
            />
            <div className="info-container">
              <p className="info">Price: {car?.price}</p>

              <p className="info">Type: {car?.body}</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div>
  );
};

export default Carpage;
