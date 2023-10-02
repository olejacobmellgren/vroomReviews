import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Hello from Homepage</h1>
      <p>This is a basic homepage component.</p>
      <button>
        <Link to="/project2/carpage/123">Go to Carpage</Link>
      </button>
    </div>
  );
};

export default Homepage;