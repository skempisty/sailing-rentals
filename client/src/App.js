import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import LoadingPageMessage from './components/LoadingPageMessage'
import TopNavBar from './components/TopNavBar'
import HomePage from './components/pages/HomePage/index'
import Profile from './components/pages/Profile'
import ShowPost from './components/pages/ShowPost'
import AdminPanel from './components/pages/AdminPanel'
import Rentals from './components/pages/Rentals'

import setLoginJwt from './utils/setLoginJwt'
import getLoggedInUser from './api/getLoggedInUser'
import getCarouselSlides from './api/getCarouselSlides'
import getPosts from './api/getPosts'
import getUsers from './api/getUsers'
import getBoats from './api/getBoats'
import getMyRentals from './api/getMyRentals'
import getAllRentals from './api/getAllRentals'
import getMyPayments from './api/getMyPayments'
import getAllPayments from './api/getAllPayments'

import { toggleLoading, initSession } from './store/session'
import { initUsers } from './store/users'
import { initBoats } from './store/boats'
import { initRentals } from './store/rentals'
import { initPayments } from './store/payments'
import { initPosts } from './store/posts'
import { initCarousel } from './store/carouselSlides'

/**
 * Root App component. Initialize app data here and add to Redux.
 */
class App extends React.Component {
  async componentDidMount() {
    const { toggleLoading } = this.props

    const existingJwt = sessionStorage.getItem('jwt')

    try {
      let currentUser = null
      let users = []
      let myRentals = []
      let myPayments = []
      let allPayments = []

      if (existingJwt) {
        const { user: loggedInUser, updatedJwt } = await getLoggedInUser()

        currentUser = loggedInUser
        setLoginJwt(updatedJwt)

        // Personal data
        myRentals = await getMyRentals()
        myPayments = await getMyPayments()

        // Admin data
        if (loggedInUser.isAdmin) {
          users = await getUsers()
          allPayments = await getAllPayments()
        }
      }

      // Always load data
      const posts = await getPosts()
      const boats = await getBoats()
      const allRentals = await getAllRentals()
      const carouselSlides = await getCarouselSlides()

      this.initializeData({
        currentUser,
        carouselSlides,
        posts,
        users,
        boats,
        myRentals,
        allRentals,
        myPayments,
        allPayments
      })

      toggleLoading({ newToggleState: false })
    } catch (error) {
      alert('Error initializing app: ' + error)
    }
  }

  initializeData({
    currentUser,
    carouselSlides,
    posts,
    users,
    boats,
    myRentals,
    allRentals,
    myPayments,
    allPayments
  }) {
    // call all slice init methods
    const {
      initSession,
      initUsers,
      initBoats,
      initRentals,
      initPayments,
      initCarousel,
      initPosts
    } = this.props

    initSession({ currentUser })
    initUsers({ users })
    initBoats({ boats })
    initRentals({ myRentals, allRentals })
    initPayments({ myPayments, allPayments })
    initPosts({ posts })
    initCarousel({ carouselSlides })
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
  const { loading } = state.session

  return { loading }
}

const mapDispatchToProps = {
  toggleLoading,
  initSession,
  initUsers,
  initBoats,
  initRentals,
  initPayments,
  initPosts,
  initCarousel
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
