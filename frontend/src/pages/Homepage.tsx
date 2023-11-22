import ScrollingMenu from '../components/ScrollingMenu';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../graphQL/queries';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
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
  // Get companies to show on homepage
  const { loading, error, data } = useQuery(GET_COMPANIES, {
    variables: {
      offset: visibleBrands,
      limit: increment,
    },
  });

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setVisibleBrands((value - 1) * increment);
    sessionStorage.setItem(
      'visibleBrands',
      ((value - 1) * increment).toString(),
    );
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (loading) return <CircularProgress color="warning" />;
  if (error) console.log(error);

  return (
    <>
      {data.companies.companies.map((data: company, index: number) => (
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
      <div className="pagination">
        <Pagination
          count={Math.round(data.companies.totalCount / 3)}
          defaultPage={Math.round(visibleBrands / 3) + 1}
          size="large"
          onChange={handlePageChange}
          siblingCount={0}
        />
      </div>
    </>
  );
};

export default Homepage;
