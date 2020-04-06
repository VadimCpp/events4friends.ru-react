import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import moment from 'moment';
import Button from '../components/Button';
import ButtonLink from '../components/ButtonLink';
import ButtonExternalLink from '../components/ButtonExternalLink';
import { AuthContext } from '../context/AuthContext'
import { DataContext } from '../context/DataContext'
import 'moment/locale/ru';
import './EventView.css';

class EventView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deletingInProgress: false,
    }
  }

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
    let { event, name } = this.getEventFromSourcesById(eventsSources, eventId);

    let startDate = event ? moment(event.start).format('D MMMM, dddd') : 'Не указано';
    let startTime = event ? moment(event.start).format('HH:mm') : 'Не указано';

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
        <DataContext.Consumer>
          {({ events, deleteEvent }) => {
            
            if (event === null) {
              for(let i = 0; i < events.length; i++) {
                if (eventId === events[i].id) {
                  event = events[i]
                  name = 'Events For Friends - База данных'
                  startDate = event ? moment(event.start).format('D MMMM, dddd') : 'Не указано';
                  startTime = event ? moment(event.start).format('HH:mm') : 'Не указано';
                  break;
                }
              }
            }
            
            return (
              <div>
                <AuthContext.Consumer>
                  {({ user }) => {
                    console.log('user.email:', user ? user.email : null)
                    console.log('event.contact:', event ? event.contact : null)

                    const isAbleToDeleteOrEdit = !this.state.deletingInProgress 
                      && user 
                      && event 
                      && user.email === event.contact
                      && name === 'Events For Friends - База данных'
                    return isAbleToDeleteOrEdit ? (
                      <div className="controls">
                        <div>
                          <Button
                            onPress={() => {
                              if (window.confirm('Вы уверены, что хотите удалить мероприятие?')) {
                                this.setState({ deletingInProgress: true }, () => {
                                  deleteEvent(event.id, (success) => {
                                    if (success) {
                                      console.log('Event deleted successfully, navigate to list view');
                                      this.props.history.push(`/list`);
                                    } else {
                                      console.log('Failde to delete event');
                                      this.setState({ deletingInProgress: false });
                                    }                              
                                  })
                                })
                              }
                            }}
                            icon="/icons/icon_delete.png"
                            borderColor="rgba(77, 77, 77, .2)"
                          >
                            Удалить
                          </Button>
                        </div>
                        <div>
                          <ButtonLink 
                            to={`/editevent/${event.id}`}
                            icon="/icons/icon_edit.png"
                            title="Изменить"
                            style={{ 
                              width: 165,
                              display: 'block',
                              marginRight: 'auto',
                              marginLeft: 'auto',
                              marginTop: 8,
                              marginBottom: 8,
                              borderColor: 'rgba(77, 77, 77, .2)'
                            }}
                          />
                        </div>
                      </div>
                    ) : null
                  }}
                </AuthContext.Consumer>
                <div className="border-top">
                  <div className="container">
                    <div className="event-item container-center">
                      {!event && (
                        <div>
                          <p align="center">
                            Мероприятие недоступно <span role="img" aria-label="sad">🙁</span>
                          </p>
                          <p align="center">
                            Попробуйте вернуться на главную страницу сайта
                            и выполнить вход ВК *
                          </p>
                        </div>
                      )}
                      {event && (
                        <div>
                          <div>
                            {name && (
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

                              {event.isOnline ? (
                                <span>
                                  <span role="img" aria-label="Location"> 🕸</span>
                                  Всемирная паутина
                                </span>
                              ) : (
                                <span>
                                  <span role="img" aria-label="Location"> 📍</span>
                                  {event.location}
                                </span>
                              )}
                              
                            </p>
                            <div>
                              <p dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                            <p>
                              {event.isOnline && (
                                <span>
                                  Ссылка на онлайн трансляцию: <br />
                                  <a href={event.location}>{event.location}</a>
                                </span>
                              )}
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
              </div>
            )
          }}
        </DataContext.Consumer>
        <div className="border-top">
          <div className="container container-center pt-4 pb-5">
            <p>Обсудить анонс мероприятия в чате:</p>
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

export default withRouter(EventView);
