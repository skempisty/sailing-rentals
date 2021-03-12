import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import { withRouter } from 'react-router';

import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";

import getLoggedInUser from "../api/getLoggedInUser";

import { loginUser } from '../store/general';

class TopNavBar extends React.Component {
  async handleLoginSuccess(loginRes) {
    const { loginUser, history } = this.props;

    // will include this tokenId with every request
    localStorage.setItem('tokenId', loginRes.tokenId);

    const user = await getLoggedInUser();

    loginUser({ userObj: user[0] });

    if (!user[0].isApproved) {
      // put user on sign-up page to complete profile
      history.push('/sign-up')
    }
  }

  handleLoginFailure(res) {
    console.log('res', res);
  }

  render() {
    const { loggedInUser, history } = this.props;

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
          {!loggedInUser ?
            <LoginBtn
              onLogin={(res) => this.handleLoginSuccess(res)}
              onFailure={(res) => this.handleLoginFailure(res)}
            />
            :
            <Dropdown alignRight>
              <Dropdown.Toggle variant="dark" id="dropdown-basic">
                <img
                  src={loggedInUser.imageUrl}
                  style={{ height: '3em', marginRight: '1em' }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push('/sign-up')}>
                    Profile
                </Dropdown.Item>

                <Dropdown.Item onClick={() => history.push('/my-rentals')}>My Rentals</Dropdown.Item>

                <Dropdown.Item><LogoutBtn/></Dropdown.Item>

                {!!loggedInUser.isAdmin &&
                  <React.Fragment>
                    <h3>Admins Only</h3>

                    <Dropdown.Item onClick={() => history.push('/homepage-management  ')}>Homepage Management</Dropdown.Item>

                    <Dropdown.Item href="#/action-4">Post</Dropdown.Item>

                    <Dropdown.Item onClick={() => history.push('/user-list')}>
                      User List
                    </Dropdown.Item>

                    <Dropdown.Item href="#/action-5">Boat List</Dropdown.Item>

                    <Dropdown.Item href="#/action-6">Rental List</Dropdown.Item>
                  </React.Fragment>
                }
              </Dropdown.Menu>
            </Dropdown>
          }
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedInUser } = state.general;

  return { loggedInUser };
};

const mapDispatchToProps = { loginUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TopNavBar));
