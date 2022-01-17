import { createAsyncThunk } from '@reduxjs/toolkit'

const getInstructorsThunk = createAsyncThunk(
  'users/getInstructorsThunk',
  async (_, { extra }) => {
    const { usersApiService } = extra

    return await usersApiService.getInstructors()
  }
)

export default getInstructorsThunk