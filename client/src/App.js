import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux";

import TopNavBar from "./components/TopNavBar";
import Dashboard from './components/pages/HomePage';
import SignUp from './components/pages/SignUp';
import UserList from './components/pages/UserList';

import getLoggedInUser from "../src/api/getLoggedInUser";

import { loginUser } from "./store/general";

class App extends React.Component {
  async componentDidMount() {
    const { loginUser } = this.props;

    if (localStorage.getItem('tokenId')) {
      const user = await getLoggedInUser();

      loginUser({ userObj: user[0] });
    }
  }

  render() {
    return (
      <Router>
        <TopNavBar />

        <Route exact path="/" component={Dashboard} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/user-list" component={UserList} />
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedInUser } = state.general;

  return { loggedInUser };
};

const mapDispatchToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
