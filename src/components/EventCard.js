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
    return (
      <div className="borderbottom">
        <div className="container">
          <div className="event-item container-center main-view-container">
            <small className="calendar-name">#{name}</small>
            <span role="img" aria-label="Date">📅</span>
            {event.start}

            <span role="img" aria-label="Time">🕗</span>
            {"00"}

            － «
            {event.summary}
            »

            <span role="img" aria-label="Location">📍</span>
            {event.location}

          </div>
        </div>
      </div>
    )
  }
}


export default withRouter(EventCard);
