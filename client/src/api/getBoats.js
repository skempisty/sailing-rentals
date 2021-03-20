import Constants from '../utils/constants';

export default async function getBoats() {
  const url = `${Constants.baseUrl}/api/boats`;

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  };

  const boatsRes = await fetch(url, getOptions);

  return await boatsRes.json();
}
