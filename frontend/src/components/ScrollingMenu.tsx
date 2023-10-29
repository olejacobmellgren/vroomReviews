import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import '../assets/ScrollingMenu.css';
import CardForCar from '../components/CardForCar';
import cars from '../data/cars.json';

type CarInfo = {
  id: number;
  brand: string;
  model: string;
  image: string;
};

const ScrollingMenu = () => {
  return (
    <div>
      <ScrollMenu>
        <div className="scrollingMenu">
          {(cars as CarInfo[]).map((car) => (
            <div className="car" key={car.id}>
              <CardForCar
                brand={car.brand}
                model={car.model}
                carIMG={car.image}
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
