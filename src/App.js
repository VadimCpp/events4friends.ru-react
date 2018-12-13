import React, { Component } from 'react';
import { YMInitializer } from 'react-yandex-metrika';
import AppRouter from './AppRouter.js'
import LogoTitle from './components/LogoTitle.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App App-fixed-image">
        <LogoTitle />
        <AppRouter />
    		<div>
    		  <YMInitializer accounts={[51441281]} />
    		</div>
      </div>
    );
  }
}

export default App;
