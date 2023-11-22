import { Link } from 'react-router-dom';
import '../assets/CardForCar.css';

function CardForCar({
  brand,
  model,
  carIMG,
  showInfo,
}: {
  brand: string | null;
  model: string | null;
  carIMG: string;
  showInfo: boolean;
}) {
  return (
    <>
      <figure className="card">
        <Link to={`/project2/carpage/${brand}-${model}`}>
          <img src={carIMG} className="car-image" alt={`${brand}-${model}`} />
        </Link>
      </figure>
      {showInfo ? (
        <h1>
          {brand} {model}
        </h1>
      ) : null}
    </>
  );
}
export default CardForCar;
