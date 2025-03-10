"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useTheme } from 'next-themes'

// Dynamic import with SSR disabled
const ParallaxBackground = dynamic(
  () => import('./parallax-background-dots').then(mod => mod.ParallaxBackground),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />
    )
  }
)

export default function ClientParallaxBackground() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme } = useTheme()
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />
  }

  return <ParallaxBackground theme={theme} />
}

