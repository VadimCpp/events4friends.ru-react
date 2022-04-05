import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MENU_ITEMS } from '../../enums';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const menuItems = MENU_ITEMS.map(item => (
    <li key={item.string}>
      {item.slug === location.pathname ? (
        <span className="page-navigation__item page-navigation__item--fixed">
          {item.title}
        </span>
      ) : (
        <Link to={item.slug}>
          <span className="page-navigation__item"> {item.title}</span>
        </Link>
      )}
    </li>
  ));

  return (
    <header className="page-header">
      <nav className="page-navigation">
        <ul className="page-navigation__list">{menuItems}</ul>
      </nav>
    </header>
  );
};

export default Header;
