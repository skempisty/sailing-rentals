import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    loggedInUser: {
      name: '',
      email: '',
      imageUrl: '',
      isApproved: false,
      isAdmin: false
    }
  },
  reducers: {
    loginUser: (state, action) => {
      const { userObj } = action.payload;

      const {
        name,
        email,
        image_url: imageUrl,
        is_approved: isApproved,
        is_admin: isAdmin
      } = userObj;

      state.loggedInUser = { name, email, imageUrl, isApproved, isAdmin };
    }
  }
});

export const {
  loginUser
} = generalSlice.actions;

export default generalSlice.reducer;
