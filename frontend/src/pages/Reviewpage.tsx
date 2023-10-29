import CardForCar from '../components/CardForCar';
import cars from '../data/cars.json';
import allreviews from '../data/reviews.json';
import '../assets/Reviewpage.css';
import { StarRating } from 'star-rating-react-ts';

const Reviewpage = () => {
  // Get all reviews for user (currently hardcoded to user 1)
  const userReviews = allreviews.filter((review) => review?.userID === '1');
  // Get all IDs for cars that are reviewed by user
  const userReviewCarIDs = userReviews.map((review) => review?.carID);
  // Get all cars that are reviewed by user
  const reviewCars = cars.filter(
    (car) => car?.id && userReviewCarIDs.includes(car?.id),
  );

  return (
    <div>
      <div className="car-list">
        {reviewCars.map((car) => (
          <div>
            <div className="car" key={car.id}>
              <CardForCar
                brand={car.brand}
                model={car.model}
                carIMG={car.image}
                showInfo={true}
              />
            </div>
            <div className="star-rating">
              <StarRating
                theme={{ size: 30 }}
                readOnly={true}
                initialRating={
                  userReviews.find((review) => review?.carID === car.id)?.rating
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviewpage;
