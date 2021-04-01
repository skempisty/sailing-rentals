import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import general from './general';

const reducer = combineReducers({
  general
});

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false // Don't warn when putting non-serializable objects into Store
  })
});
