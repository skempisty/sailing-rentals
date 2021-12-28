import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

import { useAction } from '../utils/useAction'

const siteSlice = createSlice({
  name: 'site',
  initialState: {
    loadingMsg: null,
    showApiErrorModal: false
  },
  reducers: {
    setSiteState: (state, action) => {
      const { key, value } = action.payload

      state[key] = value
    },
    setShowApiErrorModal: (state, action) => {
      state.showApiErrorModal = action.payload
    }
  }
})

export const {
  setSiteState,
  setShowApiErrorModal
} = siteSlice.actions

export const useSite = () => {
  const site = useSelector(state => state.site)

  const { setShowApiErrorModal } = siteSlice.actions

  return {
    ...site,
    setShowApiErrorModal: useAction(setShowApiErrorModal)
  }
}

export default siteSlice.reducer
