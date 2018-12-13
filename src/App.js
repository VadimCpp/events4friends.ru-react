import React, { Component } from 'react';

import { YMInitializer } from 'react-yandex-metrika';
import MainView from './views/MainView.js'
import AppRouter from './AppRouter.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App App-fixed-image">
        <AppRouter />
        <MainView />
    		<div>
    		  /* SNIP */
    		  <YMInitializer accounts={[51441281]} />
    		  /* SNIP */
    		</div>
      </div>
    );
  }
}

export default App;
