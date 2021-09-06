import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

import Rental from '../models/Rental'

import getAllRentalsThunk from './thunks/getAllRentalsThunk'

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
  },
  extraReducers: (builder) => {
    builder.addCase(getAllRentalsThunk.fulfilled, (state, action) => {
      const { allRentals, myRentals } = action.payload

      state.allRentals = allRentals
      state.myRentals = myRentals
    })
  }
})

export const {
  initRentals,
  addNewRental,
  editRental
} = rentalSlice.actions

export const useRentals = () => {
  const rentals = useSelector(state => state.rentals);

  const {
    initRentals,
    addNewRental,
    editRental
  } = rentalSlice.actions

  return {
    ...rentals,
    initRentals: useAction(initRentals),
    addNewRental: useAction(addNewRental),
    editRental: useAction(editRental),
    getAllRentalsThunk: useAction(getAllRentalsThunk)
  }
}

export default rentalSlice.reducer
