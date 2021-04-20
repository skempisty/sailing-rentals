import { createSlice } from '@reduxjs/toolkit'

const carouselSlideSlice = createSlice({
  name: 'carouselSlides',
  initialState: {
    carouselSlides: []
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
