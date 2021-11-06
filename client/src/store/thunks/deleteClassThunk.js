import { createAsyncThunk } from '@reduxjs/toolkit'

const deleteClassThunk = createAsyncThunk(
  'classes/deleteClass',
  async (id, { extra}) => {
    const { classesApiService } = extra

    return await classesApiService.deleteClass(id)
  }
)

export default deleteClassThunk