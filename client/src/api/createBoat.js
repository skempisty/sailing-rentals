import Constants from '../utils/constants'

/**
 * Create a boat
 * @param {Boat} boat specs to tell backend what the new boat should be
 * @return {Promise<Boat>} the newly created Boat object
 */
export default async function createBoat(boat) {
  const url = `${Constants.baseUrl}/api/boats`

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ boat })
  }

  const boatRes = await fetch(url, postOptions)

  return await boatRes.json()
}