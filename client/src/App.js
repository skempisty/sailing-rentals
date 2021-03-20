import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingPageMessage from './components/LoadingPageMessage';
import TopNavBar from './components/TopNavBar';
import HomePage from './components/pages/HomePage/index';
import SignUp from './components/pages/SignUp';
import ShowPost from './components/pages/ShowPost';
import AdminPanel from './components/pages/AdminPanel';

import getLoggedInUser from './api/getLoggedInUser';
import getCarouselSlides from './api/getCarouselSlides';
import getPosts from './api/getPosts';
import getUsers from './api/getUsers';
import getBoats from './api/getBoats';

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
      let boats = [];

      const loggedInUser = existingJwt ? await getLoggedInUser() : null;
      const carouselSlides = await getCarouselSlides();
      const posts = await getPosts();

      // admin data
      if (loggedInUser && loggedInUser.is_admin) {
        users = await getUsers();
        boats = await getBoats();
      }

      initializeAppData({
        user: loggedInUser,
        carouselSlides,
        posts,
        users,
        boats
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

            <Route exact path='/' component={HomePage} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/posts/:id' component={ShowPost} />
            <Route exact path='/admin-panel' component={AdminPanel} />
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
