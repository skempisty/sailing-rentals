import Constants from '../utils/constants';

export default async function getUsers() {
  const url = `${Constants.baseUrl}/api/users`;

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  };

  const usersRes = await fetch(url, getOptions);

  return await usersRes.json();
}
