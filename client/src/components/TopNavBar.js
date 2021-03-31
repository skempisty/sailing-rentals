import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, Dropdown } from 'react-bootstrap';
import { withRouter } from 'react-router';

import LoginBtn from './LoginBtn';
import LogoutBtn from './LogoutBtn';

import loginOrCreateUser from '../api/loginOrCreateUser';
import getUsers from '../api/getUsers';
import getBoats from '../api/getBoats';

import logo from '../images/logo.png'

import {
  initializeAppData,
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
} from '../store/general';

/**
 * Main site top navbar
 */
class TopNavBar extends React.Component {
  async handleLoginSuccess({ tokenId }) {
    const {
      initializeAppData,
      assignCurrentUser,
      toggleLoading,
      history
    } = this.props;

    try {
      const { user, jwt } = await loginOrCreateUser(tokenId);

      sessionStorage.setItem('jwt', jwt);

      assignCurrentUser({ user });

      if (user.is_admin) {
        toggleLoading(true);

        const users = await getUsers();
        const boats = await getBoats();

        initializeAppData({
          users,
          boats
        })

        toggleLoading(false);
      }

      if (!user.is_approved) {
        // put user on profile page to complete profile
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
    const { clearCurrentUser, history } = this.props;

    history.push('/');

    sessionStorage.removeItem('jwt');

    clearCurrentUser();
  }

  render() {
    const { currentUser, history } = this.props;

    return (
      <Navbar bg='dark' variant='dark'>
        <Navbar.Brand href='#home' style={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} style={{ height: '2.5em' }} alt=""/>

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

                <Dropdown.Item onClick={() => history.push('/rentals')}>Rentals</Dropdown.Item>

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
    )
  }
}

const mapStateToProps = (state) => {
  const { currentUser } = state.general;

  return { currentUser };
};

const mapDispatchToProps = {
  initializeAppData,
  assignCurrentUser,
  clearCurrentUser,
  toggleLoading
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavBar));
