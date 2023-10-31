import React from 'react';
import ReactDOM from 'react-dom';
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import '../assets/ScrollingMenu.css';
import CardForCar from '../components/CardForCar';
import { LeftArrow, RightArrow } from './Arrows';
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
        <ScrollMenu 
          LeftArrow={LeftArrow} 
          RightArrow={RightArrow}
          transitionDuration={1000}
          transitionBehavior={"smooth"}
          transitionEase={(t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)}
        >
          {(cars as CarInfo[]).map((car) => (
            <div className="car" key={car.id}>
              <CardForCar
                id={car.id.toString()}
                brand={null}
                model={null}
                carIMG={car.image}
                showInfo={true}
              />
            </div>
          ))}
        </ScrollMenu>
    </div>
  );
};

export default ScrollingMenu;
