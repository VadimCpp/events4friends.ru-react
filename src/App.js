import React, { Component } from 'react';
import AppRouter from './AppRouter.js'
import LogoTitle from './components/LogoTitle.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App App-fixed-image">
        <LogoTitle />
        <AppRouter />
      </div>
    );
  }
}

export default App;
