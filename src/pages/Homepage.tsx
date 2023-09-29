import { Link } from 'react-router-dom';
import DropdownMenu from '../components/DropdownMenu';

const Homepage = () => {
  const filter = "Year"
  const options = ["2018", "2017", "2016", "2015"]

  return (
    <div>
      <h1>Hello from Homepage</h1>
      <p>This is a basic homepage component.</p>
      <button>
        <Link to="/project2/carpage/123">Go to Carpage</Link>
      </button>
      <DropdownMenu filter={filter} options={options} />
    </div>
  );
};

export default Homepage;
