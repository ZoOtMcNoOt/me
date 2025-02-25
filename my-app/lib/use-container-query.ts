"use client"

import { useEffect, useRef, useState } from "react"

interface ContainerSize {
  width: number
  height: number
}

export function useContainerQuery() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<ContainerSize>({ width: 0, height: 0 })
  const [matches, setMatches] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry) {
        const { width, height } = entry.contentRect
        setSize({ width, height })

        // Update breakpoint matches
        setMatches({
          sm: width >= 640,
          md: width >= 768,
          lg: width >= 1024,
          xl: width >= 1280,
          "2xl": width >= 1536,
        })
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  return { containerRef, size, matches }
}

