import Constants from '../utils/constants';

export default async function getLoggedInUser() {
  const url = `${Constants.baseUrl}/api/users/logged_in`;

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('tokenId'),
    }
  };

  const userRes = await fetch(url, getOptions);

  return await userRes.json();
}
