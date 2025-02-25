import type { GraphLink, GraphNode } from "../types"

interface Point {
  x: number
  y: number
}

interface BundledEdge {
  sourcePoint: Point
  targetPoint: Point
  controlPoint: Point
  opacity: number
}

export function calculateControlPoint(source: Point, target: Point, curvature = 0.25, clockwise = true): Point {
  const dx = target.x - source.x
  const dy = target.y - source.y
  const midX = (source.x + target.x) / 2
  const midY = (source.y + target.y) / 2

  const length = Math.sqrt(dx * dx + dy * dy)
  const normalX = -dy / length
  const normalY = dx / length

  const offset = length * curvature * (clockwise ? 1 : -1)

  return {
    x: midX + normalX * offset,
    y: midY + normalY * offset,
  }
}

export function bundleEdges(links: GraphLink[], nodes: GraphNode[]): BundledEdge[] {
  const bundledEdges: BundledEdge[] = []
  const processedPairs = new Set<string>()

  links.forEach((link) => {
    const source = typeof link.source === "string" ? nodes.find((n) => n.id === link.source) : link.source
    const target = typeof link.target === "string" ? nodes.find((n) => n.id === link.target) : link.target

    if (!source?.x || !source?.y || !target?.x || !target?.y) {
      console.warn("Invalid node coordinates:", { source, target })
      return
    }

    const pairKey = [source.id, target.id].sort().join("-")
    if (processedPairs.has(pairKey)) return
    processedPairs.add(pairKey)

    let baseCurvature = 0.2
    switch (link.category) {
      case "primary":
        baseCurvature = 0.1
        break
      case "branch":
        baseCurvature = 0.2
        break
      case "tool":
        baseCurvature = 0.3
        break
      case "cross":
        baseCurvature = 0.4
        break
    }

    const dx = target.x - source.x
    const dy = target.y - source.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    const adjustedCurvature = baseCurvature * (1 + distance / 1000)

    const clockwise = (target.x - source.x) * (target.y + source.y) > 0

    const controlPoint = calculateControlPoint(
      { x: source.x, y: source.y },
      { x: target.x, y: target.y },
      adjustedCurvature,
      clockwise,
    )

    let opacity = 0.2
    switch (link.category) {
      case "primary":
        opacity = 0.3
        break
      case "branch":
        opacity = 0.25
        break
      case "tool":
        opacity = 0.2
        break
      case "cross":
        opacity = 0.15
        break
    }

    bundledEdges.push({
      sourcePoint: { x: source.x, y: source.y },
      targetPoint: { x: target.x, y: target.y },
      controlPoint,
      opacity,
    })
  })

  return bundledEdges
}

export function drawBundledEdge(
  ctx: CanvasRenderingContext2D,
  edge: BundledEdge,
  color: string,
  width = 2,
  highlighted = false,
) {
  const { sourcePoint, targetPoint, controlPoint, opacity } = edge

  ctx.beginPath()
  ctx.moveTo(sourcePoint.x, sourcePoint.y)
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, targetPoint.x, targetPoint.y)

  ctx.strokeStyle = color
  ctx.lineWidth = highlighted ? width * 2 : width
  ctx.globalAlpha = highlighted ? Math.min(opacity * 3, 1) : Math.min(opacity * 2, 1)

  ctx.lineCap = "round"
  ctx.lineJoin = "round"

  if (highlighted) {
    ctx.shadowColor = color
    ctx.shadowBlur = 10
    ctx.shadowOffsetX = 0
    ctx.shadowOffsetY = 0
  }

  ctx.stroke()

  ctx.globalAlpha = 1
  ctx.shadowBlur = 0
}

export function isPointNearCurve(point: Point, edge: BundledEdge, threshold = 5): boolean {
  const { sourcePoint, targetPoint, controlPoint } = edge

  const steps = 20
  let minDistance = Number.POSITIVE_INFINITY

  for (let i = 0; i <= steps; i++) {
    const t = i / steps
    const x = Math.pow(1 - t, 2) * sourcePoint.x + 2 * (1 - t) * t * controlPoint.x + Math.pow(t, 2) * targetPoint.x
    const y = Math.pow(1 - t, 2) * sourcePoint.y + 2 * (1 - t) * t * controlPoint.y + Math.pow(t, 2) * targetPoint.y

    const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2))
    minDistance = Math.min(minDistance, distance)
  }

  return minDistance <= threshold
}

