import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import {useAction} from '../utils/useAction'

import updateSettingsThunk from './thunks/updateSettingsThunk'

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    settings: {}
  },
  reducers: {
    initSettings: (state, action) => {
      const { settings } = action.payload

      state.settings = settings
    }
  }
})

export const {
  initSettings
} = settingsSlice.actions

export const useSettings = () => {
  const settings = useSelector(state => state.settings)

  return {
    ...settings,
    updateSettingsThunk: useAction(updateSettingsThunk)
  }
}

export default settingsSlice.reducer
