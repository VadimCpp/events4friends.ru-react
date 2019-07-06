import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";
import axios from 'axios';


class AppRouter extends Component {
  state = {
    loading: true,
    events: [],
    event: []
  }

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    const URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    const API_KEY = 'AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs';
    const CALENDAR_IDS = {
      PRAVO: 'pravonagorod%40gmail.com',
      BASIC: 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com'
    }
    
    try {
      const pravo = await axios.get(`${URL}${CALENDAR_IDS.PRAVO}/events?key=${API_KEY}`);
      const basic = await axios.get(`${URL}${CALENDAR_IDS.BASIC}/events?key=${API_KEY}`);

      this.setState({ loading: false, events: [
        { calendarName: "events4friends", events: basic.data.items },
        { calendarName: "Право на город", events: pravo.data.items }
      ]})
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
