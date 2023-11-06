import DropdownMenu from '../components/DropdownMenu';
import { useState, useEffect } from 'react';
import '../assets/FilterPage.css';
import CardForCar from '../components/CardForCar';
import { GET_CARS } from '../graphQL/queries';
import { useLazyQuery } from '@apollo/client';
import { CarCard } from '../types/CarCard';

const Filterpage = () => {
  const filters = [
    {
      name: 'Brand',
      options: ['Ferrari', 'Lamborghini', 'Toyota', 'BMW', 'Audi', 'Volvo', 'Koenigsegg', 'Ford', 'Nissan', 'Porsche', 'Honda', 'Tesla', 'All'],
    },
    { name: 'Year', options: ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', 'All'] },
    { name: 'Body', options: ['Coupe', 'SUV', 'Sedan', 'Convertible', 'Hatchback', 'Truck', 'Wagon', 'Sports car', 'Minivan', 'All'] },
    {
      name: 'Sort by',
      options: [
        'Years, asc',
        'Years, desc',
        'Rating, asc',
        'Rating, desc',
        'All',
      ],
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: sessionStorage.getItem('Brand') || 'All',
    Year: sessionStorage.getItem('Year') || 'All',
    Body: sessionStorage.getItem('Body') || 'All',
    SortBy: sessionStorage.getItem('Sort by') || 'All',
  });

  // initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false),
  );

  const [visibleCars, setVisibleCars] = useState(12);

  const [shownCars, setShownCars] = useState<CarCard['car'][]>([]);

  const [loadMoreCars, { data }] = useLazyQuery(GET_CARS);

  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem('searchTerm') || '',
  );

  const [limit, setLimit] = useState(
    parseInt(sessionStorage.getItem('visibleCars') || '12'),
  );

  useEffect(() => {
    loadMoreCars({
      variables: {
        filters: {
          company:
            selectedFilters.Brand !== 'All' ? selectedFilters.Brand : null,
          year:
            selectedFilters.Year !== 'All'
              ? parseInt(selectedFilters.Year)
              : null,
          carBody: selectedFilters.Body !== 'All' ? selectedFilters.Body : null,
        },
        offset: visibleCars - 12,
        orderBy: {
          year: !selectedFilters.SortBy.includes('Years')
            ? null
            : selectedFilters.SortBy.includes('asc')
            ? 'asc'
            : 'desc',
          rating: !selectedFilters.SortBy.includes('Rating')
            ? null
            : selectedFilters.SortBy.includes('asc')
            ? 'asc'
            : 'desc',
        },
        searchTerm: searchTerm,
        limit: limit,
      },
    });
  }, [loadMoreCars, visibleCars, selectedFilters, searchTerm, limit]);

  useEffect(() => {
    if (data?.cars) {
      setShownCars((prevShownCars) => prevShownCars?.concat(data?.cars));
    }
  }, [data]);

  useEffect(() => {
    sessionStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  const handleFilterChange = (
    filterName: string,
    selectedValue: string,
    initialLoad: boolean,
  ) => {
    setSelectedFilters((prevSelectedFilters) => ({
      ...prevSelectedFilters,
      [filterName === 'Sort by' ? 'SortBy' : filterName]: selectedValue,
    }));
    if (!initialLoad) {
      setShownCars([]);
      setVisibleCars(12);
      setLimit(12);
      sessionStorage.setItem('visibleCars', '12');
    }
  };

  // display dropdown for dropdownMenu clicked. The rest is set to false, meaning they are closed.
  // This ensures that only 1 dropdown can be open at a time.
  const toggleDropdown = (index: number) => {
    setDropdownVisibility(
      dropdownVisibility.map((item, i) => (i === index ? !item : false)),
    );
  };

  let typingTimer: NodeJS.Timeout;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      const value = e.target.value;
      setShownCars([]);
      setVisibleCars(12);
      setLimit(12);
      sessionStorage.setItem('visibleCars', '12');
      setSearchTerm(value);
    }, 250);
  };

  const handleFocus = () => {
    if (dropdownVisibility.includes(true)) {
      setDropdownVisibility(dropdownVisibility.map(() => false));
    }
  };

  const handleViewMore = () => {
    setVisibleCars((prevVisibleCars) => prevVisibleCars + limit);
    const newVisibleCars = limit + visibleCars;
    sessionStorage.setItem('visibleCars', newVisibleCars.toString());
    setLimit(12);
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
              defaultValue={searchTerm}
              onChange={handleSearchChange}
              onFocus={handleFocus}
            />
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
              onSelect={(value, initialLoad) =>
                handleFilterChange(filter.name, value, initialLoad)
              }
            />
          </div>
        ))}
      </div>
      <div className="car-list">
        {shownCars.map((car) => (
          <div className="car" key={car.company + '-' + car.model}>
            <CardForCar
              brand={car.company}
              model={car.model}
              carIMG={car.image}
              showInfo={true}
            />
          </div>
        ))}
      </div>
      <div className="view-more-button">
        {data?.cars.length >= 12 ? (
          <button onClick={handleViewMore}>View more</button>
        ) : null}
      </div>
    </>
  );
};

export default Filterpage;
