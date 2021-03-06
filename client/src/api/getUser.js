import Constants from '../utils/constants';

export default async function getUser(profileObj) {
  const userResponse = await fetch(`${Constants.baseUrl}/api/user/${profileObj.googleId}`);

  return await userResponse.json();
}
