import React, { Component } from 'react';
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import Map from '../components/Map';
import './MainView.css';

class MainView extends Component {

  displayEvents(events, nameCalendar) {
    if (!events.length) return null;

    return (
        <ul key={nameCalendar} className="event-list">
          
          {events.map((event) =>
            <li key={event.id}>
              <EventItem
                getEvent={this.props.getEvent}
                googleEvent={event}
              />
            </li>
          )}

        </ul>
    );
  }

  render() {
    const { events, allEvents } = this.props;

    return (
      <div className="main-view">
        <div className="container container-center main-view-container">
          <div className="pt-5">
            <Map allEvents={allEvents} />
            {events.map(events => this.displayEvents(events.events, events.calendarName))}
          </div>
          <div className="pt-5 pb-5">
            <p>
              На главной пока только список событий. Все остальное в разделе "О нас".
            </p>
            <p>
              <Button color="warning">
                <Link className="reset-link-style" to="/about">О нас</Link>
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default MainView;
