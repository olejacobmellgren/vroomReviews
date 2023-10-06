import DropdownMenu from '../components/DropdownMenu';
import { useState } from 'react';
import '../assets/FilterPage.css'
import CardForCar from '../components/CardForCar';
import cars from '../cars/cars.json'

type CarInfo = {
  id: number;
  brand: string;
  model: string;
  carBody: string;
  color: string;
  price: string;
  year: number;
  image: string;
};

const Filterpage = () => {
  const filters = [
    { name: 'Brand', options: ['Ferrari', 'Hyundai', 'Toyota', 'Lexus', 'All'] },
    { name: 'Year', options: ['2018', '2017', '2016', '2015', 'All'] },
    { name: 'Country', options: ['Germany', 'China', 'USA', 'All'] },
    { name: 'Sort by', options: ['Reviews', 'Rating', 'All'] }
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: 'All',
    Year: 'All',
    Country: 'All',
    SortBy: 'All'
  });

  // initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false)
  );

  const [visibleCars, setVisibleCars] = useState(12);

  const handleViewMore = () => {
    setVisibleCars(prevVisibleCars => prevVisibleCars + 12);
  };

  const handleFilterChange = (filterName: string, selectedValue: string) => {
    setSelectedFilters(prevSelectedFilters => ({
      ...prevSelectedFilters,
      [filterName]: selectedValue
    }));
  };

  // display dropdown for dropdownMenu clicked. The rest is set to false, meaning they are closed.
  // This ensures that only 1 dropdown can be open at a time.
  const toggleDropdown = (index: number) => {
    setDropdownVisibility(dropdownVisibility.map((item, i) => i === index ? !item : false));
  };

  const applyFilters = (cars: CarInfo[]) => {
    return cars.filter(car => {
      return filters.every(filter => {
        if (filter.name === 'Brand' && selectedFilters.Brand !== 'All') {
          return car.brand === selectedFilters.Brand;
        }
        if (filter.name === 'Year' && selectedFilters.Year !== 'All') {
          return car.year.toString() === selectedFilters.Year;
        }
        if (filter.name === 'Country' && selectedFilters.Country !== 'All') {
          return car.carBody === selectedFilters.Country;
        }
        return true;
      });
    });
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
              onSelect={(value) => handleFilterChange(filter.name, value)}
            />
          </div>
        ))}
      </div>
      <div className="carList">
        {applyFilters(cars).slice(0, visibleCars).map((car) => (
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
      <div className="view-more-button">
        {visibleCars < applyFilters(cars).length ? (
          <button onClick={handleViewMore}>View more</button>
        ) : null}
      </div>
    </>
  );
};

export default Filterpage;
