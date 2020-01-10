import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import MapView from "./views/MapView.js";
import ArchiveView from "./views/ArchiveView.js";
import LoadingView from "./views/LoadingView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";
import axios from 'axios';
import WelcomeView from "./views/WelcomeView.js";
import EventsSource from "./model/EventsSource";

class AppRouter extends Component {
  state = {
    loading: true,
    events: [],
    event: [],
    pastEvents: [],
    allEvents: [],
    loadingName: '', // имя загружаемого календаря
    loadingNumber: 0, // порядковый номер загружаемого календаря
    loadingTotal: 3, // общее количество календарей
  }

  componentDidMount() {
    this.getEvents();

    if (window.VK) {
      console.log('VK module found');
      const vk = window.VK;
      vk.init({
        apiId: 7272040
      });
      vk.Api.call('wall.get', {owner_id: -93114971, count: 1, v: "5.103"}, function(r) {
        if (r.response && r.response.items && r.response.items.length) {
          console.log("Success getting wall post");
          console.log(r.response.items[0].text);
        }
      });
            
      const source = new EventsSource('Янтарная афиша - Калининград', 'https://vk.com/afisha_39');
      // TODO:
      // source.loalEvents();
      console.log(source);

    } else {
      console.error('No VK module found');
    }
  }

  filterEvents(events) {
    return events.filter(event => {
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
  // Выборка прошедших событий.
  filterGoneEvents(allEvents) {
    return allEvents.filter((ev) => {
      return ev.start.dateTime < new Date().toISOString()
    })
      .sort((a, b) => {
        if (a.start && a.start.dateTime &&
          b.start && b.start.dateTime) {
          return a.start.dateTime > b.start.dateTime ? -1 : 1;
        }
        return 0;
      })
  }

  getEvents = async () => {
    const URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    const API_KEY = 'AIzaSyBOXnnT1F-h9s1FP3063BQ_o0KtD7Y0DPs';


    const CALENDARS = [
      { id: 'pravonagorod%40gmail.com', name: 'Право на город' },
      { id: 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com', name: 'Events For Friends' },
      { id: '97oe212v23kfm97rnp7b1fv94c@group.calendar.google.com', name: 'Утро с Тедди' },
    ]

    try {
      let allEvents = [];
      let futureEvents = [];
      let pastEvents = [];

      for (var cal of CALENDARS) {
        // 
        // NOTE!
        // увеличиваем порядковый номер календаря, 
        // который загружаем в данный момент
        //
        this.setState((state) => ({
          loadingNumber: state.loadingNumber + 1,
          loadingName: cal.name,
        }))

        console.log('Loading events from ', cal.name, cal.id);
        let data = await axios.get(`${URL}${cal.id}/events?key=${API_KEY}`);
        let allEventsForCalendar = [...data.data.items];
        let futureEventsForCalendar = this.filterEvents(allEventsForCalendar);
        let pastEventsForCalendar = this.filterGoneEvents(allEventsForCalendar);

        futureEvents.push({ calendarName: cal.name, events: futureEventsForCalendar });
        pastEvents.push({ calendarName: cal.name, events: pastEventsForCalendar });
        allEvents.push({ calendarName: cal.name, events: allEventsForCalendar });
      }
      console.log('Done loading all calendars');

      this.setState((state) => ({
        ...state,
        loading: false,
        events: futureEvents,
        pastEvents,
        everyEvents: allEvents
      }))
    } catch (err) {
      console.log(err);
    }
  }

  getEvent = eventId => {
    const listEvents = this.state.everyEvents;
    const targetEvents = listEvents.filter(event => event.id === eventId);
    this.setState({ event: targetEvents })
  }

  render() {
    const {
      loading,
      events,
      everyEvents,
      pastEvents
    } = this.state;
    return (
      <div>
        {(loading) ?
          (<LoadingView
            loadingNumber={this.state.loadingNumber}
            loadingTotal={this.state.loadingTotal}
            loadingName={this.state.loadingName}
          />) :
          (
            <Router>
              <ScrollToTop>
                <div>
                  <Route path="/" exact component={WelcomeView} />
                  <Route path="/list/" render={props => (
                    <MainView {...props} googleEvents={events} getEvent={this.getEvent} />
                  )} />
                  <Route path="/map/" render={props => (
                    <MapView {...props} googleEvents={events} getEvent={this.getEvent} />
                  )} />
                  <Route path="/about/" component={AboutView} />
                  <Route path="/event/:id"
                    render={props => (<EventView {...props}
                      googleEvents={everyEvents}
                      getEvent={this.getEvent} />)} />
                  <Route path="/archive/" render={props => (<ArchiveView {...props}
                    googleEvents={pastEvents}
                    getEvent={this.getEvent} />)} />
                </div>

              </ScrollToTop>
            </Router>
          )
        }
      </div>
    );
  }
};

export default AppRouter;
