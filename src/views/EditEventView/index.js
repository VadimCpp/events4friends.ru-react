import React, { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import EventForm from '../../components/EventForm';

const EditEventView = () => {
  const { user } = useContext(AuthContext);
  const { events, editEvent } = useContext(DataContext);

  const saveHandler = useCallback(
    (event, cb) => {
      editEvent(event, event.id, user, cb);
    },
    [editEvent, user],
  );

  const routerParams = useParams();
  let event = { id: null };
  if (routerParams.id) {
    const filteredEvents =
      events && events.filter(evt => evt.id === routerParams.id);
    if (filteredEvents.length) {
      // eslint-disable-next-line prefer-destructuring
      event = filteredEvents[0];
    }
  }

  return (
    <EventForm
      editMode
      isAuth={user && !user.isAnonymous}
      event={event}
      onSave={saveHandler}
    />
  );
};

export default EditEventView;
