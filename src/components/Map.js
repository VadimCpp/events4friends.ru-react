import React from "react";
import Moment from "react-moment";
import { EsriProvider } from "leaflet-geosearch";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import { NAMES_CALENDARS } from "../config"; // TODO: удалить
import "./map.css";

class Map extends React.Component {
  state = {
    isLoading: true,
    pins: []
  };

  componentDidUpdate(prevPops, prevState) {
    if (prevPops.pins !== this.props.pins) this.addPins(this.props.allEvents);
  }
  componentDidMount() {
    this.addPins(this.props.allEvents);
  }

  addPins = async events => {
    const provider = new EsriProvider();

    for (const event of events) {
      if (!event.location) continue;

      const result = await provider.search({ query: event.location });

      if (!result[0].x || !result[0].y) continue;

      this.setState(state => {
        const {
          id,
          description,
          location,
          creator: { email },
          start: { dateTime }
        } = event;
        const pins = state.pins.slice();
        pins.push({
          id,
          description,
          location,
          email,
          dateTime,
          geolocation: { lng: result[0].x, lat: result[0].y }
        });
        return { ...state, isLoading: false, pins };
      });
    }
  };

  render() {
    const { pins } = this.state;

    if (!pins.length) return null;

    return (
      <LeafletMap
        bounds={pins.map(({ geolocation: { lat, lng } }) => ({ lat, lng }))}
        zoom={10}
        maxZoom={15}
        attributionControl={true}
        zoomControl={true}
        doubleClickZoom={true}
        scrollWheelZoom={false}
        dragging={true}
        animate={true}
        easeLinearity={0.35}
      >
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />

        {!pins
          ? null
          : pins.map(event => {
              const { lat, lng } = event.geolocation;

              return (
                <Marker key={event.id} position={[lat, lng]}>
                  <Popup>
                    {/* TODO: тег <h5> закоментить, но не удалять */}
                    <h5>#{NAMES_CALENDARS[event.email] ? NAMES_CALENDARS[event.email].name : event.email}</h5>
                    <p>{event.description.slice(0, 150)}...</p>
                    <p>Место события: {event.location}</p>
                    <p>
                      Начало:{" "}
                      <Moment format={"DD MMM HH:mm"}>{event.dateTime}</Moment>
                    </p>
                  </Popup>
                </Marker>
              );
            })}
      </LeafletMap>
    );
  }
}

export default Map;
