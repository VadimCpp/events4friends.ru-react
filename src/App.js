import React, { Component } from 'react';
import ClipboardJS from 'clipboard';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import * as firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

import AppRouter from './AppRouter.js'
import { AuthContext } from './context/AuthContext'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null      
    }
  }

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

    //
    // NOTE!
    // Init firebase
    //
    var firebaseConfig = {
      apiKey: "AIzaSyBjAQdqx3qkki7MVb6dd1eASw-0UGs2Bg0",
      authDomain: "events4friends.firebaseapp.com",
      databaseURL: "https://events4friends.firebaseio.com",
      projectId: "events4friends",
      storageBucket: "events4friends.appspot.com",
      messagingSenderId: "610960096409",
      appId: "1:610960096409:web:337ff9ec4ca355a6c28c08",
      measurementId: "G-4T13RKFFSG"
    };

    firebase.initializeApp(firebaseConfig);
  }

  componentWillUnmount() {
    this.clipboard = null;
    clearTimeout(this.timer);
  }

  render() {
    return (
      <AuthContext.Provider value={{
        user: this.state.user,
        signIn: () => {},
        signOut: () => {},
      }}>
        <div className="App">
          <AppRouter />
        </div>
      </AuthContext.Provider>
    );
  }
}

export default App;
