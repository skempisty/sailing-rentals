import { createSlice } from '@reduxjs/toolkit';

const carouselSlideSlice = createSlice({
  name: 'carouselSlides',
  initialState: {
    carouselSlides: [{
      img_src: 'http://loremflickr.com/1600/400/sailing',
      label: 'First slide label',
      sub_text: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    }]
  },
  reducers: {
    initCarousel: (state, action) => {
      const { carouselSlides } = action.payload

      if (carouselSlides && carouselSlides.length) {
        state.carouselSlides = carouselSlides;
      }
    },
  }
});

export const {
  initCarousel,
} = carouselSlideSlice.actions;

export default carouselSlideSlice.reducer;
