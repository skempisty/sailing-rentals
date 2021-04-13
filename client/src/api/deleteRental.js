import Constants from '../utils/constants'

export default async function deleteRental(id) {
  const url = `${Constants.baseUrl}/api/rentals/${id}`

  const deleteOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const rentalRes = await fetch(url, deleteOptions)

  return await rentalRes.json()
}