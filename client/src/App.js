import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import SignInSide from './components/pages/SignInSide';

export default function App() {
  return (
    <Router>
      <Route exact path="/" component={SignInSide} />
    </Router>
  );
}
