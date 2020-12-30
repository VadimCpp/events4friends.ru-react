import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Placemark } from 'react-yandex-maps';
import { DataContext } from '../../context/DataContext';

const PlacemarkArray = ({ coordinates }) => {
  const history = useHistory();
  const dataContext = useContext(DataContext);
  const { events } = dataContext;

  return events.map((el, i) => {
    let geometry = null;

    if (coordinates !== null && coordinates[i] !== null) {
      geometry = coordinates[i];
    }

    return (
      <Placemark
        key={el.id}
        geometry={geometry}
        onClick={() => {
          history.push(`/event/${el.id}`);
        }}
        defaultProperties={{
          iconCaption: el.name,
          hintContent: el.location,
        }}
        modules={['geoObject.addon.hint']}
      />
    );
  });
};

export default PlacemarkArray;
