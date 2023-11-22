import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import '../assets/Homepage.css';
import CardForCar from './CardForCar';
import { LeftArrow, RightArrow } from './Arrows';
import { useQuery } from '@apollo/client';
import { GET_CARS_BY_COMPANY } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import { Car } from '../types/Car';

interface props {
  brand: string;
}

const ScrollingMenu: React.FC<props> = ({ brand }) => {
  const { loading, error, data } = useQuery(GET_CARS_BY_COMPANY, {
    variables: { company: brand },
  });
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
      {data.carsByCompany.map((data: Car) => (
        <figure className="car scroll-menu-car" key={data?.id}>
          <CardForCar
            brand={data.company}
            model={data.model}
            carIMG={data.image}
            showInfo={false}
          />
        </figure>
      ))}
    </ScrollMenu>
  );
};

export default ScrollingMenu;
