import React from 'react';
// import PropTypes from 'prop-types';

import { Nav, Navbar, Button } from "react-bootstrap";

import LoginBtn from "./LoginBtn";
import createLoginSession from "../utils/createLoginSession";

import getUser from "../api/getUser";

export default class TopNavBar extends React.Component {
  async handleLoginSuccess(res) {
    console.log('res', res)
    console.log('profileObj', res.profileObj)

    // check if account already created and get Status (approved or not)
    const user = await getUser(res.profileObj);

    console.log("USER!", user)

    if (user[0]) {
      // login the user
    } else {

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
