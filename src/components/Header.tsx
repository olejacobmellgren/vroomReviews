import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Header.css';

const Header = () => {
  const [page, setPage] = useState('home');
  const [isChecked, setIsChecked] = useState(false);

  function handlePage(page: string) {
    setPage(page);
    setIsChecked(false);
  }

  function toggleCheckbox() {
    setIsChecked(!isChecked);
  }

  return (
    <div className="header-container">
      <input
        className="check"
        checked={isChecked}
        onChange={toggleCheckbox}
        type="checkbox"
        id="check"
      />
      <label className="checkbtn" htmlFor="check">
        <img
          className="burger-menu"
          src="https://www.pngkit.com/png/full/239-2394744_icon-open-nav-icon-white.png"
          alt=""
        />
      </label>
      <ul className="pages-menu">
        <div className="link-flex">
          <NavLink
            to="/project2"
            className={page === 'home' ? 'normal' : 'normal grey-text'}
            onClick={() => handlePage('home')}
          >
            <h1>Home</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/filtercars"
            className={page === 'browse' ? 'normal' : 'normal grey-text'}
            onClick={() => handlePage('browse')}
          >
            <h1>Browse cars</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/favorites"
            className={page === 'favorites' ? 'normal' : 'normal grey-text'}
            onClick={() => handlePage('favorites')}
          >
            <h1>Favorites</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/reviewedcars"
            className={page === 'reviews' ? 'normal' : 'normal grey-text'}
            onClick={() => handlePage('reviews')}
          >
            <h1>Your reviews</h1>
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default Header;
