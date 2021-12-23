import { useRef, useEffect } from 'react'

const useUpdateEffect = (fn, inputs) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current)
      return fn()
    else
      didMountRef.current = true
  }, inputs)
}

export default useUpdateEffect
