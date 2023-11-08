import ScrollingMenu from '../components/ScrollingMenu';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../graphQL/queries';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

interface company {
  name: string;
  logo: string;
}

const Homepage = () => {
  const [visibleBrands, setVisibleBrands] = useState([0,3]);
  // Get all cars that are favorited by user
  const { loading, error, data } = useQuery(GET_COMPANIES, {});
  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  const increment = 3;
  const viewNext = () => {
    if (data.companies.length - visibleBrands[1] > increment) {
      setVisibleBrands([visibleBrands[0] + increment, visibleBrands[1] + increment]);
    }
    else {
      setVisibleBrands([data.companies.length - increment, data.companies.length]);
    }
  };
  const viewPrev = () => {
    if (visibleBrands[0] > increment) {
      setVisibleBrands([visibleBrands[0] - increment, visibleBrands[1] - increment]);
    }
    else {
      setVisibleBrands([0,increment]);
    }
  };

  return (
    <>
      {data.companies.slice(visibleBrands[0], visibleBrands[1]).map((data: company) => (
        <div className="conteiner">
          <div className="scrollingMenuHeader">
            <div className="element"></div>
            <h1>{data.name}</h1>
            <div className="brand-logo-wrapper">
              <img className="brand-logo" src={data.logo} alt="noLogo" />
            </div>
          </div>
          <ScrollingMenu brand={data.name} />
        </div>
      ))}
      <div className="view-more-button">
        <button onClick={viewPrev}>Prev Page</button>
        <button onClick={viewNext}>Next Page</button>
      </div>
    </>
  );
};

export default Homepage;
