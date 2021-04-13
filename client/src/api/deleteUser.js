import Constants from "../utils/constants";

export default async function deleteUser(id) {
  const url = `${Constants.baseUrl}/api/users/${id}`;

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  };

  const res = await fetch(url, deleteOptions);

  return await res.json();
}