import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import StoreBadge from '../../components/StoreBadge';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import './EventView.css';
import MessengerLink from '../../components/MessengerLink';

const EventView = ({ match, history }) => {
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  const eventId = match.params.id;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const { user, connectingToFirebase } = authContext;
  const { events, loadingEvents, deleteEvent } = dataContext;

  let event = null;
  let name = null;
  let startDate = 'Не указано';
  let startTime = 'Не указано';
  let timezone = null;

  for (let i = 0; i < events.length; i++) {
    if (eventId === events[i].id) {
      event = events[i];
      name = 'База данных events4friends';
      startDate = event
        ? moment(event.start).format('D MMMM, dddd')
        : 'Не указано';
      startTime = event ? moment(event.start).format('HH:mm') : 'Не указано';
      timezone = events[i].timezone;
      break;
    }
  }

  const isAbleToDeleteOrEdit =
    !deletingInProgress &&
    user &&
    event &&
    user.email === event.contact &&
    name === 'База данных events4friends';

  const onPressDeleteEvent = () => {
    if (window.confirm('Вы уверены, что хотите удалить мероприятие?')) {
      setDeletingInProgress(true);
      deleteEvent(event.id, success => {
        if (success) {
          console.info('Event deleted successfully, navigate to list view');
          history.push('/events');
        } else {
          console.info('Failed to delete event');
          setDeletingInProgress(false);
        }
      });
    }
  };

  return (
    <div className="eventview">
      <div>
        <ButtonLink
          to="/events"
          icon="/icons/icon_arrow_back.svg"
          title="К списку"
          classList={['button-link', 'event-view']}
        />
      </div>
      <div>
        {isAbleToDeleteOrEdit ? (
          <div className="controls">
            <Button
              onPress={onPressDeleteEvent}
              icon="/icons/icon_delete.svg"
              classList={['button-link', 'event-view']}
            >
              Удалить
            </Button>
            <ButtonLink
              to={`/editevent/${event.id}`}
              icon="/icons/icon_edit.svg"
              title="Изменить"
              classList={['button-link', 'event-view']}
            />
          </div>
        ) : null}
        <div className="border-top">
          <div className="container">
            <div className="eventview__event-item container-center">
              {!event && connectingToFirebase && (
                <p align="center">Подключаемся к базе данных...</p>
              )}
              {!event && !connectingToFirebase && loadingEvents && (
                <p align="center">Загружаем событие...</p>
              )}
              {!event && !connectingToFirebase && !loadingEvents && (
                <div>
                  <p align="center">
                    Мероприятие недоступно <span role="img" aria-label="sad" />
                  </p>
                  <p align="center">
                    Возможно, оно было удалено или Вы открыли «битую» ссылку.
                  </p>
                </div>
              )}
              {event && (
                <div>
                  <div>
                    {name && <small className="calendar-name">#{name}</small>}
                    <p>
                      <span role="img" aria-label="Date">
                        📅
                      </span>
                      <span className="event-date">{startDate}</span>
                      <span role="img" aria-label="Time">
                        🕗
                      </span>
                      <span className="event-time">{startTime}</span>
                      {timezone === '+0200' && (
                        <span className="event-timezone">Клд</span>
                      )}
                      {timezone === '+0300' && (
                        <span className="event-timezone">Мск</span>
                      )}
                      － {event.summary}
                      {event.isOnline ? (
                        <span>
                          <span role="img" aria-label="Location">
                            {' '}
                            🕸
                          </span>
                          Онлайн
                        </span>
                      ) : (
                        <span>
                          <span role="img" aria-label="Location">
                            {' '}
                            📍
                          </span>
                          {event.location}
                        </span>
                      )}
                    </p>
                    <div>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: event.description,
                        }}
                      />
                    </div>
                    <p>
                      {event.isOnline && (
                        <span>
                          Ссылка для подключения к онлайн трансляции: <br />
                          <a href={event.location}>{event.location}</a>
                        </span>
                      )}
                    </p>
                    <p>
                      {event.name && (
                        <span>
                          Организатор мероприятия: <br />
                          {event.name}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-top">
        <div className="container container-center pt-4 pb-4">
          <p>Обсудить анонс мероприятия в чате:</p>
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="telegram"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="whatsapp"
          />
          <MessengerLink
            ExternalLinkComponent={ButtonExternalLink}
            messengerName="viber"
          />
        </div>
      </div>

      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>Наше мобильное приложение:</p>
          <div className="d-flex justify-content-center">
            <div className="mr-1">
              <StoreBadge platform="ios" width={120} />
            </div>
            <div className="ml-1">
              <StoreBadge platform="android" width={120} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EventView);
