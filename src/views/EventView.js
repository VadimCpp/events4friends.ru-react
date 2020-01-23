import React, { Component } from 'react';
import moment from 'moment';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink'
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
          return { event, name: source.name };
        }
      }
    }
    return { event: null, name: null };
  }

  render() {
    const eventId = this.props.match.params.id;
    const { eventsSources } = this.props;
    const { event, name } = this.getEventFromSourcesById(eventsSources, eventId);    
    
    const startDate = event ? moment(event.start).format('D MMMM, dddd') : 'Не указано';
    const startTime = event ? moment(event.start).format('HH:mm') : 'Не указано';

    return (
      <div>
        <div>
          <ButtonLink 
            to="/list" 
            icon="/icons/icon_arrow_back.png"
            title="К списку"
            style={{ 
              width: 155,
              display: 'block',
              marginRight: 'auto',
              marginLeft: 'auto',
              marginBottom: 26,
              borderColor: 'rgba(77, 77, 77, .2)'
            }}
          />
        </div>
        <div className="border-top">
          <div className="container">
            <div className="event-item container-center">
              { !event && (
                <p>
                  К сожалению, событие не найдено. ;(
                </p>
              )}
              { event && (
                <div>
                  <div>
                    { name && (
                      <small className="calendar-name">#{name}</small>
                    )}
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
                    </p>
                    <p>
                      {event.description}
                    </p>
                  </div>
                  {event.reference && (
                    <ButtonExternalLink 
                      href={event.reference}
                      icon="/icons/icon_external_link.png" 
                      title="Ссылка на источник"
                      style={{
                        display: "block",
                        width: 250,
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        marginTop: 28,
                        borderColor: "rgb(77, 77, 77)",
                      }} 
                    />
                  )}                  
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border-top">
          <div className="container container-center pt-4 pb-5">
            <p>Обсудить событие в чате:</p>
            <ButtonExternalLink 
              href="https://tglink.ru/events4friends" 
              icon="/icons/telegram.png" 
              style={{
                borderColor: "#139BD0",
                margin: 8
              }} 
            />
            <ButtonExternalLink 
              href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8" 
              icon="/icons/wa.png"
              style={{
                borderColor: "#57BB63",
                margin: 8
              }} 
            />
            <ButtonExternalLink 
              href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
              icon="/icons/viber.png" 
              style={{
                borderColor: "#7C519B",
                margin: 8
              }} 
            />
          </div>
        </div>     
      </div>
    )
  }
}

export default EventView;
