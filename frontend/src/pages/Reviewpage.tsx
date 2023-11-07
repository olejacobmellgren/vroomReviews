import CardForCar from '../components/CardForCar';
import '../assets/Reviewpage.css';
import { StarRating } from 'star-rating-react-ts';
import { GET_USER_REVIEWS } from '../graphQL/queries';
import { useQuery } from '@apollo/client';
import { CircularProgress } from '@mui/material';
import { CarCard } from '../types/CarCard';
import { NavLink } from 'react-router-dom';

const Reviewpage = () => {
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are reviewed by user
  const { loading, error, data } = useQuery(GET_USER_REVIEWS, {
    variables: {
      userID: userID,
    },
  });

  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  return (
    <div>
      {data.userReviews.length > 0 ? (
        <div className="car-list">
          {data.userReviews.map((data: CarCard, index: number) => (
            <div key={`review-${data.car.id}-${index}`}>
              <div className="car">
                <CardForCar
                  brand={data.car.company}
                  model={data.car.model}
                  carIMG={data.car.image}
                  showInfo={true}
                />
              </div>
              <div className="review-container">
                <StarRating
                  theme={{ size: 30 }}
                  readOnly={true}
                  initialRating={data.rating}
                />
                <p>- {data.review}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-reviews">
          <h1>You have no reviews yet!</h1>
          <NavLink to="/project2" className="explore-link">
            <h2>Explore cars</h2>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Reviewpage;
