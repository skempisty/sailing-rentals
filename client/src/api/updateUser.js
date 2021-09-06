import Constants from '../utils/constants';

/**
 * @deprecated
 * @param id
 * @param updateFields
 * @returns {Promise<any>}
 */
export default async function updateUser(id, updateFields) {
  const url = `${Constants.baseUrl}/api/users/${id}`;

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(updateFields)
  };

  const userRes = await fetch(url, putOptions);

  return await userRes.json();
}