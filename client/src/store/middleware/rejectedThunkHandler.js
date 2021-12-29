import { isRejected } from '@reduxjs/toolkit'

import { setShowApiErrorModal } from '../site'

const rejectedThunkHandler = (api) => (next) => (action) => {
  const { dispatch } = api

  if (isRejected(action)) {
    dispatch(setShowApiErrorModal({ value: true, error: action.error.message || '' }))
  }

  return next(action)
}

export default rejectedThunkHandler
