import Constants from '../utils/constants';

export default async function loginOrCreateUser(googleTokenId) {
  const url = `${Constants.baseUrl}/api/users/login`;

  const postOptions = {
    method: 'POST',
    // credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ googleTokenId })
  };

  const userRes = await fetch(url, postOptions);

  return await userRes.json();
}
