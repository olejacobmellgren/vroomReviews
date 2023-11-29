import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import '../assets/Homepage.css';
import CardForCar from './CardForCar';
import { LeftArrow, RightArrow } from './Arrows';
import { useQuery } from '@apollo/client';
import { GET_CARS_BY_COMPANY, GET_CARS } from '../graphQL/queries';
import { CircularProgress, Rating } from '@mui/material';
import { Car } from '../types/Car';
import StarIcon from '@mui/icons-material/Star';

interface props {
  brand: string;
}

const ScrollingMenu: React.FC<props> = ({ brand }) => {
  let loading, error, data;
  if (brand === "TopRatedCar") {
      ({ loading, error, data } = useQuery(GET_CARS, {
      variables: {
        filters: {
          company: null,
          carBody: null,
        },
        offset: 0,
        orderBy: {
          year: null,
          price: null,
          rating: "desc",
        },
        searchTerm: "",
        limit: 10,
        priceRange: [0, 100000],
        yearRange: [1943, 2023],
      },
    }));
  } else {
    ({ loading, error, data } = useQuery(GET_CARS_BY_COMPANY, {
      variables: { company: brand },
    }));
  }
  
  if (loading) return <CircularProgress color="warning" />;
  if (error) console.log(error);

  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      transitionDuration={1000}
      transitionBehavior={'smooth'}
      transitionEase={(t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)}
    >
      {brand === "TopRatedCar" ? (
        data.cars.cars.map((car: Car) => (
          <figure className="car scroll-menu-car" key={car?.id}>
            <CardForCar
              brand={car.company}
              model={car.model}
              carIMG={car.image}
              showInfo={false}
            />
            <div className="review-container">
              <Rating
                value={car.rating}
                emptyIcon={
                  <StarIcon style={{ color: 'grey', fontSize: '1.5rem' }} />
                }
                size="medium"
                readOnly
                disabled
              />
            </div>
          </figure>
        ))
      ) : (
        data.carsByCompany.map((car: Car) => (
          <figure className="car scroll-menu-car" key={car?.id}>
            <CardForCar
              brand={car.company}
              model={car.model}
              carIMG={car.image}
              showInfo={false}
            />
          </figure>
        ))
      )}

    </ScrollMenu>
  );
};

export default ScrollingMenu;
