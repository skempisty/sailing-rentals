import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: []
  },
  reducers: {
    initUsers: (state, action) => {
      const { users } = action.payload

      state.users = users
    },
    updateUserById: (state, action) => {
      const { id, toUpdate } = action.payload

      const toChangeUserIndex = state.users.findIndex(user => user.id === id);

      if (toUpdate.phone !== null) state.users[toChangeUserIndex].phone = toUpdate.phone
      if (toUpdate.affiliation !== null) state.users[toChangeUserIndex].affiliation = toUpdate.affiliation
      if (toUpdate.isApproved !== null) state.users[toChangeUserIndex].isApproved = toUpdate.isApproved ? 1 : 0
    },
    removeUser: (state, action) => {
      const { id } = action.payload

      state.users = state.users.filter(users => users.id !== id)
    }
  }
})

export const {
  initUsers,
  updateUserById,
  removeUser
} = userSlice.actions;

export default userSlice.reducer;
