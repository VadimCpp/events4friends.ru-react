import React, { Component } from 'react';
import LogoTitle from '../components/LogoTitle.js'
import './MainView.css';

class MainView extends Component {
  render() {
    return (
      <div class="main-view">
        <LogoTitle />
        <div>
          Events List
        </div>
        <div>
          Button "Ask question"
        </div>
        <div>
          Button "Donate"
        </div>
      </div>
    )
  }
}


export default MainView;
