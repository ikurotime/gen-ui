'use client'

import { scan } from 'react-scan'
import { useEffect } from 'react'
export const ReactScan = () => {
  useEffect(() => {
    scan({
      enabled: process.env.NODE_ENV === 'development',
      log: true,
      trackUnnecessaryRenders: true
    })
  }, [])
  return null
}
