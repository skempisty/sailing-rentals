import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Dashboard from './components/pages/Dashboard';
import SignUp from './components/pages/SignUp';
import TopNavBar from "./components/TopNavBar";

import getUsers from "./api/getUsers";

async function getLoginSession() {

  // return { hello: 'what' };

  const hello = await getUsers();

  console.log('hello', hello)

  return window.localStorage.getItem('sailing-session');
}

export default function App() {
  // const session = getLoginSession();

  return (
    <React.Fragment>
      <TopNavBar />

      <Router>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/sign-up" component={SignUp} />
      </Router>
    </React.Fragment>
  );
}
