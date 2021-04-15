import Constants from '../utils/constants'

export default async function deleteBoat(id) {
  const url = `${Constants.baseUrl}/api/boats/${id}`

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const boatRes = await fetch(url, deleteOptions)

  return await boatRes.json()
}