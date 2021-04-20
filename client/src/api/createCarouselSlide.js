import Constants from '../utils/constants'

export default async function createCarouselSlide(slideImageUrl) {
  const url = `${Constants.baseUrl}/api/carousel_slides`

  const postOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ slideImageUrl })
  }

  const slideRes = await fetch(url, postOptions)

  return await slideRes.json()
}