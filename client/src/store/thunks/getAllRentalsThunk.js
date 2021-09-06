import { createAsyncThunk } from '@reduxjs/toolkit'

import getAllRentals from '../../api/getAllRentals'

const getAllRentalsThunk = createAsyncThunk(
  'rentals/getAllRentals',
  async (payload = {}, thunkAPI) => {
    const state = thunkAPI.getState()

    const currentUserId = state.session.currentUser.id

    const allRentals = await getAllRentals()
    const myRentals = allRentals.filter(rental => rental.rentedBy === currentUserId)

    return {
      allRentals,
      myRentals
    }
  }
)

export default getAllRentalsThunk