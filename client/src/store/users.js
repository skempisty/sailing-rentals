import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    initUsers: (state, action) => {
      const { users } = action.payload

      if (users && users.length) {
        state.users = users;
      }
    },
    updateUserById: (state, action) => {
      const { id, toUpdate } = action.payload

      const toChangeUserIndex = state.users.findIndex(user => user.id === id);

      if (toUpdate.phone !== null) state.users[toChangeUserIndex].phone = toUpdate.phone
      if (toUpdate.jobTitle !== null) state.users[toChangeUserIndex].jobTitle = toUpdate.jobTitle
      if (toUpdate.affiliation !== null) state.users[toChangeUserIndex].affiliation = toUpdate.affiliation
      if (toUpdate.isApproved !== null) state.users[toChangeUserIndex].is_approved = toUpdate.isApproved ? 1 : 0
    }
  }
});

export const {
  initUsers,
  updateUserById
} = userSlice.actions;

export default userSlice.reducer;
