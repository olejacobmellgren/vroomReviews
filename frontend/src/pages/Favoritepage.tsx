import CardForCar from '../components/CardForCar';
import '../assets/Favoritepage.css';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import FavoriteButton from '../components/FavoriteButton';
import { CarCard } from '../types/CarCard';
import { NavLink } from 'react-router-dom';
import ShowNameCheckbox from '../components/ShowNameCheckbox';

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
    <main>
      <div className="checkbox-container" style={{marginTop: "80px"}}>
        <ShowNameCheckbox />
      </div>
      {data.favoriteCars.length > 0 ? (
        <section className="car-list">
          {data.favoriteCars.map((data: CarCard) => (
            <figure className="car" key={data?.car.id}>
              <CardForCar
                brand={data.car.company}
                model={data.car.model}
                carIMG={data.car.image}
                showInfo={false}
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
