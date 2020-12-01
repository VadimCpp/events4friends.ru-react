/* eslint-disable indent */
import React, { useState, useContext } from 'react';
import moment from 'moment';
import EventCard from '../../components/EventCard';
import ButtonLink from '../../components/ButtonLink';
import EventsFilter from '../../components/EventsFilter';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import './EventsView.css';

const EventsFilterType = {
  Upcoming: 'UPCOMING_EVENTS',
  Past: 'PAST_EVENTS',
  // TODO: add more types here
};

const EventsView = () => {
  const [filterType, setFilterType] = useState(EventsFilterType.Upcoming);
  const authContext = useContext(AuthContext);
  const dataContext = useContext(DataContext);
  const { user, connectingToFirebase } = authContext;
  const { events, loadingEvents } = dataContext;
  const isAuth = user && !user.isAnonymous;

  /**
   * @param {Event} event
   * @param {EventsSource} source
   */

  const displayEvent = (event, source) => {
    const { id } = event;
    const { name } = source;
    if (!event || !source) {
      return null;
    }

    return (
      <div key={id}>
        <EventCard event={event} name={name} />
      </div>
    );
  };

  const now = new Date();
  let sortedEvents = [...events];

  if (filterType === EventsFilterType.Upcoming) {
    sortedEvents = sortedEvents.filter(event => {
      return event.start && event.timezone
        ? moment(`${event.start}${event.timezone}`).toDate() > now
        : false;
    });

    // TODO: неочевидная сортировка, рассмотреть сортировку дат, не строк
    sortedEvents.sort((a, b) => {
      if (a.start > b.start) {
        return 1;
      }
      if (a.start < b.start) {
        return -1;
      }
      return 0;
    });
  } else if (filterType === EventsFilterType.Past) {
    sortedEvents = sortedEvents.filter(event => {
      return event.start && event.timezone
        ? moment(`${event.start}${event.timezone}`).toDate() < now
        : false;
    });

    sortedEvents.sort((a, b) => {
      if (a.start < b.start) {
        return 1;
      }
      if (a.start > b.start) {
        return -1;
      }
      return 0;
    });
  }

  const eventsList = sortedEvents.map(item => {
    return {
      event: item,
      source: {
        name: 'База данных events4friends',
      },
    };
  });

  const warnMessage = (
    <p>Для того, чтобы добавлять мероприятия, выполните вход</p>
  );

  return (
    <div className="main-view">
      <div>
        <ButtonLink
          to="/"
          icon="/icons/icon_arrow_back.svg"
          title="На главную"
          classList={['button-link', 'events-view']}
        />
      </div>
      <>
        {isAuth ? (
          <div>
            <ButtonLink
              to="/newevent"
              icon="/icons/icon_plus.svg"
              title="Сделать анонс"
              style={{ width: 200 }}
              classList={['button-link', 'events-view']}
            />
          </div>
        ) : (
          <div>{warnMessage}</div>
        )}
      </>
      <div className="container pt-3">
        <EventsFilter
          onFilterTypeChange={value => setFilterType(value)}
          filterType={filterType}
          upcoming={EventsFilterType.Upcoming}
          past={EventsFilterType.Past}
        />
      </div>
      {connectingToFirebase ? (
        <p align="center">Подключаемся к базе данных...</p>
      ) : (
        <>
          {loadingEvents ? (
            <p align="center">Загружаем события...</p>
          ) : (
            <>
              {!!eventsList.length && (
                <div className="pt-3">
                  {eventsList.map(eventItem =>
                    displayEvent(eventItem.event, eventItem.source),
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default EventsView;
