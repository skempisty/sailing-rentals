import { createSlice } from '@reduxjs/toolkit'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: {}
  },
  reducers: {
    initSettings: (state, action) => {
      const { settings } = action.payload

      state.settings = settings
    }
  }
})

export const {
  initSettings
} = settingsSlice.actions;

export default settingsSlice.reducer
