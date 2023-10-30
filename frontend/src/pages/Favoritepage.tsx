import CardForCar from '../components/CardForCar';
import '../assets/Favoritepage.css';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import FavoriteButton from '../components/FavoriteButton';
import { CarCard } from '../types/CarCard';

const Favoritepage = () => {
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are favorited by user
  const { loading, error, data } = useQuery(GET_FAVORITE_CARS, {
    variables: { userID: userID },
  });

  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  return (
    <div>
      <div className="car-list">
        {data.favoriteCars.map((data: CarCard) => (
          <div>
            <div className="car" key={data?.car.id}>
              <CardForCar
                brand={data.car.company}
                model={data.car.model}
                carIMG={data.car.image}
                showInfo={false}
              />
            </div>
            <div>
              <FavoriteButton car={data?.car.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritepage;
