import { createSlice } from '@reduxjs/toolkit'

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    loadingMsg: null
  },
  reducers: {
    setSiteState: (state, action) => {
      const { key, value } = action.payload

      state[key] = value
    }
  }
})

export const {
  setSiteState
} = siteSlice.actions;

export default siteSlice.reducer
