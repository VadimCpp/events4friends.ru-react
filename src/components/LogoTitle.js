import React, { Component } from 'react';
import './LogoTitle.css';

class LogoTitle extends Component {
  render() {
    return (
      // https://codepen.io/anon/pen/EQPRew
      <header class="header">
        <div class="header__text-effect">
          <h2 class="header__neon" data-text="events4friends">events4friends</h2>
          <div class="header__gradient"></div>
          <div class="header__spotlight"></div>
        </div>      
      </header>
    )
  }
}


export default LogoTitle;
