import Constants from '../utils/constants'

import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'

export default async function getLoggedInData(googleTokenId) {
  const url = `${Constants.baseUrl}/api/logged_in_data`

  const postOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ googleTokenId })
  }

  return fetchAndCheckStatus(url, [200], postOptions)
}
