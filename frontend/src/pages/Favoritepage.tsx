import CardForCar from '../components/CardForCar';
import '../assets/Favoritepage.css';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import FavoriteButton from '../components/FavoriteButton';
import { CarCard } from '../types/CarCard';
import { NavLink } from 'react-router-dom';

const Favoritepage = ({ setPage }: { setPage: (page: string) => void }) => {
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are favorited by user
  const { loading, error, data } = useQuery(GET_FAVORITE_CARS, {
    variables: { userID: userID },
  });

  if (loading) return <CircularProgress color="warning" />;
  if (error) console.log(error);

  // Update sessionStorage so header shows the correct page
  const handleHome = () => {
    setPage('home');
    sessionStorage.setItem('currentPage', 'home');
  };

  return (
    <div>
      {data.favoriteCars.length > 0 ? (
        <div className="car-list">
          {data.favoriteCars.map((data: CarCard) => (
            <div className="car" key={data?.car.id}>
              <CardForCar
                brand={data.car.company}
                model={data.car.model}
                carIMG={data.car.image}
                showInfo={false}
              />
              <FavoriteButton car={data?.car.id} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-favorites">
          <h1>You have no favorites yet!</h1>
          <NavLink
            to="/project2"
            className="explore-link"
            onClick={() => handleHome()}
          >
            <h2>Explore cars</h2>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Favoritepage;
