import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    currentUser: null
  },
  reducers: {
    assignCurrentUser: (state, action) => {
      const { user } = action.payload

      const {
        first_name: firstName,
        last_name: lastName,
        email,
        image_url: imageUrl,
        is_approved: isApproved,
        is_admin: isAdmin
      } = user;

      state.currentUser = { firstName, lastName, email, imageUrl, isApproved, isAdmin };
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    }
  }
});

export const {
  assignCurrentUser,
  clearCurrentUser
} = generalSlice.actions;

export default generalSlice.reducer;
