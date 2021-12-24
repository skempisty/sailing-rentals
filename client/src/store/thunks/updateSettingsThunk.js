import { createAsyncThunk } from '@reduxjs/toolkit'

const updateSettingsThunk = createAsyncThunk(
  'settings/updateSettingsThunk',
  async (updatedSettings, { extra}) => {
    const { settingsApiService } = extra

    return await settingsApiService.updateSettings(updatedSettings)
  }
)

export default updateSettingsThunk