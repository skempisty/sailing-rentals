import Constants from '../utils/constants'

export default async function deleteRental(id) {
  const url = `${Constants.baseUrl}/api/carousel_slides/${id}`

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const slideRes = await fetch(url, deleteOptions)

  return await slideRes.json()
}