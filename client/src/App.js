import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import SignUp from './components/pages/SignUp';
import TopNavBar from "./components/TopNavBar";

export default function App() {
  return (
    <Router>
      <TopNavBar />

      <Route exact path="/" component={Dashboard} />
      <Route exact path="/sign-up" component={SignUp} />
    </Router>
  );
}
