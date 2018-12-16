import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";
import ScrollToTop from "./components/ScrollToTop.js";

const AppRouter = () => (
  <Router>
  	<ScrollToTop>
      <div>
        <Route path="/" exact component={MainView} />
        <Route path="/about/" component={AboutView} />
      </div>
    </ScrollToTop>
  </Router>
);

export default AppRouter;
