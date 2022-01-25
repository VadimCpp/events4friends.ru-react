import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// contexts
import { AuthContext } from '../../context/AuthContext';

// style
import './EventCard.css';

// utils
import {
  isCurrentEvent,
  isStartWithinAnHourEvent,
  getVerboseDate,
  getVerboseTime,
} from '../../utils/eventsLogic';

const EventCard = ({ event, slug }) => {
  const authContext = useContext(AuthContext);
  const { contact, id, summary, isOnline, location } = event;

  const startDate = getVerboseDate(event);
  const startTime = getVerboseTime(event);

  const isOwner =
    authContext.user && event && authContext.user.email === contact;
  const linkTo = slug ? `/${slug}/event/${id}` : `/event/${id}`;

  const splitStartTime = startTime.split(' (');
  const localStartTime = splitStartTime[0];
  const userStartTime = `(${splitStartTime[1]}`;

  return (
    <>
      {isCurrentEvent(event) ? (
        <p className="event__tag">Идет сейчас</p>
      ) : (
        isStartWithinAnHourEvent(event) && (
          <p className="event__tag">Начнется в течение часа</p>
        )
      )}
      {isOwner && <p className="event__tag event__tag--owner">Мой анонс</p>}
      <h3 className="event__title">{summary}</h3>
      <dl className="event__details">
        <dt className="event__details-header">Дата</dt>
        <dd className="event__details-text">{startDate}</dd>
        <dt className="event__details-header">Время</dt>
        <dd className="event__details-text">
          <p className="event__details-subtext">{localStartTime}</p>
          <p className="event__details-subtext">{userStartTime}</p>
        </dd>
        <dt className="event__details-header">Место</dt>
        <dd className="event__details-text">
          {isOnline ? 'Онлайн' : location}
        </dd>
      </dl>
      <Link className="event__button" to={linkTo}>
        Узнать больше
      </Link>
    </>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    contact: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    isOnline: PropTypes.bool.isRequired,
    location: PropTypes.string,
  }),
};
export default EventCard;
