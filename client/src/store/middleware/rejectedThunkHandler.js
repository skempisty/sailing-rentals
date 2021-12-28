import { isRejected } from '@reduxjs/toolkit'

import { setShowApiErrorModal } from '../site'

const rejectedThunkHandler = (api) => (next) => (action) => {
  const { dispatch } = api

  if (isRejected(action)) {
    dispatch(setShowApiErrorModal(true))
  }

  return next(action)
}

export default rejectedThunkHandler
