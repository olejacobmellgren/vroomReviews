import { useParams } from 'react-router-dom';
import cars from '../data/cars.json';
import allreviews from '../data/reviews.json';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import Heart from 'react-animated-heart';
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
      <div className="right-section">
        <img className="car-image" src={car?.image} alt={car?.image} />
        <div className="heart">
          <Heart
            isClick={activeHeart}
            onClick={() => setActiveHeart(!activeHeart)}
          />
        </div>
      </div>
      <div className="left-section">
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
        <div className="info-container">
          <p className="info">Price: {car?.price}</p>

          <p className="info">Type: {car?.body}</p>
        </div>
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div>
  );
};

export default Carpage;
