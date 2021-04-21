import Constants from '../utils/constants';

export default async function updatePost(id, updateFields) {
  const url = `${Constants.baseUrl}/api/posts/${id}`;

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(updateFields)
  };

  const postRes = await fetch(url, putOptions);

  return await postRes.json();
}