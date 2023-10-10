import ScrollingMenu from '../components/ScrollingMenu';

const brands = ['Ferrari', 'Hyundai', 'Toyota', 'BMW', 'Audi', 'Volvo'];

const Homepage = () => {
  return (
    <>
      {brands.map(brand => (
        <div className="conteiner">
          <div className="scrollingMenuHeader">
              <div className="element"></div>
              <h1>{brand}</h1>
          </div>
          <ScrollingMenu />
        </div>
      ))}
    </>
  );
};

export default Homepage;
