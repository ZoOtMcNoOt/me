"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// Dynamically import with SSR disabled to prevent hydration issues
const HalftoneWave = dynamic(
  () => import('./halftone-wave').then(mod => mod.HalftoneWave),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />
    )
  }
)

export default function ClientHalftoneWave() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />
  }

  return <HalftoneWave theme={theme} />
}