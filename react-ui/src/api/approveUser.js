import Constants from '../utils/constants';

export default async function approveUser(id) {
  const url = `${Constants.baseUrl}/api/users/${id}/approve`;

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenId'),
    }
  };

  const res = await fetch(url, putOptions);

  return await res.json();
}
