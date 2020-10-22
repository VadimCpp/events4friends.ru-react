import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import EventForm from '../../components/EventForm';

const NewEventView = () => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const isAuth = authContext.user && !authContext.user.isAnonymous;

  const saveHandler = useCallback(
    (event, cb) => {
      dataContext.createEvent(event, cb);
    },
    [dataContext],
  );

  const event = {
    id: null,
    name: authContext.user && authContext.user.displayName,
    contact: authContext.user && authContext.user.email,
  };

  return (
    <EventForm
      editMode={false}
      event={event}
      isAuth={isAuth}
      onSave={saveHandler}
    />
  );
};

export default NewEventView;
