import Constants from '../utils/constants';

export default async function getLoggedInUser() {
  const url = `${Constants.baseUrl}/api/users/logged_in`;

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  };

  const userRes = await fetch(url, getOptions);

  try {
    return await userRes.json();
  } catch (error) {
    return null;
  }
}
