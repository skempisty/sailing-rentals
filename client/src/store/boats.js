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
    }
  }
})

export const {
  initBoats,
  addBoat,
  editBoat
} = boatSlice.actions

export default boatSlice.reducer
