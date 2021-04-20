import Constants from '../utils/constants'

/**
 * Reorder carousel slides based on new ordering imposed by drag/drop
 * @param {int[]} sortIdOrder
 * @return {Promise<void>}
 */
export default async function rearrangeCarouselSlides(sortIdOrder) {
  const url = `${Constants.baseUrl}/api/carousel_slides/rearrange`

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(sortIdOrder)
  }

  await fetch(url, putOptions)
}