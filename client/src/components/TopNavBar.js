import React from 'react';
import { connect } from 'react-redux';
import { Nav, Navbar } from "react-bootstrap";
import { withRouter } from 'react-router';

import LoginBtn from "./LoginBtn";

import getLoggedInUser from "../api/getLoggedInUser";

import { loginUser } from '../store/general';

class TopNavBar extends React.Component {
  async handleLoginSuccess(loginRes) {
    const { loginUser, history } = this.props;

    // will include this tokenId with every request
    window.localStorage.setItem('tokenId', loginRes.tokenId);

    const user = await getLoggedInUser(loginRes.profileObj.googleId);

    if (user[0]) {
      loginUser({ userObj: user[0] });
      history.push('/')
    } else {
      history.push('/sign-up')
    }
  }

  handleLoginFailure(res) {
    console.log('res', res);
  }

  render() {
    const { loggedInUser } = this.props;

    console.log('loggedInUser', loggedInUser)

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">NPSFYC</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>

        <Nav>
          <LoginBtn
            onLogin={(res) => this.handleLoginSuccess(res)}
            onFailure={(res) => this.handleLoginFailure(res)}
          />
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
