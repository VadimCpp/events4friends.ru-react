import React, { useContext } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './EventCard.css';

const EventCard = ({ event, name }) => {
  const authContext = useContext(AuthContext);
  const { start, contact, timezone, id, summary, isOnline, location } = event;

  const startDate = moment(start).format('D MMMM, dddd');
  const startTime = moment(start).format('HH:mm');
  const isOwner =
    authContext.user &&
    event &&
    authContext.user.email === contact &&
    name === 'База данных events4friends';

  return (
    <Link className="reset-link-style" to={`/event/${id}`}>
      <div className="border-top">
        <div className="container">
          <div className="event-item container-center">
            {isOwner ? (
              <small className="calendar-owner text-success">Мой анонс</small>
            ) : null}
            <small className="calendar-name">#{name}</small>
            <div className="d-flex align-items-center justify-content-between">
              <div>
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
                － {summary}
                {isOnline ? (
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
                    {location}
                  </span>
                )}
              </div>
              <div className="button">
                <img
                  src="/icons/icon_arrow_forward.svg"
                  alt="➡️"
                  className="button__image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
