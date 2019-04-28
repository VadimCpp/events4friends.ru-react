import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import EventView from './views/EventView'
import ScrollToTop from "./components/ScrollToTop.js";

const AppRouter = () => (
  <Router>
    <ScrollToTop>
      <div>
        <Route path="/" exact component={MainView} />
        <Route path="/about/" component={AboutView} />
        <Route path="/event/" component={EventView} />
      </div>
    </ScrollToTop>
  </Router>
);

export default AppRouter;
