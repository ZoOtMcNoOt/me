"use client"

import type React from "react"

import { useCallback } from "react"
import type { ForceGraphMethods } from "react-force-graph-2d"
import type { GraphDimensions, GraphNode } from "../types"

export function useGraphLayout(
  graphRef: React.MutableRefObject<ForceGraphMethods | undefined>,
  dimensions: GraphDimensions,
) {
  const explodeLayout = useCallback(
    (nodes: GraphNode[]) => {
      if (!graphRef.current) return

      const fg = graphRef.current
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      // Group nodes by category
      const categoryGroups: Record<string, GraphNode[]> = {}
      nodes.forEach((node) => {
        if (node.category !== "central") {
          const categoryKey = node.color || "default"
          categoryGroups[categoryKey] = categoryGroups[categoryKey] || []
          categoryGroups[categoryKey].push(node)
        }
      })

      const categories = Object.keys(categoryGroups)
      const anglePerCategory = (2 * Math.PI) / categories.length

      // Position nodes in a radial layout
      categories.forEach((category, idx) => {
        const baseAngle = idx * anglePerCategory
        const nodes = categoryGroups[category]

        nodes.forEach((node: GraphNode) => {
          const radius = node.level === 3 ? 400 : node.level === 2 ? 300 : 200
          const angleOffset = (Math.random() - 0.5) * (anglePerCategory * 0.5)
          const angle = baseAngle + angleOffset

          const x = centerX + radius * Math.cos(angle)
          const y = centerY + radius * Math.sin(angle)

          node.x = x
          node.y = y
          node.vx = (x - centerX) * 0.01
          node.vy = (y - centerY) * 0.01
        })
      })

      // Update forces for exploded layout
      const charge = fg.d3Force("charge")
      if (charge) {
        charge.strength((node: any) => {
          if (node.category === "central") return -1500
          if (node.level === 1) return -1000
          if (node.level === 2) return -800
          return -400
        })
      }

      fg.d3ReheatSimulation()
    },
    [dimensions, graphRef],
  )

  const rotateLayout = useCallback(
    (nodes: GraphNode[], clockwise: boolean) => {
      if (!graphRef.current) return

      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2
      const angle = (clockwise ? -1 : 1) * (Math.PI / 8)

      nodes.forEach((node) => {
        if (typeof node.x === "number" && typeof node.y === "number") {
          const dx = node.x - centerX
          const dy = node.y - centerY
          node.x = centerX + dx * Math.cos(angle) - dy * Math.sin(angle)
          node.y = centerY + dx * Math.sin(angle) + dy * Math.cos(angle)
        }
      })

      graphRef.current.d3ReheatSimulation()
    },
    [dimensions, graphRef],
  )

  return {
    explodeLayout,
    rotateLayout,
  }
}

