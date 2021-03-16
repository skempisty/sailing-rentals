import Constants from "../utils/constants";

export default async function deleteUser(id) {
  const url = `${Constants.baseUrl}/api/users/${id}`;

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('tokenId'),
    }
  };

  const res = await fetch(url, deleteOptions);

  return await res.json();
}