import ScrollingMenu from '../components/ScrollingMenu';
import { useQuery } from '@apollo/client';
import { GET_COMPANIES } from '../graphQL/queries';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';

const theme = createTheme({
  palette: {
    primary: red,
  },
});

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

  if (loading)
    return (
      <div className="circular-progress-wrapper">
        <CircularProgress color="warning" />
      </div>
    );
  if (error) console.log(error);

  return (
    <main>
      {visibleBrands == 0 && (
        <section className="scroll-menu">
          <div className="scrolling-menu-header">
            <div className="element" />
            <h1>Top Rated Cars</h1>
            <figure className="brand-logo-wrapper">
              <StarIcon style={{ color: '#FBAF23', fontSize: '4rem' }} />
            </figure>
          </div>
          <ScrollingMenu brand="TopRatedCar" />
        </section>
      )}
      {data.companies.companies.map((data: company, index: number) => (
        <section className="scroll-menu" key={index}>
          <div className="scrolling-menu-header">
            <div className="element" />
            <h1>{data.name}</h1>
            <figure className="brand-logo-wrapper">
              <img className="brand-logo" src={data.logo} alt={data.name} />
            </figure>
          </div>
          <ScrollingMenu brand={data.name} />
        </section>
      ))}
      <ThemeProvider theme={theme}>
        <Pagination
          className="pagination"
          count={Math.round(data.companies.totalCount / 3)}
          defaultPage={Math.round(visibleBrands / 3) + 1}
          size="large"
          onChange={handlePageChange}
          siblingCount={0}
          variant="outlined"
          color="primary"
        />
      </ThemeProvider>
    </main>
  );
};

export default Homepage;
