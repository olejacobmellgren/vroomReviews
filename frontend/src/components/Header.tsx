import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Header.css';
import logo from '../assets/images/logo.png';
import CloseHamburgerIcon from '../assets/images/Close_Hamburger_icon.png'

const Header = ({
  page,
  setPage,
}: {
  page: string;
  setPage: (page: string) => void;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  const imageUrl = isChecked
  ? CloseHamburgerIcon
  : 'https://www.pngkit.com/png/full/239-2394744_icon-open-nav-icon-white.png';

  // Set page to the page that was selected, and store it in sessionStorage to be able to access it when reloading the page
  function handlePage(page: string) {
    setPage(page);
    sessionStorage.setItem('currentPage', page);
    setIsChecked(false);
  }

  // Toggle the burger menu for mobile
  function toggleCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <header className={`header-container ${isChecked ? 'open' : ''}`}>
      <input
        className="check"
        checked={isChecked}
        onChange={toggleCheckbox}
        type="checkbox"
        id="check"
      />
      <label className={`checkbtn ${isChecked ? 'open' : ''}`} htmlFor="check">
        <img
          className="burger-menu"
          src={imageUrl}
          alt="burger-menu"
          style={{
            height: isChecked ? '3rem' : '2.5rem',
            width: isChecked ? '3rem' : '',
          }}
        />
      </label>
      <NavLink to="/project2" onClick={() => handlePage('home')}>
        <img
          className={
            page === 'home'
              ? `header-logo ${isChecked ? 'open' : ''}`
              : `header-logo gray-text-logo ${isChecked ? 'open' : ''}`
          }
          src={logo}
          alt="site-logo"
        />
      </NavLink>
      <nav className="pages-menu">
        <NavLink
          to="/project2/filtercars"
          className={page === 'filter' ? 'normal' : 'normal grey-text'}
          onClick={() => handlePage('filter')}
        >
          <h1>Search</h1>
        </NavLink>
        <NavLink
          to="/project2/favorites"
          className={page === 'favorites' ? 'normal' : 'normal grey-text'}
          onClick={() => handlePage('favorites')}
        >
          <h1>My Favorites</h1>
        </NavLink>
        <NavLink
          to="/project2/reviewedcars"
          className={page === 'reviews' ? 'bottom-link normal' : 'bottom-link normal grey-text'}
          onClick={() => handlePage('reviews')}
        >
          <h1>My Reviews</h1>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
