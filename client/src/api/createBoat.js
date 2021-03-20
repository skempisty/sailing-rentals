import Constants from '../utils/constants';

export default async function createBoat(name) {
  const url = `${Constants.baseUrl}/api/boats`;

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name })
  };

  const boatRes = await fetch(url, postOptions);

  return await boatRes.json();
}