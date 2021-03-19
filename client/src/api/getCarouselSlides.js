import Constants from '../utils/constants';

export default async function getCarouselSlides() {
  const url = `${Constants.baseUrl}/api/carousel_slides`;

  const slidesRes = await fetch(url);

  return await slidesRes.json();
}
