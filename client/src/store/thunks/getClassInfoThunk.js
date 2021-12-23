import { createAsyncThunk } from '@reduxjs/toolkit'

const getClassInfoThunk = createAsyncThunk(
  'classes/getClassInfoThunk',
  async (_, { extra }) => {
    const { settingsApiService } = extra

    const html = await settingsApiService.getClassInfo()

    return {
      html,
      files: []
    }
  }
)

export default getClassInfoThunk