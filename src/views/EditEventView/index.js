import React, { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import EventForm from '../../components/EventForm';

const EditEventView = () => {
  const routerParams = useParams();

  const { events, editEvent } = useContext(DataContext);
  const { user } = useContext(AuthContext);

  const isAuth = user && !user.isAnonymous;

  const saveHandler = useCallback(
    (event, cb) => {
      editEvent(event, event.id, user, cb);
    },
    [editEvent],
  );

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
    <EventForm editMode isAuth={isAuth} event={event} onSave={saveHandler} />
  );
};

export default EditEventView;
