import { useState, useLayoutEffect } from 'react'
import { breakpoints } from '../../config'

const [mobile, tablet, desktop] = ['mobile', 'tablet', 'desktop']

export const useDeviceTracker = () => {
  const [device, setDevice] = useState('')

  const handleWindowResize = () => {
    if (window.innerWidth < breakpoints.mobile) {
      setDevice(mobile)
    } else if (window.innerWidth < breakpoints.tablet && window.innerWidth >= breakpoints.mobile) {
      setDevice(tablet)
    } else if (window.innerWidth >= breakpoints.tablet) {
      setDevice(desktop)
    }
  }

  useLayoutEffect(() => {
    handleWindowResize()

    window.addEventListener('resize', handleWindowResize, false)

    return () => {
      window.removeEventListener('resize', handleWindowResize, false)
    }
  }, [])

  return {
    device,
    isMobile: device === mobile,
    isTablet: device === tablet,
    isDesktop: device === desktop
  }
}
