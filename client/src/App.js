import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import SignInSide from './components/pages/SignInSide';

function getLoginSession() {
  return window.localStorage.getItem('sailing-session');
  // return { hello: 'what' };
}

export default function App() {
  const session = getLoginSession();

  return (
    <Router>
      {session ?
        <Route exact path="/" component={Dashboard} />
        :
        <Route exact path="/" component={SignInSide} />
      }
    </Router>
  );
}
