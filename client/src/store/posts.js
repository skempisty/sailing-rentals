import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: []
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

      const postIndex = state.posts.findIndex(post => Number(post.id) === Number(updatedPost.id))

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

export const usePosts = () => {
  const posts = useSelector(state => state.posts)

  return { ...posts }
}

export default postSlice.reducer;
