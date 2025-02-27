import type { GraphNode } from "./graph-types"

export const renderNodeLabel = (
  node: GraphNode,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  highlightNodes: Set<string>,
) => {
  const label = node.name
  const fontSize = Math.max(14 / globalScale, 1.5)
  const nodeR = (Math.sqrt(Math.pow(node.val, 1.1)) * 3.5) / globalScale

  if (highlightNodes.has(node.id)) {
    ctx.shadowColor = node.color || "#ffffff"
    ctx.shadowBlur = 10
  }

  ctx.font = `${
    node.category === "central" || node.category === "branch" ? "bold" : "normal"
  } ${fontSize}px Inter, system-ui, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"
  ctx.fillStyle = highlightNodes.has(node.id) ? "#ffffff" : "rgba(255,255,255,0.7)"

  const textY = node.y + nodeR + fontSize * 1.5

  if (node.name.includes("\n")) {
    const lines = node.name.split("\n")
    lines.forEach((line: string, i: number) => {
      const textWidth = ctx.measureText(line).width
      ctx.fillStyle = "rgba(0,0,0,0.5)"
      ctx.fillRect(node.x - textWidth / 2 - 2, textY + i * fontSize - fontSize / 2, textWidth + 4, fontSize + 2)

      ctx.fillStyle = highlightNodes.has(node.id) ? "#ffffff" : "rgba(255,255,255,0.7)"
      ctx.fillText(line, node.x, textY + i * fontSize)
    })
  } else {
    const textWidth = ctx.measureText(label).width
    ctx.fillStyle = "rgba(0,0,0,0.5)"
    ctx.fillRect(node.x - textWidth / 2 - 2, textY - fontSize / 2, textWidth + 4, fontSize + 2)

    ctx.fillStyle = highlightNodes.has(node.id) ? "#ffffff" : "rgba(255,255,255,0.7)"
    ctx.fillText(label, node.x, textY)
  }

  ctx.shadowBlur = 0
}

