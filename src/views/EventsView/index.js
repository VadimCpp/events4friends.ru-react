/* eslint-disable indent */
import React, { useState, useContext } from 'react';
import EventCard from '../../components/EventCard';
import ButtonLink from '../../components/ButtonLink';
import EventsFilter from '../../components/EventsFilter';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import {
  sortEvents,
  setEndTime,
  EventsFilterType,
  filterEvents,
  isCurrentEvent,
  isComingEvent,
} from './helper';
import './EventsView.css';

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
    const isCurrent = isCurrentEvent(event.start, event.end, event.timezone);
    const isComing = isComingEvent(event.start, event.timezone);

    return (
      <li key={id} className="events-list__item">
        <div className="container container-center">
          <EventCard
            event={event}
            name={name}
            isCurrent={isCurrent}
            isComing={isComing}
          />
        </div>
      </li>
    );
  };

  let sortedEvents = events.map(event => setEndTime(event));
  sortedEvents = filterEvents(sortedEvents, filterType);
  if (filterType === EventsFilterType.Upcoming) {
    sortedEvents = sortEvents(sortedEvents);
  } else if (filterType === EventsFilterType.Past) {
    sortedEvents = sortEvents(sortedEvents, true);
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

  const notice = {
    CONNECT: 'Подключаемся к базе данных...',
    LOADING: 'Загружаем события...',
  };

  return (
    <section className="main-view">
      <ButtonLink
        to="/"
        icon="/icons/icon_arrow_back.svg"
        title="На главную"
        classList={['button-link', 'events-view']}
      />
      {/*
        NOTE! Кнопка в этом месте не нужна.
        TODO: подумать над интерфейсом и разместить кнопку другом месте
      */}
      {/* <ButtonLink
        to="/events/map/"
        icon="/icons/icon_event_map_view.svg"
        title="Карта мероприятий"
        classList={['button-link']}
      /> */}
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
        warnMessage
      )}
      <div className="container pt-3">
        <EventsFilter
          onFilterTypeChange={value => setFilterType(value)}
          filterType={filterType}
          upcoming={EventsFilterType.Upcoming}
          past={EventsFilterType.Past}
        />
      </div>
      {connectingToFirebase || loadingEvents ? (
        <p align="center">
          {connectingToFirebase ? notice.CONNECT : notice.LOADING}
        </p>
      ) : (
        <ul className="events-list pt-3">
          {eventsList.map(eventItem =>
            displayEvent(eventItem.event, eventItem.source),
          )}
        </ul>
      )}
    </section>
  );
};

export default EventsView;
