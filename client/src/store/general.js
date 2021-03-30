import { createSlice } from '@reduxjs/toolkit';

import Boat from '../models/Boat';

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
    users: [],
    boats: [],
    myRentals: []
  },
  reducers: {
    toggleLoading: (state, action) => {
      const { newToggleState } = action.payload

      state.loading = newToggleState;
    },
    initializeAppData: (state, action) => {
      const {
        user,
        carouselSlides,
        posts,
        users,
        boats,
        myRentals,
        rentals
      } = action.payload

      if (user) {
        const {
          id,
          first_name: firstName,
          last_name: lastName,
          email,
          image_url: imageUrl,
          is_approved: isApproved,
          is_admin: isAdmin,
          phone,
          job_title: jobTitle,
          affiliation
        } = user;

        state.currentUser = { id, firstName, lastName, email, imageUrl, isApproved, isAdmin, phone, jobTitle, affiliation };
      }

      if (carouselSlides && carouselSlides.length) { // otherwise leave default slide
        state.carouselSlides = carouselSlides;
      }

      if (posts && posts.length) { // otherwise leave default post
        state.posts = posts;
      }

      if (users && users.length) {
        state.users = users;
      }

      if (boats && boats.length) {
        state.boats = boats;
      }

      if (myRentals && myRentals.length) {
        state.myRentals = myRentals;
      }
    },
    assignCurrentUser: (state, action) => {
      const { user } = action.payload

      const {
        id,
        first_name: firstName,
        last_name: lastName,
        email,
        image_url: imageUrl,
        is_approved: isApproved,
        is_admin: isAdmin,
        phone,
        job_title: jobTitle,
        affiliation
      } = user;

      state.currentUser = { id, firstName, lastName, email, imageUrl, isApproved, isAdmin, phone, jobTitle, affiliation };
    },
    updateCurrentUser: (state, action) => {
      const { toUpdate } = action.payload

      if (toUpdate.phone !== null) state.currentUser.phone = toUpdate.phone
      if (toUpdate.jobTitle !== null) state.currentUser.jobTitle = toUpdate.jobTitle
      if (toUpdate.affiliation !== null) state.currentUser.affiliation = toUpdate.affiliation
    },
    updateUserById: (state, action) => {
      const { id, toUpdate } = action.payload

      const toChangeUserIndex = state.users.findIndex(user => user.id === id);

      if (toUpdate.phone !== null) state.users[toChangeUserIndex].phone = toUpdate.phone
      if (toUpdate.jobTitle !== null) state.users[toChangeUserIndex].jobTitle = toUpdate.jobTitle
      if (toUpdate.affiliation !== null) state.users[toChangeUserIndex].affiliation = toUpdate.affiliation
      if (toUpdate.isApproved !== null) state.users[toChangeUserIndex].is_approved = toUpdate.isApproved ? 1 : 0
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    addNewBoat: (state, action) => {
      const { name } = action.payload

      state.boats.push(new Boat({
        name
      }))
    }
  }
});

export const {
  toggleLoading,
  initializeAppData,
  assignCurrentUser,
  updateCurrentUser,
  updateUserById,
  clearCurrentUser,
  addNewBoat
} = generalSlice.actions;

export default generalSlice.reducer;
