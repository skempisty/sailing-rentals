import React from 'react';
import { GoogleLogout } from 'react-google-login';

export default class LogoutBtn extends React.Component {
  responseGoogle() {
    const { onLogoutClick } = this.props;

    onLogoutClick();
  }

  render() {
    return (
      <GoogleLogout
        clientId="400414767165-htug20sknn027u3oif8cse8262bvclfv.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={this.responseGoogle.bind(this)}
      />
    )
  }
}
