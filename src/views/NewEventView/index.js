import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import EventForm from '../../components/EventForm';

const NewEventView = () => {
  const { user } = useContext(AuthContext);
  const { createEvent } = useContext(DataContext);

  const saveHandler = useCallback(
    (event, cb) => {
      createEvent(event, user, cb);
    },
    [createEvent, user],
  );

  const event = {
    id: null,
    name: user && user.displayName,
    contact: user && user.email,
  };

  return (
    <EventForm
      editMode={false}
      event={event}
      isAuth={user && !user.isAnonymous}
      onSave={saveHandler}
    />
  );
};

export default NewEventView;
