import { useParams } from 'react-router-dom';
import cars from '../data/cars.json';
import allreviews from '../data/reviews.json';
import { StarRating } from 'star-rating-react-ts';
import ReviewSection from '../components/ReviewSection';
import '../assets/Carpage.css';

const Carpage = () => {

  const { id } = useParams();
  const carID = typeof id === 'string' ? id : '';
  const car = cars.find((car) => car?.id === carID);
  const reviews = allreviews.filter((review) => review?.carID === carID);
  console.log(carID)
  console.log(reviews)
  const userReview = reviews.find((review) => review?.userID === '1');

  return (
    <div className="carpage-container">
      <div className="left-section">
        <img className="car-image" src={car?.image} alt={car?.image} />
        <button
          onClick={() => { }}
          className="add-to-favorites-button"
        >
          Add to favorites
        </button>
      </div>
      <div className="right-section">
        <p className="title">{car?.brand} {car?.model}</p>
        <p className="year">
          {car?.year}
          </p>
        <div className="rating">
          {car && (
            <StarRating readOnly={true} initialRating={car?.rating} />
          )}
          <div className="amount-rating">
          <p>{car?.rating} / 5 </p> <p>|</p>
          <p> {reviews.length} ratings</p>
          </div>
        </div>
        <div className="info-container">
          <p className="info">Price: {car?.price}</p>

          <p className="info">
            Type: {car?.body}
          </p>
          

        </div>
        <ReviewSection userReview={userReview} reviews={reviews} />
      </div>
    </div >
  );
};

export default Carpage;
