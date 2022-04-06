import React, { useState, useContext, useEffect } from 'react';
import EventCard from '../../components/EventCard';
import ButtonLink from '../../components/ButtonLink';
import EventsFilter from '../../components/EventsFilter';
import Spinner from '../../components/Spinner';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import { EventsFilterType, NOTICES } from '../../enums';
import './EventsView.css';

// utils
import { getSortedEvents } from '../../utils/eventsLogic';

const EventsView = ({ match, history }) => {
  const { user, connectingToFirebase } = useContext(AuthContext);
  const { events, loadingEvents, communities } = useContext(DataContext);
  const isAuth = user && !user.isAnonymous;

  const [filterType, setFilterType] = useState(EventsFilterType.Upcoming);
  const [sortedEvents, setSortedEvents] = useState([]);

  const { slug } = match.params;
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    if (slug) {
      //
      // NOTE!
      // Если в URL указан slug сообщества необходимо:
      // - произвести поиск по slug
      // - если сообщество не найдено, отобразить NOT_FOUND
      //
      const aCommunity = communities.find(c => c.slug === slug);

      if (aCommunity) {
        setCommunity(aCommunity);
      } else if (!connectingToFirebase && !loadingEvents) {
        console.warn('TODO: реализовать NOT_FOUND экран');
        history.push('/');
      }
    }
  }, [history, communities, slug]);

  useEffect(() => {
    if (community) {
      const sortEvents = getSortedEvents(events, filterType);
      const sortEvents4Community = sortEvents.filter(e => {
        const communityId = e.communityId || '1';
        return communityId === community.id;
      });
      setSortedEvents(sortEvents4Community);
    }
  }, [events, filterType, community]);

  const displayEvent = (event, source) => {
    const { id } = event;
    const { name } = source;
    if (!event || !source) {
      return null;
    }

    return (
      <li key={id} className="event">
        <EventCard event={event} name={name} slug={slug} />
      </li>
    );
  };

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
    <section className="main-view events__wrapper">
      <ButtonLink
        to="/"
        icon="/icons/icon_arrow_back.svg"
        title="На главную"
        className="btn-back"
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
        <Spinner
          message={
            connectingToFirebase ? NOTICES.CONNECT_TO_DB : NOTICES.LOADING_EVT
          }
        />
      ) : (
        <ul className="events__list">
          {eventsList.map(eventItem =>
            displayEvent(eventItem.event, eventItem.source),
          )}
        </ul>
      )}
    </section>
  );
};

export default EventsView;
