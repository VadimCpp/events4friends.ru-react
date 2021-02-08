import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';

const Header = () => (
  <header className="header">
    <div className="header__first-col">
      <Link className="reset-link-style" to="/">
        <img
          className="header__logo_big"
          src="/img/header_logo.png"
          alt="Header Logo"
        />
        <img
          className="header__logo_small"
          src="/img/header_logo.png"
          alt="Header Logo"
        />
      </Link>
    </div>
    <div className="header__second-col">
      <h1 className="header__title">events4friends</h1>
      <h2 className="header__subtitle">События для друзей</h2>
    </div>
  </header>
);

export default withRouter(Header);
