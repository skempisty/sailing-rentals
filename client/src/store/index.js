import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import general from './general';

const reducer = combineReducers({
  general
});

export default configureStore({ reducer });
