import React from 'react';
// import PropTypes from 'prop-types';

import { Nav, Navbar, Button } from "react-bootstrap";

import LoginBtn from "./LoginBtn";
import createLoginSession from "../utils/createLoginSession";

import getLoggedInUser from "../api/getLoggedInUser";

export default class TopNavBar extends React.Component {
  async handleLoginSuccess(loginRes) {
    console.log('loginRes', loginRes)
    console.log('profileObj', loginRes.profileObj)

    window.localStorage.setItem('tokenId', loginRes.tokenId);

    // check if account already created and get Status (approved or not)
    const user = await getLoggedInUser(loginRes.profileObj.googleId);

    console.log("USER!", user)

    if (user[0]) {
      // login the user
    } else {
      console.log('user not found!')
      // create unapproved user
      // await createUser()
    }


    // const user = await loginUser(res.profileObj);

    // createLoginSession(user);
  }

  handleLoginFailure(res) {
    console.log('res', res);
  }

  render() {
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
