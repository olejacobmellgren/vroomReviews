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
      options: [
        'Ferrari',
        'Lamborghini',
        'Toyota',
        'BMW',
        'Audi',
        'Volvo',
        'Koenigsegg',
        'Ford',
        'Nissan',
        'Porsche',
        'Honda',
        'Tesla',
      ],
    },
    {
      name: 'Year',
      options: [
        '2023',
        '2022',
        '2021',
        '2020',
        '2019',
        '2018',
        '2017',
        '2016',
      ],
    },
    {
      name: 'Body',
      options: [
        'Coupe',
        'SUV',
        'Sedan',
        'Convertible',
        'Hatchback',
        'Truck',
        'Wagon',
        'Sports car',
        'Minivan',
      ],
    },
    {
      name: 'Sort by',
      options: [
        'Years, asc',
        'Years, desc',
        'Rating, asc',
        'Rating, desc',
      ],
    },
  ];

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: sessionStorage.getItem('Brand') || 'All',
    Year: sessionStorage.getItem('Year') || 'All',
    Body: sessionStorage.getItem('Body') || 'All',
    SortBy: sessionStorage.getItem('Sort by') || 'All',
  });

  // Initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false),
  );

  const [visibleCars, setVisibleCars] = useState(12);

  const [shownCars, setShownCars] = useState<CarCard['car'][]>([]);

  // Get cars using lazy query to dynamically fetch cars
  const [loadMoreCars, { data }] = useLazyQuery(GET_CARS);

  // Get search term from sessionStorage, if there is one
  // Makes sure that the search term is not lost when navigating back to the filter page
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem('searchTerm') || '',
  );

  const [limit, setLimit] = useState(
    parseInt(sessionStorage.getItem('visibleCars') || '12'),
  );

  const [totalCount, setTotalCount] = useState(0);

  // Load more cars when the user scrolls to the bottom of the page and clicks "View more"
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

  // Add cars to shownCars when data is fetched
  useEffect(() => {
    if (data?.cars?.cars) {
      setShownCars((prevShownCars) => prevShownCars?.concat(data?.cars?.cars));
      setTotalCount(data?.cars?.totalCount);
    }
  }, [data]);

  // Set search term in sessionStorage when it changes
  useEffect(() => {
    sessionStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  // Set selected filters and if not initial load, reset shownCars and amount of visibleCars
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

  // Display dropdown for dropdownMenu clicked. The rest is set to false, meaning they are closed.
  // This ensures that only 1 dropdown can be open at a time.
  const toggleDropdown = (index: number) => {
    setDropdownVisibility(
      dropdownVisibility.map((item, i) => (i === index ? !item : false)),
    );
  };

  let typingTimer: NodeJS.Timeout;

  // Set search term when user types in search bar only after 250ms, to avoid unnecessary calls to the backend
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

  // Close dropdowns when user clicks outside of them
  const handleFocus = () => {
    if (dropdownVisibility.includes(true)) {
      setDropdownVisibility(dropdownVisibility.map(() => false));
    }
  };

  // Load more cars when user clicks "View more"
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
      {(searchTerm !== '' ||
        (Object.values(selectedFilters).filter((filter) => filter !== 'All')
          .length !== 0 &&
          !(
            Object.values(selectedFilters).filter((filter) => filter !== 'All')
              .length === 1 && selectedFilters.SortBy !== 'All'
          ))) && (
        <div className="resultCounter">
          <p>Found {totalCount} cars</p>
        </div>
      )}
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
      {shownCars.length != 0 && (
        <div className="resultCounter">
          <p>
            Showing {shownCars.length} of {totalCount} cars
          </p>
        </div>
      )}
      <div className="view-more-button">
        {visibleCars < totalCount ? (
          <button onClick={handleViewMore}>View more</button>
        ) : null}
      </div>
    </>
  );
};

export default Filterpage;
