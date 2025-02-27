"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the ParallaxBackground component with SSR disabled
const ParallaxBackground = dynamic(
  () => import('./parallax-background-webgl').then(mod => mod.ParallaxBackground),
  { 
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background/80" />
    )
  }
)

// Export as DEFAULT since it's imported as default in page.tsx
export default function ClientParallaxBackground() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="fixed inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background/80" />
  }

  return <ParallaxBackground />
}

