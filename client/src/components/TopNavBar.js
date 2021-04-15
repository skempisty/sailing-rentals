import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';

import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

import setLoginJwt from '../utils/setLoginJwt';
import loginOrCreateUser from '../api/loginOrCreateUser';
import getUsers from '../api/getUsers';
import getMyRentals from "../api/getMyRentals";

import logo from '../images/logo.png'

import { initUsers } from '../store/users'
import { initRentals } from "../store/rentals";
import {
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
} from '../store/session'

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
    } = this.props;

    toggleLoading(true);

    try {
      const { user, jwt } = await loginOrCreateUser(tokenId);

      setLoginJwt(jwt);

      assignCurrentUser({ user });

      const myRentals = await getMyRentals()

      initRentals({ myRentals })

      if (user.isAdmin) {
        const users = await getUsers();

        initUsers({ users })
      }

      toggleLoading(false);

      // put user on profile page to complete profile
      if (!user.isApproved) {
        history.push('/profile');
      }
    } catch (error) {
      alert(`Login error: ${error}`);
    }
  }

  handleLoginFailure(res) {
    console.log('res', res);
  }

  handleLogout() {
    const { clearCurrentUser, history, initRentals, initUsers } = this.props;

    // clear admin data
    initUsers({ users: [] })
    // clear personal data
    initRentals({ myRentals: [] })

    history.push('/');

    sessionStorage.removeItem('jwt');

    clearCurrentUser();
  }

  render() {
    const { currentUser, history } = this.props;

    return (
      <div style={{ background: '#343a40' }}>
        <Navbar
          bg='dark'
          variant='dark'
          style={{
            margin: '0 auto',
            paddingLeft: '5em',
            paddingRight: '5em',
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
            <img src={logo} style={{ height: '2.5em' }} alt=''/>

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
          <Nav className='mr-auto'>
            <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>

            <Nav.Link href='https://ca-logos.printavo.com/merch/npsfyc' target='_blank'>
              Apparel
            </Nav.Link>

            <Nav.Link href='#pricing'>Contact Us</Nav.Link>
          </Nav>

          <Nav>
            {!currentUser ?
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

                  <Dropdown.Item onClick={() => history.push('/rentals')}>Sailboat Rentals</Dropdown.Item>

                  {!!currentUser.isAdmin &&
                    <React.Fragment>
                      <Dropdown.Item onClick={() => history.push('/admin-panel')}>Admin Panel</Dropdown.Item>
                    </React.Fragment>
                  }

                  <Dropdown.Item><LogoutBtn onLogoutClick={this.handleLogout.bind(this)} /></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            }
          </Nav>
        </Navbar>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.session;

  return { currentUser };
};

const mapDispatchToProps = {
  initUsers,
  initRentals,
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavBar));
