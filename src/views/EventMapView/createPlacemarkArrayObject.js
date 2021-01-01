import React from 'react';
import { Placemark } from 'react-yandex-maps';
import moment from 'moment';

const createEventPlacemark = (event, geometry, history) => {
  return (
    <Placemark
      key={event.id}
      geometry={geometry}
      onClick={() => {
        history.push(`/event/${event.id}`);
      }}
      defaultProperties={{
        iconCaption: event.name,
        hintContent: event.location,
        balloonContentBody: `
          <p>${moment(event.start).format('D MMMM YYYY, dddd')}</p>
          <p>${event.description}</p>
        `,
        balloonOnClick: () => {
          history.push(`/event/${event.id}`);
        },
        clusterCaption: `${event.name ? event.name : ''} ${event.location}`,
      }}
      modules={['geoObject.addon.hint', 'geoObject.addon.balloon']}
    />
  );
};

const createPlacemarkArrayObject = (events, coordinates, history) => {
  return events.reduce(
    (accObj, event, i) => {
      if (coordinates[i] !== null) {
        const currentPlacemark = createEventPlacemark(
          event,
          coordinates[i],
          history,
        );

        if (event.timezone === '+0200') {
          accObj.clusterOfKaliningrad.push(currentPlacemark);
        } else if (event.timezone === '+0300') {
          accObj.clusterOfMoscow.push(currentPlacemark);
        } else {
          accObj.otherPlacemarks.push(currentPlacemark);
        }
      }

      return accObj;
    },
    {
      clusterOfKaliningrad: [],
      clusterOfMoscow: [],
      otherPlacemarks: [],
    },
  );
};

export default createPlacemarkArrayObject;
