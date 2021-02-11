import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store'

// Components
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route exact path='/' component={Home} />
        <section className="container">
          <Alert />
          <Switch>
            {/* Other routes will go here like such: */}
            {/* <Route exact path='/' component={HomeComponent} /> */}
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider>
)
export default App;
