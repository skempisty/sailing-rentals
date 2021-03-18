import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { withRouter } from 'react-router';

import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";

import loginOrCreateUser from "../api/loginOrCreateUser";

import { assignCurrentUser, clearCurrentUser } from '../store/general';

class TopNavBar extends React.Component {
  async handleLoginSuccess({ tokenId }) {
    const { assignCurrentUser, history } = this.props;

    try {
      const { user, jwt } = await loginOrCreateUser(tokenId);

      sessionStorage.setItem('jwt', jwt);

      assignCurrentUser({ user });

      if (!user.isApproved) {
        // put user on sign-up page to complete profile
        history.push('/sign-up');
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

    sessionStorage.removeItem('jwt');

    clearCurrentUser();

    history.push('/');
  }

  render() {
    const { currentUser, history } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">NPSFYC</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push('/')}>Home</Nav.Link>

          <Nav.Link href="https://ca-logos.printavo.com/merch/npsfyc" target='_blank'>
            Apparel
          </Nav.Link>

          <Nav.Link href="#pricing">Contact Us</Nav.Link>
        </Nav>

        <Nav>
          {!currentUser ?
            <LoginBtn
              onLogin={(res) => this.handleLoginSuccess(res)}
              onFailure={(res) => this.handleLoginFailure(res)}
            />
            :
            <Dropdown alignRight>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <img
                  src={currentUser.imageUrl}
                  style={{ height: '3em', marginRight: '1em' }}
                  alt=''
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push('/sign-up')}>
                    Profile
                </Dropdown.Item>

                <Dropdown.Item onClick={() => history.push('/my-rentals')}>My Rentals</Dropdown.Item>

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
  assignCurrentUser,
  clearCurrentUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavBar));
