import CardForCar from '../components/CardForCar';
import '../assets/Reviewpage.css';
import { GET_USER_REVIEWS } from '../graphQL/queries';
import { useQuery } from '@apollo/client';
import { CircularProgress, Rating } from '@mui/material';
import { CarCard } from '../types/CarCard';
import { NavLink } from 'react-router-dom';
import ShowNameCheckbox from '../components/ShowNameCheckbox';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';
import StarIcon from '@mui/icons-material/Star';

const Reviewpage = ({ setPage }: { setPage: (page: string) => void }) => {
  const showCarname = useSelector((state: RootState) => state.showName.value);
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are reviewed by user
  const { loading, error, data } = useQuery(GET_USER_REVIEWS, {
    variables: {
      userID: userID,
    },
  });

  // return circular progress if loading, consolelog error if error
  if (loading)
    return (
      <div className="circular-progress-wrapper">
        <CircularProgress color="warning" />
      </div>
    );
  if (error) console.log(error);

  // Update sessionStorage so header shows the correct page
  const handleHome = () => {
    setPage('home');
    sessionStorage.setItem('currentPage', 'home');
  };

  return (
    <main>
      {/* if user has reviews, show checkbox to show car name */}
      {data.userReviews.length > 0 && (
        <div className="checkbox-container" style={{ marginTop: '80px' }}>
          <ShowNameCheckbox />
        </div>
      )}
      {/* if user has reviews, show user reviews, else show text and link to explore */}
      {data.userReviews.length > 0 ? (
        <section className="car-list">
          {data.userReviews.map((data: CarCard, index: number) => (
            <figure className="car" key={`review-${data.car.id}-${index}`}>
              <CardForCar
                brand={data.car.company}
                model={data.car.model}
                carIMG={data.car.image}
                showInfo={showCarname}
              />
              <div className="review-container">
                <Rating
                  value={data.rating}
                  emptyIcon={
                    <StarIcon style={{ color: 'grey', fontSize: '1.85rem' }} />
                  }
                  size="large"
                  readOnly
                />
                <p>- {data.review}</p>
              </div>
            </figure>
          ))}
        </section>
      ) : (
        <p className="no-reviews">
          <h1>You have no reviews yet!</h1>
          <NavLink
            to="/project2"
            className="explore-link"
            onClick={() => handleHome()}
          >
            <h2>Explore cars</h2>
          </NavLink>
        </p>
      )}
    </main>
  );
};

export default Reviewpage;
