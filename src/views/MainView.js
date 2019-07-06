import React, { Component } from 'react';
import EventItem from '../components/EventItem.js'
import { Button } from 'reactstrap';
import { Link } from "react-router-dom";
import './MainView.css';

class MainView extends Component {

  displayEvents(events, nameCalendar) {
    const currentEvents = events.filter(event => {
      let _ref2, _ref3;

      return (((_ref2 = event) != null ? (_ref2 = _ref2.start) != null ? _ref2.dateTime : _ref2 : _ref2) || ((_ref3 = event) != null ? (_ref3 = _ref3.start) != null ? _ref3.date : _ref3 : _ref3)) > new Date().toISOString();
    })

    const sortedEvents = currentEvents.sort((a, b) => {
      if (a.start && a.start.dateTime &&
        b.start && b.start.dateTime) {
        return a.start.dateTime < b.start.dateTime ? -1 : 1;
      }
      return 0;
    });

    const listItems = sortedEvents.map((event) =>
      <li key={event.id}>
        <EventItem
          getEvent={this.props.getEvent}
          googleEvent={event}
        />
      </li>
    );

    if (!listItems.length) return null;

    return (
      <ul key={nameCalendar} className="event-list">{listItems}</ul>
    );
  }

  render() {
    const events = this.props.events;

    return (
      <div className="main-view">
        <div className="container container-center main-view-container">
          <div className="pt-5">
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
