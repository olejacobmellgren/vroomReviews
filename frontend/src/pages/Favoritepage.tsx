import CardForCar from '../components/CardForCar';
import '../assets/Favoritepage.css';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import FavoriteButton from '../components/FavoriteButton';
import { CarCard } from '../types/CarCard';
import { NavLink } from 'react-router-dom';
import ShowNameCheckbox from '../components/ShowNameCheckbox';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/configureStore';

const Favoritepage = ({ setPage }: { setPage: (page: string) => void }) => {
  const showCarname = useSelector((state: RootState) => state.showName.value);
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are favorited by user
  const { loading, error, data } = useQuery(GET_FAVORITE_CARS, {
    variables: { userID: userID },
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
      // if user has favorites, show checkbox to show car name
      {data.favoriteCars.length > 0 && (
        <div className="checkbox-container" style={{ marginTop: '80px' }}>
          <ShowNameCheckbox />
        </div>
      )}
      // if user has favorites, show user favorites, else show text and link to explore
      {data.favoriteCars.length > 0 ? (
        <section className="car-list">
          {data.favoriteCars.map((data: CarCard) => (
            <figure className="car" key={data?.car.id}>
              <CardForCar
                brand={data.car.company}
                model={data.car.model}
                carIMG={data.car.image}
                showInfo={showCarname}
              />
              <FavoriteButton car={data?.car.id} />
            </figure>
          ))}
        </section>
      ) : (
        <p className="no-favorites">
          <h1>You have no favorites yet!</h1>
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

export default Favoritepage;
