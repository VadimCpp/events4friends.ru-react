import React, { Component } from 'react';
import HeaderLogo from './Header/header_logo.png';
import './Header.css';

class Header extends Component {
  render() {
    return(
      <header className="header">
        <div className="header__first-col">
          <a className="header__logo-link" href="/">
            <img className="header__logo" src={HeaderLogo} alt="Header Logo"/>
          </a>
        </div>
        <div className="header__second-col">
          <h1 className="header__title">events4friends</h1>
          <h2 className="header__subtitle">События для друзей</h2>
        </div>
      </header>
    )
  }
}

export default Header;
