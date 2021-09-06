import { createAsyncThunk } from '@reduxjs/toolkit'

const createClassThunk = createAsyncThunk(
  'classes/createClass',
  async (classObj, { extra}) => {
    const { classesApiService } = extra

    return await classesApiService.createClass(classObj)
  }
)

export default createClassThunk