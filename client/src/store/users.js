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
    // DEPRECATED
    updateUserById: (state, action) => {
      const { id, toUpdate } = action.payload

      const toChangeUserIndex = state.users.findIndex(user => user.id === id);

      if (toUpdate.phone !== null) state.users[toChangeUserIndex].phone = toUpdate.phone
      if (toUpdate.affiliation !== null) state.users[toChangeUserIndex].affiliation = toUpdate.affiliation
      if (toUpdate.isApproved !== null) state.users[toChangeUserIndex].isApproved = toUpdate.isApproved ? 1 : 0
    },
    editUser: (state, action) => {
      const { updatedUser } = action.payload

      const userIndex = state.users.findIndex(user => user.id === updatedUser.id)

      state.users[userIndex] = updatedUser
    }
  }
})

export const {
  initUsers,
  updateUserById,
  editUser
} = userSlice.actions

export default userSlice.reducer
