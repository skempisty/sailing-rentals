import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'
import Constants from '../utils/constants'

export default async function updateSettings(updateFields) {
  const url = `${Constants.baseUrl}/api/settings`

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(updateFields)
  }

  return await fetchAndCheckStatus(url, [200], putOptions)
}