export const getFluidValue = (minSize: number, maxSize: number, minWidth = 320, maxWidth = 1920) => {
  const slope = (maxSize - minSize) / (maxWidth - minWidth)
  const yAxisIntersection = -minWidth * slope + minSize

  return `clamp(${minSize}rem, ${yAxisIntersection}rem + ${slope * 100}vw, ${maxSize}rem)`
}

export const getResponsiveValue = (value: number, unit = "px", scale = 1) => {
  return `calc(${value * scale}${unit} + ${value / 16}vw)`
}

export const getAspectRatio = (width: number, height: number) => {
  return (height / width) * 100 + "%"
}

export const getContainerQuery = (breakpoint: number) => {
  return `@container (min-width: ${breakpoint}px)`
}

export const getFluidGrid = (minColWidth = 300, gap = 16, columns = "auto-fit") => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, minmax(min(100%, ${minColWidth}px), 1fr))`,
    gap: getResponsiveValue(gap),
  }
}

export const getFluidSpace = (space: number) => {
  return getResponsiveValue(space)
}

export const getFluidFont = (minSize: number, maxSize: number) => {
  return getFluidValue(minSize / 16, maxSize / 16)
}

