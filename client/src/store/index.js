import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import logger from './middleware/logger'
import rejectedThunkHandler from './middleware/rejectedThunkHandler'

import usersApiService from '../services/usersApiService'
import classesApiService from '../services/classesApiService'
import settingsApiService from '../services/settingsApiService'
import boatsApiService from '../services/boatsApiService'

import users from './users'
import boats from './boats'
import rentals from './rentals'
import classes from './classes'
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
  classes,
  posts,
  carouselSlides,
  payments,
  settings
})

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          usersApiService: usersApiService(),
          classesApiService: classesApiService(),
          settingsApiService: settingsApiService(),
          boatsApiService: boatsApiService()
        }
      },
      serializableCheck: false // Don't warn when putting non-serializable objects into Store
    })
    .concat(logger())
    .concat(rejectedThunkHandler)
})
