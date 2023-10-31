import ScrollingMenu from '../components/ScrollingMenu';

const brands = ['Ferrari', 'Hyundai', 'BMW', 'Audi', 'Volvo'];

const Homepage = () => {
  return (
    <>
      {brands.map((brand) => (
        <div className="conteiner">
          <div className="scrollingMenuHeader">
            <div className="element"></div>
            <h1>{brand}</h1>
          </div>
          <ScrollingMenu brand={brand}/>
        </div>
      ))}
    </>
  );
};

export default Homepage;
