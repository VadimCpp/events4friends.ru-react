import React, { Component } from 'react';
import './LogoTitle.css';

class LogoTitle extends Component {
  render() {
    return (
      // https://codepen.io/anon/pen/EQPRew
      <header className="header">
        <div className="header__text-effect">
          <h2 className="header__neon" data-text="events4friends">events4friends</h2>
          <div className="header__gradient"></div>
          <div className="header__spotlight"></div>
        </div>      
      </header>
    )
  }
}


export default LogoTitle;
