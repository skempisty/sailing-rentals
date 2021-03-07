import React from 'react';
import { GoogleLogin } from 'react-google-login';

function LoginBtn(props) {
  const { onLogin, onFailure } = props;

  return (
    <GoogleLogin
      clientId="400414767165-htug20sknn027u3oif8cse8262bvclfv.apps.googleusercontent.com"
      buttonText="Signup/Login"
      onSuccess={onLogin}
      onFailure={onFailure}
      cookiePolicy={'single_host_origin'}
    />
  )
}

export default LoginBtn;
