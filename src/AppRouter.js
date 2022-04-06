import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import EventsView from './views/EventsView';
import EventView from './views/EventView';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
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

const AppRouter = () => {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <div>
          <Route path="/" exact component={WelcomeView} />
          <Route path="/signin/" exact component={LoginView} />
          <Route path="/newevent/" exact component={NewEventView} />
          <Route path="/newservice/" exact component={NewServiceView} />
          <Route path="/communities/" exact component={CommunitiesView} />
          <Route path="/profile/" exact component={ProfileView} />
          <Route path="/editevent/:id" component={EditEventView} />
          <Route path="/editservice/:id" exact component={EditServiceView} />

          <Route path="/:slug/events/" exact component={EventsView} />
          <Route path="/events/" exact component={EventsView} />

          <Route path="/:slug/event/:id" component={EventView} />
          <Route path="/event/:id" render={props => <EventView {...props} />} />

          <Route path="/:slug/services/" exact component={ServicesView} />
          <Route path="/services/" exact component={ServicesView} />

          <Route path="/:slug/service/:id" component={ServiceView} />
          <Route path="/service/:id" component={ServiceView} />
          {/*
            NOTE!
            У Route для страницы 404 мы не указали ни path, ни exact,
            а сам Route помещен в конец. Таким образом,
            Switch будет переводить на него все адреса,
            которые не встретились до, что и нужно от 404 страницы
           */}
          {/* TODO: реализовать страницу 404 */}
          {/* <Route
            render={props => (
              // console.log(`404 props`, props);
              <Fragment>
                <h1>
                  404.
                  <br />
                  <small>Page not found</small>
                </h1>
                <Link to="/">Go to main page</Link>
              </Fragment>
            )}
          /> */}
        </div>
      </ScrollToTop>
    </Router>
  );
};

export default AppRouter;
