import { createAsyncThunk } from '@reduxjs/toolkit'

const getClassesThunk = createAsyncThunk(
  'classes/getClasses',
  async (_, { extra }) => {
    const { classesApiService } = extra

    return await classesApiService.getClasses()
  }
)

export default getClassesThunk