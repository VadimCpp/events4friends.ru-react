import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
// import AboutView from "./views/AboutView.js";
import ListView from "./views/ListView.js";
// import ArchiveView from "./views/ArchiveView.js";
import LoadingView from "./views/LoadingView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";
import WelcomeView from "./views/WelcomeView.js";
import LoginView from "./views/LoginView.js";
import ServicesView from "./views/ServicesView.js";
import ServiceView from "./views/ServiceView.js";
import NewEventView from "./views/NewEventView.js";
import EditEventView from "./views/EditEventView.js";

import EventsSource from "./model/EventsSource";
import Header from './components/Header.js'

class AppRouter extends Component {
  state = {    
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

  render() {
    const {
      loading, loadingNumber, loadingTotal, loadingName, eventsSources
    } = this.state;
    return (
      <div>
        {(loading) ?
          (<LoadingView
            loadingNumber={loadingNumber}
            loadingTotal={loadingTotal}
            loadingName={loadingName}
          />) :
          (
            <Router>
              <ScrollToTop>
                <Header />
                <div>
                  <Route path="/" exact component={WelcomeView} />
                  <Route path="/signin/" exact component={LoginView} />
                  <Route path="/services/" exact component={ServicesView} />
                  <Route path="/newevent/" exact component={NewEventView} />
                  <Route 
                    path="/list/"
                    render={props => (
                      <ListView {...props} />
                    )}
                  />
                  <Route
                    path="/event/:id"
                    render={props => (
                      <EventView {...props} />
                    )}
                  />
                  <Route
                    path="/service/:id"
                    render={props => (
                      <ServiceView {...props} />
                    )}
                  />
                  <Route
                    path="/editevent/:id"
                    render={props => (
                      <EditEventView {...props} />
                    )}
                  />
                  

                  {/*
                  <Route path="/about/" component={AboutView} />
                  <Route path="/archive/" render={props => (<ArchiveView {...props}
                    googleEvents={pastEvents}
                    getEvent={this.getEvent} />)} /> */}
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
