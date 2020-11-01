/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faShare } from '@fortawesome/free-solid-svg-icons';
import {
  signIn,
  signOut,
  updateProfile,
  createEvent,
  deleteEvent,
  editEvent,
  fireBaseInitAndAuth,
} from './provider/firebase';
import { initClipboard, dropClipboard } from './provider/clipboard';

import AppRouter from './AppRouter';
import { AuthContext } from './context/AuthContext';
import { DataContext } from './context/DataContext';
import './App.css';

//
// NOTE!
// Add here all new icons used in the app.
//
library.add(faShare);

const initState = {
  user: null,
  services: [],
  config: {
    description: null,
    name: null,
    version: null,
  },
  connectingToFirebase: true,
};

const initEventsState = {
  loadingEvents: true,
  events: [],
};

const firebaseConfig = {
  apiKey: 'AIzaSyBjAQdqx3qkki7MVb6dd1eASw-0UGs2Bg0',
  authDomain: 'events4friends.firebaseapp.com',
  databaseURL: 'https://events4friends.firebaseio.com',
  projectId: 'events4friends',
  storageBucket: 'events4friends.appspot.com',
  messagingSenderId: '610960096409',
  appId: '1:610960096409:web:337ff9ec4ca355a6c28c08',
  measurementId: 'G-4T13RKFFSG',
};

const App = () => {
  const [state, setState] = useState(initState);
  const [eventsState, setEventsState] = useState(initEventsState);

  const unsubscribeFromEventsChanges = () => {};

  useEffect(() => {
    const initAndAuth = async () => {
      await fireBaseInitAndAuth(
        firebaseConfig,
        initState,
        setState,
        setEventsState,
      );
    };

    initClipboard();
    initAndAuth();

    return () => {
      unsubscribeFromEventsChanges();
      dropClipboard();
    };
  }, []);

  const updateProfileHandler = async displayName => {
    const updatedUser = await updateProfile(displayName);
    setState({ ...state, user: updatedUser });
  };

  const { user, connectingToFirebase, services, config } = state;

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateProfile: updateProfileHandler,
        loadingStatuses: {
          connectingToFirebase,
          loadingEvents: eventsState.loadingEvents,
        },
      }}
    >
      <DataContext.Provider
        value={{
          events: eventsState.events,
          createEvent,
          deleteEvent,
          editEvent,
          services,
          config,
        }}
      >
        <div className="App">
          <AppRouter />
        </div>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
