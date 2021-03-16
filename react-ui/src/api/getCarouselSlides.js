// import Constants from '../utils/constants';

export default async function getCarouselSlides() {
  return [
    {
      img_src: 'http://loremflickr.com/1600/400/sailing',
      label: 'First slide label',
      sub_text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      img_src: 'http://loremflickr.com/1600/400/boats',
      label: 'Second slide label',
      sub_text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    },
    {
      img_src: 'http://loremflickr.com/1600/400/navy',
      label: 'Third slide label',
      sub_text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }
  ];

  // TODO: implement real endpoint
  // const url = `${Constants.baseUrl}/api/homepage_carousel_slides`;
  //
  // const slidesRes = await fetch(url);
  //
  // return await slidesRes.json();
}
