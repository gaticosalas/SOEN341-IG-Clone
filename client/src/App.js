import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Components
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Profile from './components/pages/Profile';

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
          <Route exact path='/' component={Login} />
          <section className="container">
            <Alert />
            <Switch>
              {/* Other routes will go here */}
              <Route exact path='/register' component={Register} />
              <Route exact path='/profile/:user_id' component={Profile} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}
export default App;
