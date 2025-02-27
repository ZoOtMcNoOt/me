import type { GraphNode } from "../types"

export function renderNodeLabel(
  node: GraphNode,
  ctx: CanvasRenderingContext2D,
  globalScale: number,
  isHighlighted: boolean,
) {
  const label = node.name
  const fontSize = Math.max(14 / globalScale, 1.5)
  const nodeR = Math.sqrt(Math.pow(node.val, 1.1)) * 3

  if (isHighlighted) {
    ctx.shadowColor = node.color || "#ffffff"
    ctx.shadowBlur = 10
  }

  ctx.font = `${
    node.category === "central" || node.category === "branch" ? "bold" : ""
  } ${fontSize}px Inter, system-ui, sans-serif`
  ctx.textAlign = "center"
  ctx.textBaseline = "middle"

  const textY = node.y + nodeR + fontSize

  if (node.name.includes("\n")) {
    renderMultilineLabel(node, label, ctx, textY, fontSize, isHighlighted)
  } else {
    renderSingleLineLabel(node, label, ctx, textY, fontSize, isHighlighted)
  }

  ctx.shadowBlur = 0
}

function renderMultilineLabel(
  node: GraphNode,
  label: string,
  ctx: CanvasRenderingContext2D,
  textY: number,
  fontSize: number,
  isHighlighted: boolean,
) {
  const lines = label.split("\n")
  lines.forEach((line: string, i: number) => {
    const textWidth = ctx.measureText(line).width
    ctx.fillStyle = "rgba(0,0,0,0.8)"
    ctx.fillRect(node.x - textWidth / 2 - 4, textY + i * fontSize - fontSize / 2 - 2, textWidth + 8, fontSize + 4)

    ctx.fillStyle = isHighlighted ? "#ffffff" : "rgba(255,255,255,0.9)"
    ctx.fillText(line, node.x, textY + i * fontSize)
  })
}

function renderSingleLineLabel(
  node: GraphNode,
  label: string,
  ctx: CanvasRenderingContext2D,
  textY: number,
  fontSize: number,
  isHighlighted: boolean,
) {
  const textWidth = ctx.measureText(label).width
  ctx.fillStyle = "rgba(0,0,0,0.8)"
  ctx.fillRect(node.x - textWidth / 2 - 4, textY - fontSize / 2 - 2, textWidth + 8, fontSize + 4)

  ctx.fillStyle = isHighlighted ? "#ffffff" : "rgba(255,255,255,0.9)"
  ctx.fillText(label, node.x, textY)
}

