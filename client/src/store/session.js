import { createSlice } from '@reduxjs/toolkit';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    loading: true,
    currentUser: {}
  },
  reducers: {
    initSession: (state, action) => {
      const { currentUser } = action.payload

      if (currentUser) {
        state.currentUser = currentUser;
      }
    },
    toggleLoading: (state, action) => {
      const { newToggleState } = action.payload

      state.loading = newToggleState;
    },
    assignCurrentUser: (state, action) => {
      const { user } = action.payload

      state.currentUser = user;
    },
    updateCurrentUser: (state, action) => {
      const { toUpdate } = action.payload

      if (toUpdate.phone !== null) state.currentUser.phone = toUpdate.phone
      if (toUpdate.affiliation !== null) state.currentUser.affiliation = toUpdate.affiliation
    },
    clearCurrentUser: (state) => {
      state.currentUser = {}
    }
  }
});

export const {
  initSession,
  toggleLoading,
  assignCurrentUser,
  updateCurrentUser,
  clearCurrentUser
} = sessionSlice.actions;

export default sessionSlice.reducer;
