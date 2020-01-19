import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
// import MainView from "./views/MainView.js";
import ListView from "./views/ListView.js";
import MapView from "./views/MapView.js";
import ArchiveView from "./views/ArchiveView.js";
import LoadingView from "./views/LoadingView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";
import axios from 'axios';
import WelcomeView from "./views/WelcomeView.js";
import EventsSource from "./model/EventsSource";
import Header from './components/Header.js'

class AppRouter extends Component {
  state = {    
    events: [],
    event: [],
    pastEvents: [],
    allEvents: [],

    loading: true,
    loadingName: '', // имя загружаемого календаря
    loadingNumber: 0, // порядковый номер источника
    loadingTotal: 0, // общее количество источников
    eventsSources: [], // все события
  }

  componentDidMount() {
    const eventsSources = [
      new EventsSource('Право на город - Календарь', 'pravonagorod%40gmail.com'),
      new EventsSource('Events For Friends - Календарь', 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com'),
      new EventsSource('Утро с Тедди - Календарь', '97oe212v23kfm97rnp7b1fv94c@group.calendar.google.com'),
      new EventsSource('Янтарная афиша - ВКонтакте', 'https://vk.com/afisha_39'),
    ];

    const eventsSourcesLehgth = eventsSources.length;

    this.setState((state) => ({
      ...state,
      loading: true,
      loadingName: '',
      loadingNumber: 0,
      loadingTotal: eventsSourcesLehgth,
      eventsSources: eventsSources
    }), () => {
      this.loadEvents();
    });
  }

  increnemtLoading = (loadingNumber) => {   
    const loading = loadingNumber < this.state.loadingTotal;
    this.setState({
      loadingNumber,
      loading
    });
  }

  loadEvents = () => {
    console.log('Loading events');

    const { eventsSources } = this.state;
    let loadingNumber = 0;

    eventsSources.forEach((eventSource, index) => {
      console.log(`Loading events from #${index} source: ${eventSource.name}...`);
      eventSource.loadEvents(
        (events) => {
          console.log(`Done loading events from #${index} source: ${eventSource.name}`);
          console.log(events);
          
          loadingNumber += 1;
          this.increnemtLoading(loadingNumber);          
        },
        (error) => {
          console.log(`Failed loading events from #${index} source: ${eventSource.name}`);
          console.error(error);

          loadingNumber += 1;
          this.increnemtLoading(loadingNumber); 
        }
      );
    })
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
    const that = this;
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

      const source = new EventsSource('Янтарная афиша - Калининград', 'https://vk.com/afisha_39');
      this.setState((state) => ({
        loadingNumber: state.loadingNumber + 1,
        loadingName: source.name,
      }))
      source.loadEvents(
        (events) => {
          console.log('Done loading VK events:');
          console.log(events);
          that.setState((state) => ({
            ...state,
            loading: false,
            events: futureEvents,
            pastEvents,
            everyEvents: allEvents,
            eventsSources: [ source ]
          }));
        },
        (error) => {
          console.log('Failed loading VK posts');
          console.error(error);
        }
      );
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
      pastEvents,
      eventsSources
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
                <Header />
                <div>
                  <Route path="/" exact component={WelcomeView} />
                  {/* <Route path="/list/" render={props => (
                    <MainView {...props} googleEvents={events} getEvent={this.getEvent} />
                  )} /> */}
                  <Route path="/list/" render={props => (
                    <ListView {...props} googleEvents={events} getEvent={this.getEvent} eventsSources={eventsSources} />
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
