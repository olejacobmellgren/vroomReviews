import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/Header.css';

const Header = () => {
  const [page, setPage] = useState('/project2');
  const [isChecked, setIsChecked] = useState(false);

  const currentPathname = window.location.pathname;

  useEffect(() => {
    setPage(currentPathname);
  }, [currentPathname]);

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
            className={page === '/project2' ? 'normal' : 'normal grey-text'}
            onClick={() => handlePage('/project2')}
          >
            <h1>Home</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/filtercars"
            className={
              page === '/project2/filtercars' ? 'normal' : 'normal grey-text'
            }
            onClick={() => handlePage('/project2/filtercars')}
          >
            <h1>Browse cars</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/favorites"
            className={
              page === '/project2/favorites' ? 'normal' : 'normal grey-text'
            }
            onClick={() => handlePage('/project2/favorites')}
          >
            <h1>Favorites</h1>
          </NavLink>
        </div>
        <div className="link-flex">
          <NavLink
            to="/project2/reviewedcars"
            className={
              page === '/project2/reviewedcars' ? 'normal' : 'normal grey-text'
            }
            onClick={() => handlePage('/project2/reviewedcars')}
          >
            <h1>Your reviews</h1>
          </NavLink>
        </div>
      </ul>
    </div>
  );
};

export default Header;
