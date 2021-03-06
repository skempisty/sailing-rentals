import React from 'react';

import LoginBtn from '../LoginBtn';

import createLoginSession from '../../utils/createLoginSession';
import loginUser from '../../api/loginUser';

async function handleLoginSuccess(res) {
  // const user = await loginUser(res.profileObj);

  // createLoginSession(user);

  createLoginSession({
    name: 'Stephen'
  });

  window.location = '/'
}

function handleLoginFailure(res) {
  console.log('res', res);
}

export default function SignInSide() {
  return (
    <LoginBtn
      onLogin={(res) => handleLoginSuccess(res)}
      onFailure={(res) => handleLoginFailure(res)}
    />
  );
}