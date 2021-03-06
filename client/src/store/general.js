import { createSlice } from '@reduxjs/toolkit';

import createLoginSession from "../utils/createLoginSession";

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loggedInUser: {
      imageUrl: ''
    }
  },
  reducers: {
    loginUser: (state, action) => {
      /**
       * Create Login session
       * @property {string} payloadOne
       */
      const { profileObj } = action.payload;
      const { email, imageUrl } = profileObj;

      // create session storage entry
      createLoginSession()

      state.loggedInUser = { email, imageUrl };
    }
  }
});

export const {
  exampleActionCreator
} = generalSlice.actions;

export default generalSlice.reducer;
