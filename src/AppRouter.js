import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import EventsView from './views/EventsView';
import EventView from './views/EventView';
import ScrollToTop from './components/ScrollToTop';
import WelcomeView from './views/WelcomeView';
import LoginView from './views/LoginView';
import ServicesView from './views/ServicesView';
import ServiceView from './views/ServiceView';
import NewEventView from './views/NewEventView';
import NewServiceView from './views/NewServiceView';
import EditEventView from './views/EditEventView';
import EditServiceView from './views/EditServiceView';
import CommunitiesView from './views/CommunitiesView';
import ProfileView from './views/ProfileView';
import Header from './components/Header';

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <div>
          <Route path="/" exact component={WelcomeView} />
          <Route path="/signin/" exact component={LoginView} />
          <Route path="/services/" exact component={ServicesView} />
          <Route path="/newevent/" exact component={NewEventView} />
          <Route path="/newservice/" exact component={NewServiceView} />
          <Route path="/communities/" exact component={CommunitiesView} />
          <Route path="/profile/" exact component={ProfileView} />
          <Route path="/events/" render={props => <EventsView {...props} />} />
          {/*
            NOTE!
            В старой версии сайта присутствовала страница с адресом list
            Оставляем list как редирект.

            TODO: удалить через полгода, в январе 2021
          */}
          <Route path="/list/" render={props => <EventsView {...props} />} />
          <Route path="/event/:id" render={props => <EventView {...props} />} />
          <Route
            path="/service/:id"
            render={props => <ServiceView {...props} />}
          />
          <Route
            path="/editevent/:id"
            render={props => <EditEventView {...props} />}
          />
          <Route path="/editservice/:id" exact component={EditServiceView} />
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default AppRouter;
