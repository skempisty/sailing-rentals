import { createAsyncThunk } from '@reduxjs/toolkit'

const getClassRegistrationsThunk = createAsyncThunk(
  'classes/getClassRegistrationsThunk',
  async (_, { extra }) => {
    const { classesApiService } = extra

    return await classesApiService.getClassRegistrations()
  }
)

export default getClassRegistrationsThunk