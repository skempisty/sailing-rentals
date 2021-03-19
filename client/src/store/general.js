import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loading: true,
    currentUser: null,
    carouselSlides: [{
      img_src: 'http://loremflickr.com/1600/400/sailing',
      label: 'First slide label',
      sub_text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }],
    posts: [{
      id: '1',
      img_src: 'http://loremflickr.com/400/600/navy',
      title: 'Example Post',
      short_description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
      description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
    }],
    users: []
  },
  reducers: {
    toggleLoading: (state, action) => {
      const { newToggleState } = action.payload

      state.loading = newToggleState;
    },
    initializeAppData: (state, action) => {
      const { user, carouselSlides, posts, users } = action.payload

      if (user) {
        const {
          first_name: firstName,
          last_name: lastName,
          email,
          image_url: imageUrl,
          is_approved: isApproved,
          is_admin: isAdmin
        } = user;

        state.currentUser = { firstName, lastName, email, imageUrl, isApproved, isAdmin };
      }

      if (carouselSlides.length) { // otherwise leave default slide
        state.carouselSlides = carouselSlides;
      }

      if (posts.length) { // otherwise leave default post
        state.posts = posts;
      }

      if (users.length) { // otherwise leave default post
        state.users = users;
      }
    },
    assignCurrentUser: (state, action) => {
      const { user } = action.payload

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        image_url: imageUrl,
        is_approved: isApproved,
        is_admin: isAdmin
      } = user;

      state.currentUser = { firstName, lastName, email, imageUrl, isApproved, isAdmin };
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  }
});

export const {
  toggleLoading,
  initializeAppData,
  assignCurrentUser,
  clearCurrentUser
} = generalSlice.actions;

export default generalSlice.reducer;
