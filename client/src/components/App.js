import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Login from './Login';


function App() {
  return (
    <div className="app">
      <Router>
        <Switch>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            Home
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
