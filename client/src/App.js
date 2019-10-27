import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import Heading from './components/layouts/Heading';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Fragment>
      <Heading />
      <section className="container">
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
