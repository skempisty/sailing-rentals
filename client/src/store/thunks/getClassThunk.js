import { createAsyncThunk } from '@reduxjs/toolkit'

const getClassesThunk = createAsyncThunk(
  'classes/getClass',
  async (id, { extra }) => {
    const { classesApiService } = extra

    return await classesApiService.getClass(id)
  }
)

export default getClassesThunk