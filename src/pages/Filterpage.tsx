import DropdownMenu from '../components/DropdownMenu';
import { useState } from 'react';
import '../assets/FilterPage.css'
import CardForCar from '../components/CardForCar';
import cars from '../cars/cars.json'

const Filterpage = () => {
  const filters = [
    { name: 'Brand', options: ['Volvo', 'BMW', 'Volkswagen', 'Mercedes', 'All'] },
    { name: 'Year', options: ['2018', '2017', '2016', '2015', 'All'] },
    { name: 'Country', options: ['Germany', 'China', 'USA', 'All'] },
    { name: 'Sort by', options: ['Reviews', 'Rating', 'All'] }
  ];

  // initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false)
  );

  const [visibleCars, setVisibleCars] = useState(12);

  const handleViewMore = () => {
    setVisibleCars(prevVisibleCars => prevVisibleCars + 12);
  };

  // display dropdown for dropdownMenu clicked. The rest is set to false, meaning they are closed.
  // This ensures that only 1 dropdown can be open at a time.
  const toggleDropdown = (index: number) => {
    setDropdownVisibility(dropdownVisibility.map((item, i) => i === index ? !item : false));
  };

  return (
    <>
      <div className="filterMenu">
        {filters.map((filter, index) => (
          <div className="dropdown-flex" key={index}>
            <DropdownMenu
              filter={filter.name}
              options={filter.options}
              isOpen={dropdownVisibility[index]}
              toggleDropdown={() => toggleDropdown(index)}
            />
          </div>
        ))}
      </div>
      <div className="carList">
        {cars.slice(0, visibleCars).map((car) => (
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
      {visibleCars < cars.length && (
        <button onClick={handleViewMore}>View more</button>
      )}
    </>
  );
};

export default Filterpage;
