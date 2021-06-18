import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

export default async function createRentalBlock(rental) {
  const url = `${Constants.baseUrl}/api/rentals/nopay`

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ rental })
  }

  return await fetchAndCheckStatus(url, [200], postOptions)
}