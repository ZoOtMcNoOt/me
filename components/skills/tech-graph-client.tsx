"use client"

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"

// Dynamically import the TechGraph component with SSR disabled
const TechGraph = dynamic(
  () => import('./tech-graph').then((mod) => mod.TechGraph),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[400px] md:h-[500px] rounded-lg border border-border/50 bg-card/30 flex items-center justify-center">
        <Skeleton className="w-4/5 h-4/5 rounded-lg" />
      </div>
    )
  }
)

export function ClientTechGraph(props: any) {
  // State
  const [mounted, setMounted] = useState(false)
  
  // Effects
  useEffect(() => {
    setMounted(true)
  }, [])

  // Render guard
  if (!mounted) {
    return (
      <div className="w-full h-[400px] md:h-[500px] rounded-lg border border-border/50 bg-card/30 flex items-center justify-center">
        <Skeleton className="w-4/5 h-4/5 rounded-lg" />
      </div>
    )
  }

  return <TechGraph {...props} />
}

export default ClientTechGraph