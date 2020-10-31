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
  createService,
} from './provider/firebase';

import AppRouter from './AppRouter';
import { AuthContext } from './context/AuthContext';
import { DataContext } from './context/DataContext';
import './App.css';

import useAuth from './hooks/useAuth';
import useData from './hooks/useData';

//
// NOTE!
// Add here all new icons used in the app.
//
library.add(faShare);

const App = () => {
  const { user } = useAuth();
  const { events, services, config } = useData();

  //
  // NOTE!
  // Этот стейт создан только для одного случая, когда пользователь меняет свое ФИО
  //
  // TODO: подумать, как можно спрятать эту логику
  //
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const updateProfileHandler = async displayName => {
    const updatedUser = await updateProfile(displayName);
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        signIn,
        signOut,
        updateProfile: updateProfileHandler,
        loadingStatuses: {
          connectingToFirebase: false,
          loadingEvents: false,
        },
      }}
    >
      <DataContext.Provider
        value={{
          events,
          createEvent,
          deleteEvent,
          editEvent,
          createService,
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
