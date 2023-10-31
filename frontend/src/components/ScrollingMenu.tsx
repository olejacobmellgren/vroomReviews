import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import '../assets/ScrollingMenu.css';
import CardForCar from '../components/CardForCar';
import { useQuery } from '@apollo/client';
import { GET_CARS_BY_COMPANY } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import { CarCard } from '../types/CarCard';

interface props {
  brand: string;
}

const ScrollingMenu: React.FC<props> = ({ brand }) => {
  const { loading, error, data } = useQuery(GET_CARS_BY_COMPANY, {
    variables: { company: brand },
  });
  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  return (
    <div>
      <ScrollMenu>
        <div className="scrollingMenu">
          {data.carsByCompany.map((data: CarCard) => (
            <div className="car" key={data?.id}>
              <CardForCar
                brand={data.company}
                model={data.model}
                carIMG={data.image}
                showInfo={true}
              />
            </div>
          ))}
        </div>
      </ScrollMenu>
    </div>
  );
};

export default ScrollingMenu;
