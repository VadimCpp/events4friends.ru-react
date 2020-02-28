import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare, faSurprise } from '@fortawesome/free-solid-svg-icons';
import AppRouter from './AppRouter.js'
import { AuthContext } from './context/AuthContext'
import './App.css';

class App extends Component {
  componentDidMount() {
    //
    // NOTE!
    // Add here all new icons used in the app.
    //
    library.add(faShare);

    //
    // NOTE!
    // Init clipboard instance once
    //
    this.clipboard = new ClipboardJS('.btn-clipboard');
    this.clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
   
      e.clearSelection();
    });
    this.clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });    
  }

  componentWillUnmount() {
    this.clipboard = null;
    clearTimeout(this.timer);
  }

  render() {
    return (
      <AuthContext.Provider value={{ userName: 'Анон' }}>
        <div className="App">
          <AppRouter />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
