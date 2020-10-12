import React, { useEffect } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './EventCard.css';

const EventCard = ({ event, name }) => {
  useEffect(() => {
    moment.locale('ru');
  }, []);

  const startDate = moment(event.start).format('D MMMM, dddd');
  const startTime = moment(event.start).format('HH:mm');
  const { timezone } = event;

  return (
    <Link className="reset-link-style" to={`/event/${event.id}`}>
      <div className="border-top">
        <div className="container">
          <div className="event-item container-center">
            <AuthContext.Consumer>
              {({ user }) => {
                const isOwner =
                  user &&
                  event &&
                  user.email === event.contact &&
                  name === 'База данных events4friends';
                return isOwner ? (
                  <small className="calendar-owner text-success">
                    Мой анонс
                  </small>
                ) : null;
              }}
            </AuthContext.Consumer>
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

export default withRouter(EventCard);
