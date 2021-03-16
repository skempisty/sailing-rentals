// import Constants from '../utils/constants';

export default async function getPosts() {
  return [
    {
      id: '1',
      img_src: 'http://loremflickr.com/400/600/sailing',
      title: 'Title 1',
      short_description: 'descrip1',
      description: 'descrip1'
    },
    {
      id: '2',
      img_src: 'http://loremflickr.com/400/600/friend',
      title: 'Title 2',
      short_description: 'descrip2',
      description: 'descrip2'
    },
    {
      id: '3',
      img_src: 'http://loremflickr.com/400/600/spongebob',
      title: 'Title 3',
      short_description: 'descrip3',
      description: 'descrip3'
    }
  ];

  // TODO: implement real endpoint
  // const url = `${Constants.baseUrl}/api/posts`;
  //
  // const postsRes = await fetch(url);
  //
  // return await postsRes.json();
}
