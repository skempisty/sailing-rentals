import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux";

import TopNavBar from "./components/TopNavBar";
import HomePage from './components/pages/HomePage/index';
import SignUp from './components/pages/SignUp';
import ShowPost from './components/pages/ShowPost';
import AdminPanel from './components/pages/AdminPanel';

import getLoggedInUser from "../src/api/getLoggedInUser";

import { assignCurrentUser } from "./store/general";

class App extends React.Component {
  async componentDidMount() {
    const { assignCurrentUser } = this.props;

    // get from sessionStorage the jwt
    const existingJwt = sessionStorage.getItem('jwt');

    if (existingJwt) {
      // get user and assign to redux
      const user = await getLoggedInUser();

      await assignCurrentUser({ user })
    }
  }

  render() {
    return (
      <Router>
        <TopNavBar />

        <Route exact path="/" component={HomePage} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/posts/:id" component={ShowPost} />
        <Route exact path="/admin-panel" component={AdminPanel} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedInUser } = state.general;

  return { loggedInUser };
};

const mapDispatchToProps = { assignCurrentUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
