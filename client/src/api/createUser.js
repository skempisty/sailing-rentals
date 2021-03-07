import Constants from '../utils/constants';

export default async function createUser() {
  const url = `${Constants.baseUrl}/api/users/logged_in`;

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': localStorage.getItem('tokenId'),
    }
  };

  const userRes = await fetch(url, postOptions);

  return await userRes.json();
}
