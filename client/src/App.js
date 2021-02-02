import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Containers
import Home from './containers/layout/Home';
import Navbar from './containers/layout/Navbar';

// Components
import HomeComponent from './components/layout/home';
import NavbarComponent from './components/layout/navbar';

import './App.css';

const App = () => (
  <Router>
    <Fragment>
      <Navbar  Layout={NavbarComponent}/>
      <Route exact path='/' component={(props) => <Home {...props} Layout={HomeComponent} title="Home"/>} />
      <section className="container">
        <Switch>
          {/* Other routes will go here like such: */}
          {/* <Route exact path='/' component={(props) => <Home {...props} Layout={HomeComponent} title="Home"/>} /> */}
        </Switch>
      </section>
    </Fragment>
  </Router>
)
export default App;
