import { createSlice } from '@reduxjs/toolkit'

import Rental from '../models/Rental'

const rentalSlice = createSlice({
  name: 'rentals',
  initialState: {
    myRentals: [],
    allRentals: []
  },
  reducers: {
    initRentals: (state, action) => {
      const { myRentals, allRentals } = action.payload

      if (myRentals) state.myRentals = myRentals
      if (allRentals) state.allRentals = allRentals
    },
    addNewRental: (state, action) => {
      const { newRental } = action.payload

      state.myRentals.push(new Rental(newRental))
      state.allRentals.push(new Rental(newRental))
    },
    editRental: (state, action) => {
      const { id, updatedRental } = action.payload

      const myRentalsIndex = state.myRentals.findIndex(rental => rental.id === id)
      const allRentalsIndex = state.allRentals.findIndex(rental => rental.id === id)

      state.myRentals[myRentalsIndex] = updatedRental
      state.allRentals[allRentalsIndex] = updatedRental
    }
  }
})

export const {
  initRentals,
  addNewRental,
  editRental
} = rentalSlice.actions

export default rentalSlice.reducer
