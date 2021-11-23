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
      <Link className="reset-link-style" to={linkTo}>
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
        <div className="d-flex align-items-center justify-content-between">
          <p>
            <time>
              <span aria-hidden="true">📅</span>
              <span className="event-date">{startDate}</span>
              <span aria-hidden="true">🕗</span>
              <span className="event-time">{startTime}</span>
            </time>
            － {summary}
            {isOnline ? (
              <>
                <span aria-hidden="true"> 🕸</span>
                Онлайн
              </>
            ) : (
              <>
                <span aria-hidden="true"> 📍</span>
                {location}
              </>
            )}
          </p>
          <img
            src="/icons/icon_arrow_forward.svg"
            alt="➡️"
            className="event-card__arrow"
            width="10"
            height="10"
          />
        </div>
      </Link>
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
