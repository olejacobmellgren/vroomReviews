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
    <div>
      <div className="card">
        <Link to={`/project2/carpage/${brand}-${model}`}>
          <img src={carIMG} className="car-image" alt={`${brand}-${model}`} />
        </Link>
      </div>
      {showInfo ? (
        <div className="car-name">
          <div className="car-title-wrapper">
            <h1 className="car-title">{brand}</h1> 
            <p className="car-title">{model}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default CardForCar;
