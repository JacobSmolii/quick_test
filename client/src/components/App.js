import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './Login';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute'
import Physics from './Physics';
import Maths from './Maths';
import Astronomy from './Astronomy';

function App() {
  return (
    <div className="app">
      <Router>

        <Switch>
          <Route path="/login" component={Login} />

          <PrivateRoute path='/physics' component={Physics} />
          <PrivateRoute path='/math' component={Maths} />
          <PrivateRoute path='/astronomy' component={Astronomy} />

          <PrivateRoute path='/' component={Home} />
        </Switch>

      </Router>
    </div>
  );
}

export default App;
