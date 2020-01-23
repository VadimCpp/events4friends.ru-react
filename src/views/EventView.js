import React, { Component } from 'react';
import moment from 'moment';
import ButtonLink from '../components/ButtonLink';
import 'moment/locale/ru';
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

    const startDate = event ? moment(event.start).format('LL') : 'Не указано';
    const startTime = event ? moment(event.start).format('HH:mm') : 'Не указано';

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
              <div className="container">
                <div className="event-item container-center main-view-container">            
                  <small className="calendar-name">#{event.name}</small>
                  <p>    
                    <span role="img" aria-label="Date">📅</span>
                    <span className="event-date">{startDate}</span>

                    <span role="img" aria-label="Time">🕗</span>
                    <span className="event-time">{startTime}</span>

                    － «
                    {event.summary}
                    »

                    <span role="img" aria-label="Location">📍</span>
                    {event.location}

                    {event.reference && (
                      <div>
                        <br></br>
                        <a href={event.reference}> Ссылка на источник </a>
                      </div>
                    )}
                  </p>
                  <p>
                    {event.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default EventView;
