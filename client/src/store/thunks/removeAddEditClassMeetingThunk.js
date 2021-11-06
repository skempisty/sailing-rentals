import { createAsyncThunk } from '@reduxjs/toolkit'

const removeAddEditClassMeetingThunk = createAsyncThunk(
  'classes/removeAddEditClassMeeting',
  async ({ mtg, index }) => {
    return {
      deleteRentalId: mtg.rentalId,
      deleteMtgIndex: index
    }
  }
)

export default removeAddEditClassMeetingThunk
