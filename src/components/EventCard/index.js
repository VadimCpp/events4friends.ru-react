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

  return (
    <div className="event-item">
      <header className="event-card__header">
        {isCurrentEvent(event) ? (
          <small className="event-card__label event-card__label--current">
            Идет сейчас
          </small>
        ) : (
          isStartWithinAnHourEvent(event) && (
            <small className="event-card__label event-card__label--current">
              Начнется в течение часа
            </small>
          )
        )}

        {isOwner && <small className="calendar-owner">Мой анонс</small>}
      </header>
      <div className="event-card__body">
        <Link className="event-card__link" to={linkTo}>
          {summary}
        </Link>
        <p className="event-card__content">
          <time className="event-card__time">
            <span>{startDate}</span>
            <span>{startTime}</span>
          </time>

          <div className="event-card__place">
            {isOnline ? (
              <>
                <span aria-hidden="true">🕸</span>
                Онлайн
              </>
            ) : (
              <>
                <span aria-hidden="true">📍</span>
                {location}
              </>
            )}
          </div>
        </p>
      </div>
    </div>
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
