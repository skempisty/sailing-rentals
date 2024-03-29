import Constants from '../utils/constants'

/**
 * @deprecated
 * @param id
 * @returns {Promise<any>}
 */
export default async function deleteUser(id) {
  const url = `${Constants.baseUrl}/api/users/${id}`

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
    }
  }

  const userRes = await fetch(url, deleteOptions)

  return await userRes.json()
}