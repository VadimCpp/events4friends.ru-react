import React, { useContext, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';

import EventForm from '../../components/EventForm';

const EditEventView = () => {
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const routerParams = useParams();
  const isAuth = authContext.user && !authContext.user.isAnonymous;

  const saveHandler = useCallback(
    (event, cb) => {
      dataContext.editEvent(event, event.id, authContext.user, cb);
    },
    [dataContext],
  );

  let event = { id: null };
  if (routerParams.id) {
    // IE 11, если не поддерживать можно использовать Array.find
    const events =
      dataContext.events &&
      dataContext.events.filter(evt => evt.id === routerParams.id);
    if (events.length) {
      // eslint-disable-next-line prefer-destructuring
      event = events[0];
    }
  }

  return (
    <EventForm editMode isAuth={isAuth} event={event} onSave={saveHandler} />
  );
};

export default EditEventView;
