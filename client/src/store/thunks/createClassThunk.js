import { createAsyncThunk } from '@reduxjs/toolkit'

import Klass from '../../domains/Klass'

const createClassThunk = createAsyncThunk(
  'classes/createClass',
  async (classObj, { extra}) => {
    const { classesApiService } = extra

    if (!Klass.validate(classObj)) {
        // TODO: here we could return a more specific message as well
        return { error: 'Missing Mandatory Fields! Please check Capacity, Price, and Meeting configurations' }
    }

    return await classesApiService.createClass(classObj)
  }
)

export default createClassThunk