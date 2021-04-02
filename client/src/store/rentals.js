import { createSlice } from '@reduxjs/toolkit';

import Rental from '../models/Rental';

const rentalSlice = createSlice({
  name: 'rentals',
  initialState: {
    myRentals: [],
    allRentals: []
  },
  reducers: {
    initRentals: (state, action) => {
      const { myRentals, allRentals } = action.payload

      state.myRentals = myRentals
      state.allRentals = allRentals
    },
    addNewRental: (state, action) => {
      const { newRental } = action.payload

      state.myRentals.push(new Rental(newRental))
      state.allRentals.push(new Rental(newRental))
    }
  }
});

export const {
  initRentals,
  addNewRental
} = rentalSlice.actions;

export default rentalSlice.reducer;
