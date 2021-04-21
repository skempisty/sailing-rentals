import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [
      {
        id: '1',
        title: 'Example Post',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
        imageUrl: 'http://loremflickr.com/400/400/navy'
      },
      {
        id: '2',
        title: 'Something else',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        imageUrl: 'http://loremflickr.com/600/600/luxury'
      },
      {
        id: '3',
        title: 'Something else',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        imageUrl: 'http://loremflickr.com/600/600/yacht'
      },
      {
        id: '4',
        title: 'Something else',
        body: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        imageUrl: 'http://loremflickr.com/600/600/sailing'
      }
    ]
  },
  reducers: {
    initPosts: (state, action) => {
      const { posts } = action.payload

      if (posts && posts.length) {
        state.posts = posts
      }
    },
    addPost: (state, action) => {
      const { post } = action.payload

      state.posts.push(post)
    },
    editPost: (state, action) => {
      const { updatedPost } = action.payload

      const postIndex = state.posts.findIndex(post => post.id === updatedPost.id)

      state.posts[postIndex] = updatedPost
    },
    removePost: (state, action) => {
      const { id } = action.payload

      state.posts = state.posts.filter(posts => posts.id !== id)
    }
  }
});

export const {
  initPosts,
  addPost,
  editPost,
  removePost
} = postSlice.actions;

export default postSlice.reducer;
