"use client"

import { useCallback, useEffect, useState } from "react"
import { getFluidValue, getResponsiveValue } from "@/lib/layout"

interface FluidOptions {
  minSize?: number
  maxSize?: number
  minWidth?: number
  maxWidth?: number
  unit?: string
  scale?: number
}

export function useFluidValue(defaultValue: number, options: FluidOptions = {}) {
  const {
    minSize = defaultValue * 0.75,
    maxSize = defaultValue * 1.25,
    minWidth = 320,
    maxWidth = 1920,
    unit = "px",
    scale = 1,
  } = options

  const [value, setValue] = useState(defaultValue)

  const calculateFluidValue = useCallback(() => {
    if (unit === "rem") {
      return getFluidValue(minSize, maxSize, minWidth, maxWidth)
    }
    return getResponsiveValue(defaultValue, unit, scale)
  }, [defaultValue, minSize, maxSize, minWidth, maxWidth, unit, scale])

  useEffect(() => {
    const updateValue = () => {
      const newValue = calculateFluidValue()
      if (typeof newValue === "string") {
        // Extract the numeric value from the CSS calc/clamp function
        const match = newValue.match(/\d+\.?\d*/)
        if (match) {
          setValue(Number.parseFloat(match[0]))
        }
      }
    }

    updateValue()
    window.addEventListener("resize", updateValue)
    return () => window.removeEventListener("resize", updateValue)
  }, [calculateFluidValue])

  return value
}

