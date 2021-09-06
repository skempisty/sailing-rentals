import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useAction = (action) => {
  const dispatch = useDispatch()

  return useCallback(
    (...args) => dispatch(action(...args)),
    [dispatch, action]
  )
}
