import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";import axios from 'axios';

class AppRouter extends Component {
  state = {
    loading: true,
    events: [],
    event: []
  }

  componentDidMount() {
    this.getEvents();
  }

  filterEvents(events) {
    return  events.filter(event => {
      let _ref2, _ref3;

      return (((_ref2 = event) != null ? (_ref2 = _ref2.start) != null ? _ref2.dateTime : _ref2 : _ref2) || ((_ref3 = event) != null ? (_ref3 = _ref3.start) != null ? _ref3.date : _ref3 : _ref3)) > new Date().toISOString();
    }).sort((a, b) => {
      if (a.start && a.start.dateTime &&
        b.start && b.start.dateTime) {
        return a.start.dateTime < b.start.dateTime ? -1 : 1;
      }
      return 0;
    });
  }

  getEvents = async () => {
    const URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    const API_KEY = 'AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs';
    const CALENDAR_IDS = {
      PRAVO: 'pravonagorod%40gmail.com',
      BASIC: 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com'
    }
    
    try {
      const resPravo = await axios.get(`${URL}${CALENDAR_IDS.PRAVO}/events?key=${API_KEY}`);
      const resFriends = await axios.get(`${URL}${CALENDAR_IDS.BASIC}/events?key=${API_KEY}`);

      //
      // NOTE!
      // В календаре может не быть предстоящих событий, 
      // следовательно его не надо включать в список отображаемых календарей
      //

      const pravo = this.filterEvents(resPravo.data.items);
      const friends = this.filterEvents(resFriends.data.items);

      let events = [];

      if (pravo[0]) {
        events.push({ calendarName: 'Право на город' });
      }      

      if (friends[0]) {
        events.push({ calendarName: 'Events For Friends' });
      }

      this.setState((state) => ({ 
        ...state,
        loading: false, 
        events
      }))
    } catch (err) {
      console.log(err);
    }
  }
  
  getEvent = eventId => {
    const listEvents = [...this.state.events];
    const targetEvents = listEvents.filter(event => event.id === eventId);
    this.setState({ event: targetEvents })
  }

  render() {
    const { loading, events } = this.state;

    return (
    <Router>
      <ScrollToTop>
        <div>
          {loading ? <div>Loading please wait...</div> : <Route path="/" exact render={props => ( 
            <MainView {...props} events={events} getEvent={this.getEvent} />
          )} />}
          <Route path="/about/" component={AboutView} />
          <Route path="/event/:id" render={props => (
            <EventView {...props} googleEvents={this.state.events} getEvent={this.getEvent} />
          )} />
        </div>
      </ScrollToTop>
    </Router>);
  }
};

export default AppRouter;
