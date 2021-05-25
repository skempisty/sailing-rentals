import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { Nav, Navbar, Dropdown } from 'react-bootstrap'
import { withRouter } from 'react-router'

import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn'
import SocialMediaBar from './shared/SocialMediaBar'

import setLoginJwt from '../utils/setLoginJwt'
import loginOrCreateUser from '../api/loginOrCreateUser'
import getUsers from '../api/getUsers'
import getMyRentals from '../api/getMyRentals'
import { breakpoints } from '../config'

import logo from '../images/logo.png'

import { initUsers } from '../store/users'
import { initRentals } from '../store/rentals'
import {
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
} from '../store/session'

const ResponsivenessWrapper = styled.div`
  .navbar {
    padding-left: 2em;
    padding-right: 2em;
    
    .navbar-brand {
      img {
        height: 1.5em;
      }
      
      span {
        font-size: 0.75em;
      }
    }
  
    .desktop-nav {
      display: none;
    }
    
    .mobile-nav {
      display: flex;
    }
  }

  @media only screen and (min-width: ${breakpoints.headerExpand}) {
    .navbar {
      padding-left: 5em;
      padding-right: 5em;
      
      .navbar-brand {
        img {
          height: 2.5em;
        }
        
        span {
          font-size: 1em;
        }
      }
    
      .desktop-nav {
        display: flex;
      }
      
      .mobile-nav {
        display: none;
      }
    }  
  }
`

/**
 * Main site top navbar
 */
class TopNavBar extends React.Component {
  async handleLoginSuccess({ tokenId }) {
    const {
      initUsers,
      initRentals,
      assignCurrentUser,
      toggleLoading,
      history
    } = this.props

    toggleLoading(true)

    try {
      const { user, jwt } = await loginOrCreateUser(tokenId)

      setLoginJwt(jwt)

      assignCurrentUser({ user })

      const myRentals = await getMyRentals()

      initRentals({ myRentals })

      if (user.isAdmin) {
        const users = await getUsers()

        initUsers({ users })
      }

      toggleLoading(false)

      // put user on profile page to complete profile
      if (!user.isApproved) {
        history.push('/profile')
      }
    } catch (error) {
      alert(`Login error: ${error}`)
    }
  }

  handleLoginFailure(res) {
    alert(`Error logging in with Google: ${res}`)
  }

  handleLogout() {
    const { clearCurrentUser, history, initRentals, initUsers } = this.props

    // clear admin data
    initUsers({ users: [] })
    // clear personal data
    initRentals({ myRentals: [] })

    history.push('/')

    sessionStorage.removeItem('jwt')

    clearCurrentUser()
  }

  render() {
    const { currentUser, history } = this.props

    return (
      <ResponsivenessWrapper>
        <div style={{ background: '#343a40' }}>
          <Navbar
            bg='dark'
            variant='dark'
            expand='lg'
            collapseOnSelect
            style={{
              display: 'flex',
              margin: '0 auto',
              maxWidth: '92em'
            }}
          >
            <Navbar.Brand
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              onClick={() => history.push('/')}
            >
              <img src={logo} alt=''/>

              <span
                style={{
                  marginLeft: '0.5em',
                  color: '#fec114',
                  fontFamily: 'arial'
                }}
              >
                NPSF YACHT CLUB
              </span>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='mr-auto mobile-nav' style={{ textAlign: 'right' }}>
                <Nav.Link eventKey onClick={() => history.push('/')}>Home</Nav.Link>

                <Nav.Link eventKey href='https://ca-logos.printavo.com/merch/npsfyc' target='_blank'>
                  Apparel
                </Nav.Link>

                {!!currentUser.id ?
                  <React.Fragment>
                    <Nav.Link eventKey onClick={() => history.push('/profile')}>
                      Profile
                    </Nav.Link>

                    {!!currentUser.isApproved &&
                      <Nav.Link eventKey onClick={() => history.push('/rentals')}>Sailboat Rentals</Nav.Link>
                    }

                    {!!currentUser.isAdmin &&
                      <Nav.Link eventKey onClick={() => history.push('/admin-panel')}>Admin Panel</Nav.Link>
                    }

                    <Nav.Link eventKey>
                      <LogoutBtn onLogoutClick={this.handleLogout.bind(this)} />
                    </Nav.Link>
                  </React.Fragment>
                  :
                  <Nav.Link eventKey>
                    <LoginBtn
                      onLogin={(res) => this.handleLoginSuccess(res)}
                      onFailure={(res) => this.handleLoginFailure(res)}
                    />
                  </Nav.Link>
                }
              </Nav>

              <Nav className='mr-auto desktop-nav'>
                <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>

                <Nav.Link href='https://ca-logos.printavo.com/merch/npsfyc' target='_blank'>
                  Apparel
                </Nav.Link>

                {/* TODO: unhide this later when contact us page is ready */}
                {/*<Nav.Link href='#pricing'>Contact Us</Nav.Link>*/}

                <SocialMediaBar margin='0 0 0 1em' />
              </Nav>

              <Nav className='desktop-nav'>
                {!currentUser.id ?
                  <LoginBtn
                    onLogin={(res) => this.handleLoginSuccess(res)}
                    onFailure={(res) => this.handleLoginFailure(res)}
                  />
                  :
                  <Dropdown alignRight>
                    <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                      <img
                        src={currentUser.imageUrl}
                        style={{ height: '3em', marginRight: '1em' }}
                        alt=''
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => history.push('/profile')}>
                        Profile
                      </Dropdown.Item>

                      {!!currentUser.isApproved &&
                        <Dropdown.Item onClick={() => history.push('/rentals')}>Sailboat Rentals</Dropdown.Item>
                      }

                      {!!currentUser.isAdmin &&
                        <Dropdown.Item onClick={() => history.push('/admin-panel')}>Admin Panel</Dropdown.Item>
                      }

                      <Dropdown.Item><LogoutBtn onLogoutClick={this.handleLogout.bind(this)} /></Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                }
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
      </ResponsivenessWrapper>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.session

  return { currentUser }
}

const mapDispatchToProps = {
  initUsers,
  initRentals,
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavBar))
