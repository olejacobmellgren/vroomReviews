import { ScrollMenu } from "react-horizontal-scrolling-menu";
import CardForCar from '../components/CardForCar';
import cars from '../data/cars.json';

type CarInfo = {
  id: number;
  brand: string;
  model: string;
  image: string;
  horsepower: string;
  torque: string;
  transmissionType: string;
  drivetrain: string;
  fuelEconomy: string;
  numOfDoors: number;
  price: string;
  year: number;
  carBody: string;
  engineType: string;
  numOfCylinders: number;
  rating: number;
};

const ScrollingMenu = () => {

  return (
    <div>
      <ScrollMenu>
        <div className="scrollingMenu">
          {(cars as CarInfo[]).map((car) => (
            <div className="car" key={car.id}>
              <CardForCar
                id={car.id.toString()}
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
  )
}

export default ScrollingMenu;