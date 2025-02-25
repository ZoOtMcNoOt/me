"use client"

import type React from "react"
import { useEffect, useState } from "react"

interface GraphDimensions {
  width: number
  height: number
}

export function useGraphDimensions(containerRef: React.RefObject<HTMLDivElement>) {
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  })

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current
        setDimensions({
          width: Math.max(clientWidth, 100), // Ensure minimum dimensions
          height: Math.max(clientHeight, 100),
        })
      }
    }

    const resizeObserver = new ResizeObserver(handleResize)
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    handleResize() // Initial measurement

    return () => {
      resizeObserver.disconnect()
    }
  }, [containerRef])

  return dimensions
}

