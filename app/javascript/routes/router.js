import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../components/Login";
import Home from '../components/Home';

import createHistory from "history/createBrowserHistory";
import SignInForm from "../components/SignUp";

const history = createHistory();

const router = (
  <Router>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/signup" exact component={SignInForm} />
      <Route path="/home" exact component={Home} />
    </Switch>
  </Router>
);

export { router };