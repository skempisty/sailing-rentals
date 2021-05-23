import moment from 'moment'

import { createSlice } from '@reduxjs/toolkit'

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
    addBoat: (state, action) => {
      const { boat } = action.payload

      state.boats.push(boat)
    },
    editBoat: (state, action) => {
      const { updatedBoat } = action.payload

      const boatIndex = state.boats.findIndex(boat => boat.id === updatedBoat.id)

      state.boats[boatIndex] = updatedBoat
    },
    removeBoat: (state, action) => {
      const { id } = action.payload

      const currentTimestamp = moment().format('YYYY-MM-DD hh:mm:ss. mmm')

      const boatIndex = state.boats.findIndex(boat => boat.id === id)

      state.boats[boatIndex].deletedAt = currentTimestamp
    }
  }
})

export const {
  initBoats,
  addBoat,
  editBoat,
  removeBoat
} = boatSlice.actions

export default boatSlice.reducer
