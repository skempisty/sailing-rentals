import { createSlice } from '@reduxjs/toolkit'

const carouselSlideSlice = createSlice({
  name: 'carouselSlides',
  initialState: {
    carouselSlides: [{
      label: 'First slide label',
      subText: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      imageUrl: 'http://loremflickr.com/1600/400/sailing'
    },
    {
      label: 'Second slide label',
      subText: 'Nulla vitae elit libero, a pharetra augue mollis interdum.',
      imageUrl: 'http://loremflickr.com/1600/400/sailing'
    }]
  },
  reducers: {
    initCarousel: (state, action) => {
      const { carouselSlides } = action.payload

      if (carouselSlides && carouselSlides.length) {
        state.carouselSlides = carouselSlides
      }
    }
  }
})

export const {
  initCarousel,
} = carouselSlideSlice.actions

export default carouselSlideSlice.reducer
