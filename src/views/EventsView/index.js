import React, { useState, useContext, useEffect } from 'react';
import Cookies from 'universal-cookie';
import EventCard from '../../components/EventCard';
import ButtonLink from '../../components/ButtonLink';
import EventsFilter from '../../components/EventsFilter';
import { AuthContext } from '../../context/AuthContext';
import { DataContext } from '../../context/DataContext';
import EventsFilterType from '../../enums';
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
      } else {
        // TODO: реализовать NOT_FOUND экран
        console.warn('TODO: реализовать NOT_FOUND экран');
        history.push('/');
      }
    } else {
      //
      // NOTE!
      // Если в URL не указан slug сообщества необходимо:
      // - произвести поиск по id из cookies
      // - по умолчанию id сообщества - 1 (events4friends)
      //
      const cookies = new Cookies();
      const communityId = cookies.get('communityId');
      if (!communityId) {
        history.push('/communities/');
      } else {
        const aCommunity = communities.find(c => c.id === communityId);
        if (aCommunity) {
          setCommunity(aCommunity);
        }
      }
    }
  }, [history, communities, slug]);

  useEffect(() => {
    if (community) {
      const sortSvents = getSortedEvents(events, filterType);
      const sortSvents4Community = sortSvents.filter(e => {
        const communityId = e.communityId || '1';
        return communityId === community.id;
      });
      setSortedEvents(sortSvents4Community);
    }
  }, [events, filterType, community]);

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
      <li key={id} className="events-list__item">
        <div className="container container-center">
          <EventCard event={event} name={name} />
        </div>
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

  const NOTICES = {
    CONNECT: 'Подключаемся к базе данных...',
    LOADING: 'Загружаем события...',
  };

  return (
    <section className="main-view">
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
        <p align="center">
          {connectingToFirebase ? NOTICES.CONNECT : NOTICES.LOADING}
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
