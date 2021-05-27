import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import LoadingPageMessage from './components/LoadingPageMessage'
import TopNavBar from './components/TopNavBar'
import Footer from './components/Footer'
import ConditionalRoute from './components/ConditionalRoute'
import HomePage from './components/pages/HomePage/index'
import Profile from './components/pages/Profile'
import ShowPost from './components/pages/ShowPost'
import AdminPanel from './components/pages/AdminPanel'
import Rentals from './components/pages/Rentals'

import setLoginJwt from './utils/setLoginJwt'
import getSiteData from './api/getSiteData'

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

    try {
      const {
        currentUser,
        users,
        myRentals,
        allRentals,
        myPayments,
        allPayments,
        posts,
        boats,
        carouselSlides,
        updatedJwt
      } = await getSiteData()

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

      setLoginJwt(updatedJwt)

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
    const { loading, currentUser } = this.props

    return (
      <React.Fragment>
        {!loading ?
          <Router>
            <TopNavBar/>

            <Switch>
              <ConditionalRoute renderCondition={!!currentUser.id} exact path='/profile' component={Profile} />
              <ConditionalRoute renderCondition={!!currentUser.id && currentUser.isApproved === 1} exact path='/rentals' component={Rentals} />
              <ConditionalRoute renderCondition={!!currentUser.id && currentUser.isAdmin === 1} exact path='/admin-panel' component={AdminPanel} />
              <Route exact path='/posts/:id' component={ShowPost} />
              <Route component={HomePage} />
            </Switch>

            <Footer/>
          </Router>
          :
          <LoadingPageMessage/>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading, currentUser } = state.session

  return { loading, currentUser }
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
