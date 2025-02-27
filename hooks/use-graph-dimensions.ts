"use client"

import { useState, useEffect, type RefObject } from "react"
import type { GraphDimensions } from "@/types/graph"

export function useGraphDimensions(containerRef: RefObject<HTMLDivElement>, isFullscreen = false): GraphDimensions {
  const [dimensions, setDimensions] = useState<GraphDimensions>({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  })

  useEffect(() => {
    function updateDimensions() {
      if (isFullscreen) {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      } else if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    // Initial update
    updateDimensions()

    // Update on resize
    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(updateDimensions)
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    window.addEventListener("resize", updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateDimensions)
    }
  }, [containerRef, isFullscreen])

  // Force dimensions update when fullscreen changes
  useEffect(() => {
    if (isFullscreen) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    } else if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height,
      })
    }
  }, [isFullscreen, containerRef])

  return dimensions
}

