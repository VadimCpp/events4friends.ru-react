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
  editService,
  deleteService,
} from './provider/firebase';
import 'moment/locale/ru';

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
  const { user, connectingToFirebase } = useAuth();
  const {
    events,
    services,
    config,
    loadingEvents,
    loadingServices,
  } = useData();

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
        connectingToFirebase,
      }}
    >
      <DataContext.Provider
        value={{
          events,
          services,
          createEvent,
          deleteEvent,
          editEvent,
          createService,
          editService,
          deleteService,
          config,
          loadingEvents,
          loadingServices,
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
