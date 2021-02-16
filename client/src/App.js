import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store'

// Components
import Home from './components/layout/Home';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Register from './components/layout/Register';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
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
              <Route exact path='/register' component={Register} />

            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
