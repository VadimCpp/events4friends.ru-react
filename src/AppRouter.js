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

  getEvents = () => {
    const CALENDAR_ID = 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com'
    const API_KEY = 'AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs'
    let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
    axios.get(url)
      .then(res => this.setState({ loading: false, events: res.data.items }))
  }

  getEvent = eventId => {
    const listEvents = [...this.state.events];
    const targetEvents = listEvents.filter(event => event.id === eventId);
    this.setState({ event: targetEvents })
  }

  render() {
    return (<Router>
      <ScrollToTop>
        <div>
          <Route path="/" exact render={props => (
            <MainView {...props} events={this.state.events} loading={this.state.loading} getEvent={this.getEvent} />
          )} />
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
