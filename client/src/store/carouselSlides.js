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
    },
    addCarouselSlide: (state, action) => {
      const { newSlide } = action.payload

      state.carouselSlides.push(newSlide)
    }
  }
})

export const {
  initCarousel,
  addCarouselSlide
} = carouselSlideSlice.actions

export default carouselSlideSlice.reducer
