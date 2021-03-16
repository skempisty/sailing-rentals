// import Constants from '../utils/constants';

export default async function getPost(id) {
  return {
    id: '1',
    img_src: 'http://loremflickr.com/400/600/sailing',
    title: 'Title 1',
    short_description: 'descrip1',
    description: 'descrip1'
  }

  // TODO: implement real endpoint
  // const url = `${Constants.baseUrl}/api/posts/${id}`;
  //
  // const postRes = await fetch(url);
  //
  // return await postRes.json();
}
