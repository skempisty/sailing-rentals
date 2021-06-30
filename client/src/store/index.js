import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import users from './users'
import boats from './boats'
import rentals from './rentals'
import session from './session'
import posts from './posts'
import carouselSlides from './carouselSlides'
import payments from './payments'
import settings from './settings'
import site from './site'

const reducer = combineReducers({
  site,
  session,
  users,
  boats,
  rentals,
  posts,
  carouselSlides,
  payments,
  settings
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Don't warn when putting non-serializable objects into Store
  })
})
