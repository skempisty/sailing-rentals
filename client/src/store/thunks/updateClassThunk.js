import { createAsyncThunk } from '@reduxjs/toolkit'

const updateClassThunk = createAsyncThunk(
  'classes/updateClass',
  async ({ id, classObj }, { extra}) => {
    const { classesApiService } = extra

    return await classesApiService.updateClass(id, classObj)
  }
)

export default updateClassThunk