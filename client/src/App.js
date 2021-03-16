import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from "react-redux";

import TopNavBar from "./components/TopNavBar";
import HomePage from './components/pages/HomePage/index';
import SignUp from './components/pages/SignUp';
import ShowPost from './components/pages/ShowPost';
import AdminPanel from './components/pages/AdminPanel';

import getLoggedInUser from "../src/api/getLoggedInUser";

import { loginUser } from "./store/general";

class App extends React.Component {
  async componentDidMount() {
    console.log(process.env.NODE_ENV)

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

const mapDispatchToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
