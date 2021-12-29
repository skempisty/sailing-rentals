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
import AddClass from './components/pages/AddClass'
import ClassRegistration from './components/pages/ClassRegistration'
import ApiErrorModal from './components/ApiErrorModal'

import setLoginJwt from './utils/setLoginJwt'
import getSiteData from './api/getSiteData'

import { setSiteState } from './store/site'
import { toggleLoading, initSession } from './store/session'
import { initUsers } from './store/users'
import { initBoats } from './store/boats'
import { initRentals } from './store/rentals'
import { initPayments } from './store/payments'
import { initPosts } from './store/posts'
import { initCarousel } from './store/carouselSlides'
import { initSettings } from './store/settings'

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
        settings,
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
        allPayments,
        settings
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
    allPayments,
    settings
  }) {
    // call all slice init methods
    const {
      initSession,
      initUsers,
      initBoats,
      initRentals,
      initPayments,
      initCarousel,
      initPosts,
      initSettings
    } = this.props

    initSession({ currentUser })
    initUsers({ users })
    initBoats({ boats })
    initRentals({ myRentals, allRentals })
    initPayments({ myPayments, allPayments })
    initPosts({ posts })
    initCarousel({ carouselSlides })
    initSettings({ settings })
  }

  render() {
    const { loading, currentUser, loadingMsg } = this.props

    return (
      <React.Fragment>
        {!loading ?
          <React.Fragment>
            {loadingMsg &&
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                  pointerEvents: null,
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  zIndex: '225' // need 225 to fully overlay Paypal buttons
                }}
              >
                <LoadingPageMessage loadingMsg={loadingMsg} appearDelay={500}/>
              </div>
            }

            <Router>
              <ApiErrorModal/>

              <TopNavBar/>

              <Switch>
                <ConditionalRoute renderCondition={!!currentUser.id} exact path='/profile' component={Profile} />
                <ConditionalRoute renderCondition={!!currentUser.id && currentUser.isApproved === 1} exact path='/rentals' component={Rentals} />
                <ConditionalRoute renderCondition={!!currentUser.id && currentUser.isAdmin === 1} exact path='/admin-panel' component={AdminPanel} />
                <ConditionalRoute renderCondition={!!currentUser.id && currentUser.isAdmin === 1} exact path='/classes/:id' component={AddClass} />
                <ConditionalRoute renderCondition={!!currentUser.id} exact path='/class-registration' component={ClassRegistration} />
                <Route exact path='/posts/:id' component={ShowPost} />
                <Route component={HomePage} />
              </Switch>

              <Footer/>
            </Router>
          </React.Fragment>
          :
          <LoadingPageMessage/>
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const { loading, currentUser } = state.session
  const { loadingMsg } = state.site

  return { loading, currentUser, loadingMsg }
}

const mapDispatchToProps = {
  setSiteState,
  toggleLoading,
  initSession,
  initUsers,
  initBoats,
  initRentals,
  initPayments,
  initPosts,
  initCarousel,
  initSettings
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
