import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import CreateUser from './components/CreateUser';
import ViewUsers from './components/ViewUsers';
import login from './components/login';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
        <Route exact path='/' component={login} />
          <Route path='/login' component={login} />
    
        </div>
      </Router>
    );
  }
}

export default App;