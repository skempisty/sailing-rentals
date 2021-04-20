import Constants from '../utils/constants'

export default async function moveCarouselSlide(oldIndex, newIndex) {
  const url = `${Constants.baseUrl}/api/carousel_slides/move?oldIndex=${oldIndex}&newIndex=${newIndex}`

  const putOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
    }
  }

  await fetch(url, putOptions)
}