import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import AppRouter from './AppRouter.js'
import LogoTitle from './components/LogoTitle.js'
import './App.css';

class App extends Component {
  componentDidMount() {
    //
    // NOTE!
    // Add here all new icons used in the app.
    //
    library.add(faShare);
  }
  
  render() {
    return (
      <div className="App">
        <LogoTitle />
        <AppRouter />
      </div>
    );
  }
}

export default App;
