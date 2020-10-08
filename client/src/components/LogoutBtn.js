import React from 'react';
import { GoogleLogout } from 'react-google-login';

function LogoutBtn() {
  const responseGoogle = () => {
    window.localStorage.removeItem('sailing-session');

    window.location = '/';
  };

  return (
    <GoogleLogout
      clientId="400414767165-htug20sknn027u3oif8cse8262bvclfv.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={responseGoogle}
    />
  )
}

export default LogoutBtn;