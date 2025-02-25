"use client"

import type React from "react"
import { useCallback } from "react"
import type { ForceGraphMethods } from "react-force-graph-2d"
import type { GraphNode, GraphLink, RadialLayoutConfig } from "../types"

const defaultConfig: RadialLayoutConfig = {
  centerNodeRadius: 0,
  branchRadius: 500, // Increased for better separation
  domainRadius: 700,
  toolRadius: 900,
  angleOffset: Math.PI / 2,
}

export function useRadialLayout(
  graphRef: React.MutableRefObject<ForceGraphMethods | undefined>,
  dimensions: { width: number; height: number },
) {
  const calculateNodePosition = useCallback(
    (centerX: number, centerY: number, radius: number, angle: number) => ({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }),
    [],
  )

  // Update applyRadialLayout to avoid fixing positions
  const applyRadialLayout = useCallback(
    (nodes: GraphNode[], links: GraphLink[], config: RadialLayoutConfig = defaultConfig) => {
      if (!graphRef.current || !dimensions?.width || !dimensions?.height) return

      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      // Position central node without fixing
      const centralNode = nodes.find((n) => n.category === "central")
      if (centralNode) {
        centralNode.x = centerX
        centralNode.y = centerY
        // Remove any fixed positions
        centralNode.fx = undefined
        centralNode.fy = undefined
      }

      // Position branch nodes
      const branchNodes = nodes.filter((n) => n.category === "branch")
      const branchAngleStep = (2 * Math.PI) / branchNodes.length

      branchNodes.forEach((node, index) => {
        const angle = config.angleOffset + index * branchAngleStep
        const position = calculateNodePosition(centerX, centerY, config.branchRadius, angle)
        node.x = position.x
        node.y = position.y
        node.angle = angle
      })

      // Position other nodes relative to their parents
      nodes.forEach((node) => {
        if (node.category !== "central" && node.category !== "branch") {
          const parentLink = links.find((link) => {
            const targetId = typeof link.target === "string" ? link.target : link.target.id
            return targetId === node.id
          })

          if (parentLink) {
            const parentId = typeof parentLink.source === "string" ? parentLink.source : parentLink.source.id
            const parentNode = nodes.find((n) => n.id === parentId)

            if (parentNode && parentNode.x !== undefined && parentNode.y !== undefined) {
              const angle = Math.random() * 2 * Math.PI
              const radius = node.category === "domain" ? config.domainRadius : config.toolRadius
              const position = calculateNodePosition(parentNode.x, parentNode.y, radius * 0.3, angle)
              node.x = position.x
              node.y = position.y
            }
          }
        }
      })

      graphRef.current.d3ReheatSimulation()
    },
    [dimensions, graphRef, calculateNodePosition],
  )

  const releaseNodes = useCallback(
    (nodes: GraphNode[]) => {
      if (!graphRef.current) return

      // Release all nodes except central and branch nodes
      nodes.forEach((node) => {
        if (node.category !== "central" && node.category !== "branch") {
          node.fx = undefined
          node.fy = undefined
        }
      })

      graphRef.current.d3ReheatSimulation()
    },
    [graphRef],
  )

  return {
    applyRadialLayout,
    releaseNodes,
  }
}

