import Constants from '../utils/constants'

export default async function deletePost(id) {
  const url = `${Constants.baseUrl}/api/posts/${id}`

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const postRes = await fetch(url, deleteOptions)

  return await postRes.json()
}