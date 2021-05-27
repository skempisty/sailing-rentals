import Constants from '../utils/constants'

import fetchAndCheckStatus from '../utils/fetchAndCheckStatus'

export default async function getSiteData() {
  const url = `${Constants.baseUrl}/api/site_data`

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  return fetchAndCheckStatus(url, [200], getOptions)
}
