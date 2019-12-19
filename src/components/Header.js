import React, { Component } from 'react';
import HeaderLogo from './Header/header_logo.png';
import './Header.css';

// eslint-disable-next-line no-unused-vars
class Header extends Component {
  render() {
    return(
      <div className="borderbottom">
        <header className="header">
          <img className="header__logo" src={HeaderLogo} alt="Header Logo"/>
          <h1 className="header__title">events4friends</h1>
          <h2 className="header__subtitle">События для друзей</h2>
        </header>
      </div>
    )
  }
}

export default Header;
