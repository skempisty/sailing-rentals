import { createAsyncThunk } from '@reduxjs/toolkit'

const updateBoatThunk = createAsyncThunk(
  'boats/updateBoat',
  async ({ id, boatObj }, { extra}) => {
    const { boatsApiService } = extra

    return await boatsApiService.updateBoat(id, boatObj)
  }
)

export default updateBoatThunk