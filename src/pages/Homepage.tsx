import { Link } from 'react-router-dom';
import DropdownMenu from '../components/DropdownMenu';

const Homepage = () => {
  const filter1 = "Model"
  const options1 = ["Volvo", "BMW", "Volkswagen", "Mercedes", "Alle"]
  const filter2 = "Year"
  const options2 = ["2018", "2017", "2016", "2015", "Alle"]

  return (
    <div>
      <h1>Hello from Homepage</h1>
      <p>This is a basic homepage component.</p>
      <button>
        <Link to="/project2/carpage/123">Go to Carpage</Link>
      </button>
      <DropdownMenu filter={filter1} options={options1} />
      <DropdownMenu filter={filter2} options={options2} />
    </div>
  );
};

export default Homepage;
