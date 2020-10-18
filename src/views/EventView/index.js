/* eslint-disable indent */
/* eslint-disable max-len */
import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactStoreBadges from 'react-store-badges';
import moment from 'moment';
import Button from '../../components/Button';
import ButtonLink from '../../components/ButtonLink';
import ButtonExternalLink from '../../components/ButtonExternalLink';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import 'moment/locale/ru';
import './EventView.css';

const EventView = ({ match, history }) => {
  const [deletingInProgress, setDeletingInProgress] = useState(false);

  const eventId = match.params.id;
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);

  const { events, deleteEvent } = dataContext;
  const { user, loadingStatuses } = authContext;

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
    <div>
      <div>
        <ButtonLink
          to="/events"
          icon="/icons/icon_arrow_back.svg"
          title="К списку"
          style={{
            width: 155,
            display: 'block',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginBottom: 10,
            borderColor: 'rgba(77, 77, 77, .2)',
            borderRadius: '48px',
          }}
        />
      </div>
      <div>
        {isAbleToDeleteOrEdit ? (
          <div className="controls">
            <div>
              <Button
                onPress={onPressDeleteEvent}
                icon="/icons/icon_delete.svg"
                borderColor="rgba(77, 77, 77, .2)"
              >
                Удалить
              </Button>
            </div>
            <div>
              <ButtonLink
                to={`/editevent/${event.id}`}
                icon="/icons/icon_edit.svg"
                title="Изменить"
                style={{
                  display: 'block',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                  marginTop: 8,
                  marginBottom: 8,
                  borderColor: 'rgba(77, 77, 77, .2)',
                  borderRadius: '48px',
                }}
              />
            </div>
          </div>
        ) : null}
        <div className="border-top">
          <div className="container">
            <div className="event-item container-center">
              {!event && loadingStatuses.connectingToFirebase && (
                <p align="center">Подключаемся к базе данных...</p>
              )}
              {!event &&
                !loadingStatuses.connectingToFirebase &&
                loadingStatuses.loadingEvents && (
                  <p align="center">Загружаем событие...</p>
                )}
              {!event &&
                !loadingStatuses.connectingToFirebase &&
                !loadingStatuses.loadingEvents && (
                  <div>
                    <p align="center">
                      Мероприятие недоступно{' '}
                      <span role="img" aria-label="sad" />
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
                      － «{event.summary}»
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
                      {name && (
                        <span>
                          Организатор мероприятия: <br />
                          {name}
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
          <ButtonExternalLink
            href="tg://resolve?domain=events4friends"
            icon="/icons/telegram.svg"
            alt="telegram"
            style={{
              borderColor: '#139BD0',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://chat.whatsapp.com/DWUaZ1bsuxwJLALyvBYTt8"
            icon="/icons/whatsapp.svg"
            alt="whatsapp"
            style={{
              borderColor: '#57BB63',
              margin: 8,
              borderRadius: '48px',
            }}
          />
          <ButtonExternalLink
            href="https://invite.viber.com/?g2=AQBA7jF9Y7%2BXBkqTI0PoYF%2BmnEMluxPdGZy8wJQ3PRPBLT%2BMeh344RxBuBUTVc6B"
            icon="/icons/viber.svg"
            alt="viber"
            style={{
              borderColor: '#7C519B',
              margin: 8,
              borderRadius: '48px',
            }}
          />
        </div>
      </div>

      <div className="border-top">
        <div className="container container-center pt-4 pb-5">
          <p>Наше мобильное приложение:</p>
          <div className="d-flex justify-content-center">
            <div className="mr-1">
              <ReactStoreBadges
                platform="ios"
                url="https://apps.apple.com/us/app/events4friends-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%BE/id1509893426"
                locale="en-us"
                width={120}
              />
            </div>
            <div className="ml-1">
              <ReactStoreBadges
                platform="android"
                url="https://play.google.com/store/apps/details?id=com.roscomputing.events4friends"
                locale="en-us"
                width={120}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(EventView);
