import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loggedInUser: null
  },
  reducers: {
    loginUser: (state, action) => {
      const { userObj } = action.payload;

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        image_url: imageUrl,
        is_approved: isApproved,
        is_admin: isAdmin
      } = userObj;

      state.loggedInUser = { firstName, lastName, email, imageUrl, isApproved, isAdmin };
    }
  }
});

export const {
  loginUser
} = generalSlice.actions;

export default generalSlice.reducer;
