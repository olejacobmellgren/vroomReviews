import DropdownMenu from '../components/DropdownMenu';
import { useState } from 'react';
import '../assets/FilterPage.css';
import CardForCar from '../components/CardForCar';
import cars from '../data/cars.json';
import { Link } from 'react-router-dom';
import { Car } from '../interfaces/Car';

const Filterpage = () => {
  const filters = [
    {
      name: 'Brand',
      options: ['Ferrari', 'Hyundai', 'Toyota', 'BMW', 'Audi', 'Volvo', 'All'],
    },
    { name: 'Year', options: ['2023', '2022', '2021', '2020', '2019', 'All'] },
    { name: 'Body', options: ['Coupe', 'SUV', 'Sedan', 'All'] },
    { name: 'Sort by', options: ['Reviews', 'Rating', 'All'] },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: 'All',
    Year: 'All',
    Body: 'All',
    SortBy: 'All',
  });

  // initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false),
  );

  const [showSearchresults, setShowSearchresults] = useState(false);

  const [visibleCars, setVisibleCars] = useState(12);

  const handleViewMore = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + 12);
  };

  const handleFilterChange = (filterName: string, selectedValue: string) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterName]: selectedValue,
    }));
  };

  // display dropdown for dropdownMenu clicked. The rest is set to false, meaning they are closed.
  // This ensures that only 1 dropdown can be open at a time.
  const toggleDropdown = (index: number) => {
    setDropdownVisibility(
      dropdownVisibility.map((item, i) => (i === index ? !item : false)),
    );
  };

  const applyFilters = (cars: Car[]) => {
    return cars.filter((car) => {
      return filters.every((filter) => {
        if (filter.name === 'Brand' && selectedFilters.Brand !== 'All') {
          return car.brand === selectedFilters.Brand;
        }
        if (filter.name === 'Year' && selectedFilters.Year !== 'All') {
          return car.year.toString() === selectedFilters.Year;
        }
        if (filter.name === 'Body' && selectedFilters.Body !== 'All') {
          return car.carBody === selectedFilters.Body;
        }
        return true;
      });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (dropdownVisibility.includes(true)) {
      setDropdownVisibility(dropdownVisibility.map(() => false));
    }

    if (value.length > 0) {
      setShowSearchresults(true);
    } else {
      setShowSearchresults(false);
    }
  };

  const handleBlur = () => {
    setShowSearchresults(false);
  };

  return (
    <>
      <div className="searchBar">
        <div className="searchBar-wrapper">
          <div className="searchBar-container">
            <input
              type="text"
              className="searchBar-input"
              placeholder="Search for car"
              onChange={handleSearchChange}
              onFocus={handleSearchChange}
              onBlur={handleBlur}
            />
          </div>
          <div
            className={`searchResults ${
              showSearchresults ? 'active' : 'closed'
            }`}
          >
            {cars.slice(4, 7).map((car) => (
              <Link to={`/project2/carpage/${car.id}`}>
                <button className="buttonInsideSearchResults">
                  {car.brand} {car.model}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
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
      <div className="car-list">
        {applyFilters(cars as Car[])
          .slice(0, visibleCars)
          .map((car) => (
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
        {visibleCars < applyFilters(cars as Car[]).length ? (
          <button onClick={handleViewMore}>View more</button>
        ) : null}
      </div>
    </>
  );
};

export default Filterpage;
