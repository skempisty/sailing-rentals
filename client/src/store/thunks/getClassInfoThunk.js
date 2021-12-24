import { createAsyncThunk } from '@reduxjs/toolkit'

const getClassInfoThunk = createAsyncThunk(
  'classes/getClassInfoThunk',
  async (_, { extra }) => {
    const { settingsApiService } = extra

    return await settingsApiService.getClassInfo()
  }
)

export default getClassInfoThunk