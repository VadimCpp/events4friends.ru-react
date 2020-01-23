import React, { Component } from 'react';
import ButtonLink from '../components/ButtonLink';
import './EventView.css';

class EventView extends Component {

  /**
   * @param {Array<EventSource>} sources 
   * @param {string} eventId 
   */
  getEventFromSourcesById(sources, eventId) {
    for (let i = 0; i < sources.length; i++) {
      const source = sources[i];
      const events = source.getEvents();
      for (let j = 0; j < events.length; j++) {
        const event = events[j];
        if (event.id === eventId) {
          return event;
        }
      }
    }
    return null;
  }

  render() {
    const eventId = this.props.match.params.id;
    const { eventsSources } = this.props;
    const event = this.getEventFromSourcesById(eventsSources, eventId);

    return (
      <div className="event-view">
        <div className="container container-center event-view-container">
          <div>
            <ButtonLink 
              to="/list" 
              icon="/icons/icon_arrow_back.png"
              title="К списку"
              style={{ 
                width: 175,
                display: 'block',
                marginRight: 'auto',
                marginLeft: 'auto',
                marginBottom: 10,
                borderColor: 'rgba(77, 77, 77, .2)'
              }}
            />
            { !event && (
              <p>
                К сожалению, событие не найдено. ;(
              </p>
            )}
            { event && (
              <p>
                {JSON.stringify(event)}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EventView;
