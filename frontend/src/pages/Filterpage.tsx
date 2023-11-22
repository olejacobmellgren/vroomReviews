import DropdownMenu from '../components/DropdownMenu';
import { useState, useEffect } from 'react';
import '../assets/FilterPage.css';
import CardForCar from '../components/CardForCar';
import { GET_CARS } from '../graphQL/queries';
import { useLazyQuery } from '@apollo/client';
import { CarCard } from '../types/CarCard';
import Slider from '@mui/material/Slider';

const Filterpage = () => {
  const [filters, setFilters] = useState([
    {
      name: 'Brand',
      options: [],
    },
    {
      name: 'Body',
      options: [],
    },
    {
      name: 'Sort by',
      options: [
        'Years, asc',
        'Years, desc',
        'Price, asc',
        'Price, desc',
        'Rating, asc',
        'Rating, desc',
      ],
    },
  ]);

  const [selectedFilters, setSelectedFilters] = useState({
    Brand: sessionStorage.getItem('Brand') || 'All',
    Body: sessionStorage.getItem('Body') || 'All',
    SortBy: sessionStorage.getItem('Sort by') || 'All',
  });

  // Initialize each dropdownMenu to be false, meaning options are not shown
  const [dropdownVisibility, setDropdownVisibility] = useState(
    filters.map(() => false),
  );

  const [updateOptionsCounter, setUpdateOptionsCounter] = useState({
    Brand: false,
    Body: false,
    SortBy: false,
  });

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

  const [priceRange, setPriceRange] = useState<number[]>(JSON.parse(sessionStorage.getItem("priceRange") || "[0, 100000]"));

  const [yearRange, setYearRange] = useState<number[]>(JSON.parse(sessionStorage.getItem("yearRange") || "[1943, 2023]"));

  // Load more cars when the user scrolls to the bottom of the page and clicks "View more"
  useEffect(() => {
    loadMoreCars({
      variables: {
        filters: {
          company:
            selectedFilters.Brand !== 'All' ? selectedFilters.Brand : null,
          year: 4 /* Skriv noe her! */,
          carBody: selectedFilters.Body !== 'All' ? selectedFilters.Body : null,
        },
        offset: visibleCars - 12,
        orderBy: {
          year: !selectedFilters.SortBy.includes('Years')
            ? null
            : selectedFilters.SortBy.includes('asc')
              ? 'asc'
              : 'desc',
          price: !selectedFilters.SortBy.includes('Price')
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
        priceRange: priceRange,
        yearRange: yearRange,
      },
    });
  }, [
    loadMoreCars,
    visibleCars,
    selectedFilters,
    searchTerm,
    limit,
    priceRange,
    yearRange,
  ]);

  // Add cars to shownCars when data is fetched
  useEffect(() => {
    if (data?.cars?.cars) {
      setShownCars((prevShownCars) => prevShownCars?.concat(data?.cars?.cars));
      setTotalCount(data?.cars?.totalCount);
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.name === 'Body'
            ? { ...filter, options: data?.cars?.carBodies }
            : filter,
        ),
      );
      setFilters((prevFilters) =>
        prevFilters.map((filter) =>
          filter.name === 'Brand'
            ? { ...filter, options: data?.cars?.carCompanies }
            : filter,
        ),
      );
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
      // Create an object to map filter names to update flags
      const updateFlags: Record<string, boolean> = {
        Body: filterName !== 'Body',
        Brand: filterName !== 'Brand',
      };

      // Set update flags for specified filters
      setUpdateOptionsCounter((prevSelectedFilters) => ({
        ...prevSelectedFilters,
        ...Object.keys(updateFlags).reduce(
          (acc, key) => ({ ...acc, [key]: updateFlags[key] }),
          {},
        ),
      }));
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

  const handlePriceChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setShownCars([]);
    setVisibleCars(12);
    setLimit(12);
    sessionStorage.setItem('visibleCars', '12');
    sessionStorage.setItem('priceRange', JSON.stringify(priceRange))

    const minDistance = 5000;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100000 - minDistance);
        setPriceRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setPriceRange([clamped - minDistance, clamped]);
      }
    } else {
      setPriceRange(newValue as number[]);
    }
  };

  const handleYearChange = (
    _event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setShownCars([]);
    setVisibleCars(12);
    setLimit(12);
    sessionStorage.setItem('visibleCars', '12');
    sessionStorage.setItem('yearRange', JSON.stringify(yearRange))

    const minDistance = 5;

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 2023 - minDistance);
        setYearRange([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setYearRange([clamped - minDistance, clamped]);
      }
    } else {
      setYearRange(newValue as number[]);
    }
  };

  const valueLabelFormat = (value: number) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formattedValue = formatter.format(value);
    return value === 100000 ? `${formattedValue}+` : formattedValue;
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
              updateOptionCounter={
                updateOptionsCounter[
                  filter.name as keyof typeof updateOptionsCounter
                ]
              }
              toggleDropdown={() => toggleDropdown(index)}
              onSelect={(value, initialLoad) =>
                handleFilterChange(filter.name, value, initialLoad)
              }
            />
          </div>
        ))}
      </div>
      <div className="sliderMenu">
        <div className="sliderWrapper">
          <div className="slider">
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              min={0}
              max={100000}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              valueLabelFormat={valueLabelFormat}
              disableSwap
            />
          </div>
          <p>Price range</p>
        </div>
        <div className="sliderWrapper">
          <div className="slider">
            <Slider
              getAriaLabel={() => 'Price range'}
              value={yearRange}
              min={1943}
              max={2023}
              onChange={handleYearChange}
              valueLabelDisplay="auto"
              disableSwap
            />
          </div>
          <p>Year range</p>
        </div>
      </div>
      {totalCount !== 0 &&
        (searchTerm !== '' ||
          selectedFilters.Brand !== 'All' ||
          selectedFilters.Body !== 'All' ||
          JSON.stringify(priceRange) !== JSON.stringify([0, 100000]) ||
          JSON.stringify(yearRange) !== JSON.stringify([1943, 2023])) && (
          <div className="resultCounter">
            <p>Found {totalCount} cars</p>
          </div>
        )}
      {totalCount !== 0 ? (
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
      ) : (
        <div
          className="noResults"
          style={{ marginTop: '100px', textAlign: 'center' }}
        >
          {searchTerm == '' ? (
            <div>
              <h1>No cars found!</h1>
              <h1> Try changing your filters</h1>
            </div>
          ) : (
            <div>
              <h1>No cars found!</h1>
              <h1>Try changing your searchterm</h1>
            </div>
          )}
        </div>
      )}
      {shownCars.length != 0 && totalCount > 12 && (
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
