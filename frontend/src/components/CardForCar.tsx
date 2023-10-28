import { Link } from 'react-router-dom';
import '../assets/CardForCar.css';

function CardForCar({
  id,
  brand,
  model,
  carIMG,
  showInfo,
}: {
  id: string;
  brand: string | null;
  model: string | null;
  carIMG: string;
  showInfo: boolean;
}) {
  return (
    <div>
      <div className="card">
        <Link to={`/project2/carpage/${brand}-${model}`}>
          <img src={carIMG} className="car-image" />
        </Link>
      </div>
      {showInfo ? (
        <div className="car-name">
          <h1>
            {brand} {model}
          </h1>
        </div>
      ) : null}
    </div>
  );
}
export default CardForCar;
