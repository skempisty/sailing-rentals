import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingPageMessage from './components/LoadingPageMessage';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/pages/HomePage/index';
import Profile from './components/pages/Profile';
import ShowPost from './components/pages/ShowPost';
import AdminPanel from './components/pages/AdminPanel';
import Rentals from "./components/pages/Rentals";

import getLoggedInUser from './api/getLoggedInUser';
import getCarouselSlides from './api/getCarouselSlides';
import getPosts from './api/getPosts';
import getUsers from './api/getUsers';
import getBoats from './api/getBoats';
import getMyRentals from './api/getMyRentals';

import { toggleLoading, initializeAppData } from './store/general';

/**
 * Root App component. Initialize app data here and add to Redux.
 */
class App extends React.Component {
  async componentDidMount() {
    const { toggleLoading, initializeAppData } = this.props;

    const existingJwt = sessionStorage.getItem('jwt');

    try {
      let users = [];
      // let payments = [];

      let myRentals = [];

      const loggedInUser = existingJwt ? await getLoggedInUser() : null;
      const carouselSlides = await getCarouselSlides();
      const posts = await getPosts();
      const boats = await getBoats();

      if (loggedInUser) {
        myRentals = await getMyRentals();

        if (loggedInUser.is_admin) {
          users = await getUsers();
          // payments = await getPayments();
        }
      }

      initializeAppData({
        user: loggedInUser,
        carouselSlides,
        posts,
        users,
        boats,
        // payments
        myRentals
      });

      toggleLoading({ newToggleState: false });
    } catch (error) {
      alert('Error initializing app: ' + error);
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <React.Fragment>
        {!loading ?
          <Router>
            <TopNavBar />

            <Route exact path='/profile' component={Profile} />
            <Route exact path='/posts/:id' component={ShowPost} />
            <Route exact path='/admin-panel' component={AdminPanel} />
            <Route exact path='/rentals' component={Rentals} />
            <Route exact path='/' component={HomePage} />
          </Router>
          :
          <LoadingPageMessage/>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading } = state.general;

  return { loading };
};

const mapDispatchToProps = {
  toggleLoading,
  initializeAppData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
