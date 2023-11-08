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
  const [visibleBrands, setVisibleBrands] = useState(3);
  // Get all cars that are favorited by user
  const { loading, error, data } = useQuery(GET_COMPANIES, {});
  if (loading) return <CircularProgress />;
  if (error) console.log(error);

  const viewMore = () => {
    if (data.companies.length - visibleBrands > 2) {
      setVisibleBrands(visibleBrands + 2);
    }
    else {
      setVisibleBrands(data.companies.length);
    }
  };

  const getCars = (from:number, to:number) => {
    return (
      data.companies.slice(from,to).map((data: company) => (
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
      ))
    );
  };

  return (
    <>
      {getCars(0, visibleBrands)}
      <div className="view-more-button">
        <button onClick={viewMore}>View more</button>
      </div>
    </>
  );
};

export default Homepage;
