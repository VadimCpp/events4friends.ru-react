import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Clusterer } from 'react-yandex-maps';
import { DataContext } from '../../context/DataContext';
import createPlacemarkArrayObject from './createPlacemarkArrayObject';

const PlacemarkArray = ({ coordinates }) => {
  const history = useHistory();
  const dataContext = useContext(DataContext);
  const { events } = dataContext;

  if (coordinates === null) {
    return null;
  }

  const placemarkArrayObject = createPlacemarkArrayObject(
    events,
    coordinates,
    history,
  );

  return (
    <>
      {placemarkArrayObject.clusterOfKaliningrad.length >= 1 && (
        <Clusterer
          options={{ showInAlphabeticalOrder: true }}
          modules={['clusterer.addon.balloon']}
        >
          {placemarkArrayObject.clusterOfKaliningrad}
        </Clusterer>
      )}
      {placemarkArrayObject.clusterOfMoscow.length >= 1 && (
        <Clusterer
          options={{ showInAlphabeticalOrder: true }}
          modules={['clusterer.addon.balloon']}
        >
          {placemarkArrayObject.clusterOfMoscow}
        </Clusterer>
      )}
      {placemarkArrayObject.otherPlacemarks}
    </>
  );
};

export default PlacemarkArray;
