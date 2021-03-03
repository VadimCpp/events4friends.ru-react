import React, { useContext } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './EventCard.css';

const EventCard = props => {
  const { event, name, isCurrent, isComing } = props;
  const authContext = useContext(AuthContext);
  const { start, contact, timezone, id, summary, isOnline, location } = event;

  const timeZones = {
    '+0200': 'Клд',
    '+0300': 'Мск',
  };
  const notice = {
    CURRENT: 'Идёт сейчас',
    COMING: 'Начнется в течении часа',
  };
  const startDate = moment(start).format('D MMMM, dddd');
  const startTime = moment(start).format('HH:mm');
  const dateTime = `${start}${timezone}`;
  const isOwner =
    authContext.user &&
    event &&
    authContext.user.email === contact &&
    name === 'База данных events4friends';

  return (
    <div className="event-item">
      <Link className="reset-link-style" to={`/event/${id}`}>
        <header className="event-card__header">
          {(isCurrent || isComing) && (
            <small className="event-card__label event-card__label--current">
              {isCurrent ? notice.CURRENT : notice.COMING}
            </small>
          )}
          {isOwner && <small className="calendar-owner">Мой анонс</small>}
          <small className="event-card__calendar-name ">#{name}</small>
        </header>
        <div className="d-flex align-items-center justify-content-between">
          <p>
            <time dateTime={dateTime}>
              <span aria-hidden="true">📅</span>
              <span className="event-date">{startDate}</span>
              <span aria-hidden="true">🕗</span>
              <span className="event-time">{startTime}</span>
              {timezone && (
                <span className="event-timezone">{timeZones[timezone]}</span>
              )}
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

export default EventCard;
