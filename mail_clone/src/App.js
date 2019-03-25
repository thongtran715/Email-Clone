import React, { Component } from 'react';
import './App.css';
import EmailBar from "./Component/EmailBar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./Component/Auth/Login";
import {PreLogInAuth} from "./Component/Auth/PreAuth";
import {ProtectedRoute} from "./Component/Auth/ProtectedRoute";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
              <PreLogInAuth path="/"  exact={true} component={Login}/>
              <ProtectedRoute path="/mail"  exact={true} component={EmailBar}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
