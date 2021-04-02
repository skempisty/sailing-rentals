import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [{
      id: '1',
      img_src: 'http://loremflickr.com/400/600/navy',
      title: 'Example Post',
      short_description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
    }]
  },
  reducers: {
    initPosts: (state, action) => {
      const { posts } = action.payload

      if (posts && posts.length) {
        state.posts = posts;
      }
    },
  }
});

export const {
  initPosts
} = postSlice.actions;

export default postSlice.reducer;
