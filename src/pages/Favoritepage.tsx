import CardForCar from '../components/CardForCar';
import cars from '../data/cars.json';
import allreviews from '../data/reviews.json';
import '../assets/Favoritepage.css';

const Favoritepage = () => {
  // Get all reviews for user (currently hardcoded to user 1)
  const userFavorites = allreviews
    .filter((review) => review?.userID === '1' && review?.isFavorite === true)
    .map((review) => review?.carID);
  // Get all cars that are favorited by user
  const favoriteCars = cars.filter(
    (car) => car?.id && userFavorites.includes(car?.id),
  );

  return (
    <div>
      <div className="car-list">
        {favoriteCars.map((car) => (
          <div className="car" key={car.id}>
            <CardForCar
              id={car.id.toString()}
              brand={car.brand}
              model={car.model}
              carIMG={car.image}
              showInfo={true}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favoritepage;
