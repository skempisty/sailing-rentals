import Constants from '../utils/constants'

export default async function getAllPayments() {
  const url = `${Constants.baseUrl}/api/payments`

  const getOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  const paymentsRes = await fetch(url, getOptions)

  return await paymentsRes.json()
}
