import { Link } from 'react-router-dom';
import DropdownMenu from '../components/DropdownMenu';
import { useState } from 'react';

const Homepage = () => {
  const filter1 = 'Model';
  const options1 = ['Volvo', 'BMW', 'Volkswagen', 'Mercedes', 'All'];
  const filter2 = 'Year';
  const options2 = ['2018', '2017', '2016', '2015', 'All'];

  const [dropdown1Visible, setDropdown1Visible] = useState(false);
  const [dropdown2Visible, setDropdown2Visible] = useState(false);

  const toggleDropdown1 = () => {
    setDropdown1Visible(!dropdown1Visible);
    setDropdown2Visible(false); // Close the other dropdown
  };

  const toggleDropdown2 = () => {
    setDropdown2Visible(!dropdown2Visible);
    setDropdown1Visible(false); // Close the other dropdown
  };

  return (
    <div>
      <h1>Hello from Homepage</h1>
      <p>This is a basic homepage component.</p>
      <button>
        <Link to="/project2/carpage/123">Go to Carpage</Link>
      </button>
      <DropdownMenu
        filter={filter1}
        options={options1}
        isOpen={dropdown1Visible}
        toggleDropdown={toggleDropdown1}
      />
      <DropdownMenu
        filter={filter2}
        options={options2}
        isOpen={dropdown2Visible}
        toggleDropdown={toggleDropdown2}
      />
    </div>
  );
};

export default Homepage;
