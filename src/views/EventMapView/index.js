import React, { useState, useContext } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { DataContext } from '../../context/DataContext';
import ButtonLink from '../../components/ButtonLink';
import './EventMapView.css';
import PlacemarkArray from './PlacemarkArray';
import getFullLocationStrByEvent from './getFullLocationStrByEvent';

const EventMapView = () => {
  const [coordinates, setCoordinates] = useState(null);
  const dataContext = useContext(DataContext);
  const { events } = dataContext;

  const mapOnLoadHandler = async ymaps => {
    const newCoordinates = await Promise.all(
      events.map(el => {
        const geocodingStr = getFullLocationStrByEvent(el);

        return ymaps.geocode(geocodingStr).then(result => {
          if (result.geoObjects.get(0)) {
            const {
              _coordinates: coordinatesOfOnePlacemark,
            } = result.geoObjects.get(0).geometry;

            return coordinatesOfOnePlacemark;
          }
          return null;
        });
      }),
    );

    setCoordinates(newCoordinates);
  };

  return (
    <div className="EventMapView">
      <ButtonLink
        to="/events/"
        icon="/icons/icon_arrow_back.svg"
        title="Назад"
        classList={['button-link']}
      />
      <div className="EventMapView__y-maps-wrapper">
        {events.length === 0 ? null : (
          <YMaps query={{ apikey: '041eb1fa-c823-47a2-af45-8056811bd4e5' }}>
            <Map
              modules={['geocode']}
              onLoad={mapOnLoadHandler}
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
              className="EventMapView__yandex-map"
            >
              <PlacemarkArray coordinates={coordinates} />
            </Map>
          </YMaps>
        )}
      </div>
    </div>
  );
};

export default EventMapView;
