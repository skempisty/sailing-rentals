import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { useAction } from "../utils/useAction"
import updateBoatThunk from "./thunks/updateBoatThunk"

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
  },
  extraReducers: (builder) => {
    builder.addCase(updateBoatThunk.fulfilled, (state, action) => {
      const updatedBoat = action.payload

      const boatIndex = state.boats.findIndex(b => b.id === updatedBoat.id)

      state.boats[boatIndex] = updatedBoat
    })
  }
})

export const {
  initBoats,
  addBoat,
  editBoat
} = boatSlice.actions

export const useBoats = () => {
  const boats = useSelector(state => state.boats)

  return {
    ...boats,
    updateBoat: useAction(updateBoatThunk)
  }
}

export default boatSlice.reducer
