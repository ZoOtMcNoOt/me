"use client"

import type React from "react"

import { useCallback, useRef } from "react"
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
  graphRef: React.MutableRefObject<ForceGraphMethods | null>,
  dimensions: { width: number; height: number },
) {
  // Use ref to track node positions across renders
  const layoutState = useRef<Map<string, { angle: number; radius: number }>>(new Map())

  const calculateNodePosition = useCallback(
    (centerX: number, centerY: number, radius: number, angle: number) => ({
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    }),
    [],
  )

  // Improved radial layout with better parent-child relationships
  const applyRadialLayout = useCallback(
    (nodes: GraphNode[], links: GraphLink[], config: RadialLayoutConfig = defaultConfig) => {
      if (!graphRef.current || !dimensions?.width || !dimensions?.height) return

      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      // Reset layout state
      layoutState.current.clear()

      // First pass: position central and branch nodes
      // Position central node
      const centralNode = nodes.find((n) => n.category === "central")
      if (centralNode) {
        centralNode.x = centerX
        centralNode.y = centerY
        // Remove any fixed positions
        centralNode.fx = undefined
        centralNode.fy = undefined

        // Store position data
        layoutState.current.set(centralNode.id, {
          angle: 0,
          radius: config.centerNodeRadius,
        })
      }

      // Position branch nodes in a circle around central node
      const branchNodes = nodes.filter((n) => n.category === "branch")
      const branchAngleStep = (2 * Math.PI) / Math.max(branchNodes.length, 1)

      branchNodes.forEach((node, index) => {
        const angle = config.angleOffset + index * branchAngleStep
        const position = calculateNodePosition(centerX, centerY, config.branchRadius, angle)

        node.x = position.x
        node.y = position.y

        // Store position data
        layoutState.current.set(node.id, {
          angle,
          radius: config.branchRadius,
        })
      })

      // Second pass: Process domain nodes - they connect to branches
      const domainNodes = nodes.filter((n) => n.category === "domain")

      // Group domain nodes by their parent branch
      const domainNodesByBranch = new Map<string, GraphNode[]>()

      domainNodes.forEach((node) => {
        // Find the parent link
        const parentLink = links.find((link) => {
          const targetId = typeof link.target === "object" ? link.target.id : link.target
          return targetId === node.id && link.category === "branch"
        })

        if (parentLink) {
          const parentId = typeof parentLink.source === "object" ? parentLink.source.id : parentLink.source

          if (!domainNodesByBranch.has(parentId)) {
            domainNodesByBranch.set(parentId, [])
          }

          domainNodesByBranch.get(parentId)?.push(node)
        }
      })

      // Position domain nodes around their branch parents
      domainNodesByBranch.forEach((childNodes, parentId) => {
        const parentState = layoutState.current.get(parentId)
        const parentNode = nodes.find((n) => n.id === parentId)

        if (parentState && parentNode && parentNode.x !== undefined && parentNode.y !== undefined) {
          const angleStep = (2 * Math.PI) / Math.max(childNodes.length, 1)

          childNodes.forEach((node, index) => {
            // Position domain nodes in a partial arc around their parent branch
            const angleSpread = Math.PI / 2 // 90 degrees
            const angle =
              parentState.angle -
              angleSpread / 2 +
              index * angleStep * (angleSpread / Math.max(childNodes.length - 1, 1))

            const position = calculateNodePosition(parentNode.x, parentNode.y, config.domainRadius / 2, angle)

            node.x = position.x
            node.y = position.y

            // Store position data
            layoutState.current.set(node.id, {
              angle,
              radius: config.domainRadius / 2,
            })
          })
        }
      })

      // Third pass: Process tool nodes - they connect to domains
      const toolNodes = nodes.filter((n) => n.category === "tool")

      // Position tool nodes around their domain parents
      toolNodes.forEach((node) => {
        // Find the parent link
        const parentLink = links.find((link) => {
          const targetId = typeof link.target === "object" ? link.target.id : link.target
          return targetId === node.id && link.category === "tool"
        })

        if (parentLink) {
          const parentId = typeof parentLink.source === "object" ? parentLink.source.id : parentLink.source
          const parentNode = nodes.find((n) => n.id === parentId)

          if (parentNode && parentNode.x !== undefined && parentNode.y !== undefined) {
            // Get a consistent but random-looking angle based on node id
            const hashCode = (str: string) => {
              let hash = 0
              for (let i = 0; i < str.length; i++) {
                hash = (hash << 5) - hash + str.charCodeAt(i)
                hash |= 0
              }
              return hash
            }

            const deterministicRandom = Math.abs(hashCode(node.id) / 2147483647)
            const angle = deterministicRandom * 2 * Math.PI

            const position = calculateNodePosition(parentNode.x, parentNode.y, config.toolRadius / 3, angle)

            node.x = position.x
            node.y = position.y
          }
        }
      })

      // Reheat simulation with custom settings
      if (graphRef.current) {
        graphRef.current.d3Force("charge")?.distanceMax(2000)

        // Use the correct method to reheat the simulation
        graphRef.current.d3ReheatSimulation()

        // Use setTimeout to reset simulation values
        setTimeout(() => {
          if (graphRef.current) {
            // Allow simulation to cool down naturally
            graphRef.current.d3Force("charge")?.distanceMax(1500)
          }
        }, 1000)
      }
    },
    [dimensions, calculateNodePosition],
  )

  const releaseNodes = useCallback((nodes: GraphNode[]) => {
    if (!graphRef.current) return

    // Release all nodes except central
    nodes.forEach((node) => {
      if (node.category !== "central") {
        node.fx = undefined
        node.fy = undefined
      }
    })

    if (graphRef.current) {
      graphRef.current.d3ReheatSimulation()
    }
  }, [])

  return {
    applyRadialLayout,
    releaseNodes,
  }
}

