import React, { Component } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
// import AboutView from "./views/AboutView.js";
import EventsView from "./views/EventsView.js";
// import ArchiveView from "./views/ArchiveView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";
import WelcomeView from "./views/WelcomeView.js";
import LoginView from "./views/LoginView.js";
import ServicesView from "./views/ServicesView.js";
import ServiceView from "./views/ServiceView.js";
import NewEventView from "./views/NewEventView.js";
import EditEventView from "./views/EditEventView.js";
import CommunitiesView from "./views/CommunitiesView.js";
import ProfileView from "./views/ProfileView.js";

import Header from './components/Header.js'

class AppRouter extends Component {
   render() {
    return (
      <Router>
        <ScrollToTop>
          <Header />
          <div>
            <Route path="/" exact component={WelcomeView} />
            <Route path="/signin/" exact component={LoginView} />
            <Route path="/services/" exact component={ServicesView} />
            <Route path="/newevent/" exact component={NewEventView} />
            <Route path="/communities/" exact component={CommunitiesView} />
            <Route path="/profile/" exact component={ProfileView} />
            <Route 
              path="/events/"
              render={props => (
                <EventsView {...props} />
              )}
            />
            {/*
              NOTE!
              В старой версии сайта присутствовала страница с адресом list
              Оставляем list как редирект.

              TODO: удалить через полгода, в январе 2021 
            */}
            <Route 
              path="/list/"
              render={props => (
                <EventsView {...props} />
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
};

export default AppRouter;
