import React, { Component } from 'react';
import moment from 'moment';
import 'react-add-to-calendar/dist/react-add-to-calendar.css';
import { Link, withRouter } from "react-router-dom";
import 'moment/locale/ru';
import './EventCard.css';

class EventCard extends Component {
  componentDidMount() {
    moment.locale('ru');
  }

  render() {
    const { event, name } = this.props;
    const startDate = moment(event.start).format('D MMMM, dddd');;
    const startTime = moment(event.start).format('HH:mm');

    return (
      <Link className="reset-link-style" to={`/event/${event.id}`}>
        <div className="border-top">
          <div className="container">
            <div className="event-item container-center">            
              <small className="calendar-name">#{name}</small>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span role="img" aria-label="Date">📅</span>
                  <span className="event-date">{startDate}</span>

                  <span role="img" aria-label="Time">🕗</span>
                  <span className="event-time">{startTime}</span>

                  － «
                  {event.summary}
                  »

                  <span role="img" aria-label="Location">📍</span>
                  {event.location}
                </div>
                <div className="button">
                  <img src={"/icons/icon_arrow_forward.png"} alt="le-icon" className="button__image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
}


export default withRouter(EventCard);
