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
  const increment = 3;
  const [visibleBrands, setVisibleBrands] = useState(
    parseInt(sessionStorage.getItem('visibleBrands') || '0'),
  );
  // Get all companies
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: {
      offset: visibleBrands,
      limit: increment,
    },
  });

  // View next 3 brands on next page
  // Use sessionStorage to stay on the same page after refresh
  const viewNext = () => {
    const VisibleBrandsEnd = visibleBrands + increment;
    if (data.companies.totalCount - VisibleBrandsEnd > increment) {
      setVisibleBrands(VisibleBrandsEnd);
      sessionStorage.setItem('visibleBrands', VisibleBrandsEnd.toString());
    } else {
      setVisibleBrands(data.companies.totalCount - increment);
      sessionStorage.setItem(
        'visibleBrands',
        (data.companies.totalCount - increment).toString(),
      );
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // View previous 3 brands on previous page
  // Use sessionStorage to stay on the same page after refresh
  const viewPrev = () => {
    if (visibleBrands > increment) {
      setVisibleBrands(visibleBrands - increment);
      sessionStorage.setItem(
        'visibleBrands',
        (visibleBrands - increment).toString(),
      );
    } else {
      setVisibleBrands(0);
      sessionStorage.setItem('visibleBrands', (0).toString());
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) return <CircularProgress color="warning" />;
  if (error) console.log(error);

  return (
    <>
      {data.companies.companies
        .map((data: company, index: number) => (
          <div className="conteiner" key={index}>
            <div className="scrollingMenuHeader">
              <div className="element"></div>
              <h1>{data.name}</h1>
              <div className="brand-logo-wrapper">
                <img className="brand-logo" src={data.logo} />
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
