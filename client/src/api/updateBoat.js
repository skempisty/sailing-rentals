import Constants from '../utils/constants';

export default async function updateBoat(id, updateFields) {
  console.log('updateFields', updateFields)

  const url = `${Constants.baseUrl}/api/boats/${id}`;

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(updateFields)
  };

  const boatRes = await fetch(url, putOptions);

  return await boatRes.json();
}