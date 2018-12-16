import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import AboutView from "./views/AboutView.js";
import MainView from "./views/MainView.js";

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={MainView} />
      <Route path="/about/" component={AboutView} />
    </div>
  </Router>
);

export default AppRouter;
