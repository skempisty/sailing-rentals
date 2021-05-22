import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

export default async function createRental(rental, payment) {
  const url = `${Constants.baseUrl}/api/rentals`

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ rental, payment })
  }

  return await fetchAndCheckStatus(url, [200], postOptions)
}