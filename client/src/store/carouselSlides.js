import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

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
    },
    editCarouselSlide: (state, action) => {
      const { updatedSlide } = action.payload

      const slideIndex = state.carouselSlides.findIndex(slide => slide.id === updatedSlide.id)

      state.carouselSlides[slideIndex] = updatedSlide
    },
    removeCarouselSlide: (state, action) => {
      const { id } = action.payload

      state.carouselSlides = state.carouselSlides.filter(slide => slide.id !== id)
    }
  }
})

export const {
  initCarousel,
  addCarouselSlide,
  editCarouselSlide,
  removeCarouselSlide
} = carouselSlideSlice.actions

export const useCarouselSlides = () => {
  const carouselSlides = useSelector(state => state.carouselSlides)

  return { ...carouselSlides }
}

export default carouselSlideSlice.reducer
