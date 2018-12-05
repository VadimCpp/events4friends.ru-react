import React, { Component } from 'react';
import { YMInitializer } from 'react-yandex-metrika';
import MainView from './views/MainView.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App App-fixed-image">
        <MainView />
      </div>
      <div>
        // SNIP
          <YMInitializer accounts={[51441281]} />
        // SNIP
      </div>
    );
  }
}

export default App;
