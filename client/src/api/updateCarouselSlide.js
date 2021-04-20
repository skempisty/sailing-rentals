import Constants from '../utils/constants'

export default async function updateCarouselSlide(id, updateFields) {
  const url = `${Constants.baseUrl}/api/carousel_slides/${id}`

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    },
    body: JSON.stringify(updateFields)
  };

  const slideRes = await fetch(url, putOptions)

  return await slideRes.json()
}