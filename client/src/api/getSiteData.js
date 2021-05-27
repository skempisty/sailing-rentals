import Constants from '../utils/constants'

export default async function getBoats() {
  const url = `${Constants.baseUrl}/api/site_data`

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const siteDataRes = await fetch(url, getOptions)

  return await siteDataRes.json()
}
