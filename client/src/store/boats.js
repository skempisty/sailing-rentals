import { createSlice } from '@reduxjs/toolkit'

import Boat from '../models/Boat'

const boatSlice = createSlice({
  name: 'boats',
  initialState: {
    boats: []
  },
  reducers: {
    initBoats: (state, action) => {
      const { boats } = action.payload

      state.boats = boats
    },
    addNewBoat: (state, action) => {
      const { name } = action.payload

      state.boats.push(new Boat({
        name
      }))
    }
  }
})

export const {
  initBoats,
  addNewBoat
} = boatSlice.actions

export default boatSlice.reducer
