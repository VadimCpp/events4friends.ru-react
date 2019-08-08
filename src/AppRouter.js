import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import LoadingView from "./views/LoadingView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";import axios from 'axios';

class AppRouter extends Component {
  state = {
    loading: true,
    events: [],
    event: [],

    loadingName: '', // имя загружаемого календаря
    loadingNumber: 0, // порядковый номер загружаемого календаря
    loadingTotal: 3, // общее количество календарей
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
    
	
    const CALENDARS = [
		{id: 'pravonagorod%40gmail.com', name: 'Право на город'},
		{id: 'dveenjcu4k5ktd3k8pv4iul2bk@group.calendar.google.com', name: 'Events For Friends'},
		{id: '97oe212v23kfm97rnp7b1fv94c@group.calendar.google.com', name: 'Утро с Тедди'},
    ]
    
    try {
      //
      // NOTE!
      // В календаре может не быть предстоящих событий, 
      // следовательно его не надо включать в список отображаемых календарей
      //

      let events = [];

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
        var data = await axios.get(`${URL}${cal.id}/events?key=${API_KEY}`);
        var items = this.filterEvents(data.data.items);
        
        if (items[0]) {
          events.push({ calendarName: cal.name, events: items });
        }    
      }

      console.log('Done loading all calendars');

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
      <div>
        { loading ?  
          <LoadingView 
            loadingNumber={this.state.loadingNumber}
            loadingTotal={this.state.loadingTotal}
            loadingName={this.state.loadingName}
          /> :
          (
            <Router>
              <ScrollToTop>
                <div>
                  <Route path="/" exact render={props => ( 
                    <MainView {...props} events={events} getEvent={this.getEvent} />
                  )} />
                  <Route path="/about/" component={AboutView} />
                  <Route path="/event/:id" render={props => (
                    <EventView {...props} googleEvents={this.state.events} getEvent={this.getEvent} />
                  )} />
                </div>
              </ScrollToTop>
            </Router>
          )
        };
      </div>
    );
  }
};

export default AppRouter;
