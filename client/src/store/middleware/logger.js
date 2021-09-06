import { createLogger } from 'redux-logger'

const logger = () => {
  return (store) => {
    // const state = store.getState()

    // TODO: add website setting to show / hide logger
    if (false) {
      return next => action => next(action)
    }

    return createLogger()(store)
  }
}

export default logger
