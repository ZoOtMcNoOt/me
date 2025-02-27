"use client"

import { useEffect, useState } from "react"

interface TypographyScale {
  [key: string]: string
}

const BASE_SCALE: TypographyScale = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
}

export function useFluidTypography(baseSize = 16) {
  const [scale, setScale] = useState<TypographyScale>(BASE_SCALE)

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth
      const scaleFactor = Math.min(Math.max(viewportWidth / 1920, 0.75), 1.25)

      const newScale = Object.entries(BASE_SCALE).reduce((acc, [key, value]) => {
        const size = Number.parseFloat(value) * scaleFactor * baseSize
        acc[key] = `${size / baseSize}rem`
        return acc
      }, {} as TypographyScale)

      setScale(newScale)
    }

    calculateScale()
    window.addEventListener("resize", calculateScale)
    return () => window.removeEventListener("resize", calculateScale)
  }, [baseSize])

  return scale
}

