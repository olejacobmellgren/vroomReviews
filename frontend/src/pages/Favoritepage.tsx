import CardForCar from '../components/CardForCar';
import '../assets/Favoritepage.css';
import { useQuery } from '@apollo/client';
import { GET_FAVORITE_CARS } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import FavoriteButton from '../components/FavoriteButton';
import { useEffect } from 'react';
import { CarElem } from '../types/CarElem';

const Favoritepage = () => {
  const userID = Number(localStorage.getItem('userID'));

  // Get all cars that are favorited by user
  const { loading, error, data, refetch } = useQuery(GET_FAVORITE_CARS, {
    variables: { userID: userID },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  return (
    <div>
      <div className="car-list">
        {data.favoriteCars.map((carElem: CarElem) => (
          <div>
            <div className="car" key={carElem?.car.id}>
              <CardForCar
                brand={carElem.car.company}
                model={carElem.car.model}
                carIMG={carElem.car.image}
                showInfo={false}
              />
            </div>
            <div>
              <FavoriteButton car={carElem?.car.id} refetch={refetch} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritepage;
