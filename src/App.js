import React, { Component } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route } from 'react-router-dom'

import Login from './components/Login';
import Home from './components/Home'
import Detail from './components/Detail'
import RequireAuth from './components/RequireAuth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="image-div"></div>
        <Route exact path='/' component={Login} />
        <Route path="/Home"
          component={props => <RequireAuth {...props} Component={Home} />} />
        <Route path="/Detail/:id"
          component={Detail} />
      </div>
    );
  }
}

export default App;
