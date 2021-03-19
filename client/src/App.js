import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import TopNavBar from './components/TopNavBar';
import HomePage from './components/pages/HomePage/index';
import SignUp from './components/pages/SignUp';
import ShowPost from './components/pages/ShowPost';
import AdminPanel from './components/pages/AdminPanel';

import getLoggedInUser from './api/getLoggedInUser';
import getCarouselSlides from './api/getCarouselSlides';
import getPosts from './api/getPosts';

import { toggleLoading, initializeAppData } from './store/general';

/**
 * Root App component. Initialize app data here and add to Redux.
 */
class App extends React.Component {
  async componentDidMount() {
    const { toggleLoading, initializeAppData } = this.props;

    const existingJwt = sessionStorage.getItem('jwt');

    try {
      const loggedInUser = existingJwt ? await getLoggedInUser() : null;
      const carouselSlides = await getCarouselSlides();
      const posts = await getPosts();

      initializeAppData({
        user: loggedInUser,
        carouselSlides,
        posts
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
          <div>loading....</div>
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
