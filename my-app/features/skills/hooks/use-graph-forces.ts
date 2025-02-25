"use client"

import type React from "react"
import { useEffect, useCallback } from "react"
import type { ForceGraphMethods } from "react-force-graph-2d"
import * as d3 from "d3"
import { forceConfig } from "../config/force-config"
import type { GraphNode } from "../types"

export function useGraphForces(
  graphRef: React.MutableRefObject<ForceGraphMethods | undefined>,
  dimensions: { width: number; height: number },
) {
  const initializeForces = useCallback(() => {
    if (!graphRef.current || !dimensions) return

    const fg = graphRef.current
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Initialize link force with minimal strength
    let linkForce = fg.d3Force("link")
    if (!linkForce) {
      linkForce = d3.forceLink()
      fg.d3Force("link", linkForce)
    }
    linkForce
      .id((d: any) => d.id)
      .distance(forceConfig.link.distance)
      .strength(forceConfig.link.strength)

    // Initialize charge force with strong repulsion
    let chargeForce = fg.d3Force("charge")
    if (!chargeForce) {
      chargeForce = d3.forceManyBody()
      fg.d3Force("charge", chargeForce)
    }
    chargeForce
      .strength(forceConfig.charge.strength)
      .distanceMax(forceConfig.charge.distanceMax)
      .theta(forceConfig.charge.theta)

    // Initialize center force with minimal strength
    let centerForce = fg.d3Force("center")
    if (!centerForce) {
      centerForce = d3.forceCenter(centerX, centerY)
      fg.d3Force("center", centerForce)
    }
    centerForce.strength(forceConfig.center.strength)

    // Initialize radial force with strong positioning
    let radialForce = fg.d3Force("radial")
    if (!radialForce) {
      radialForce = d3.forceRadial(forceConfig.radial.radius, centerX, centerY)
      fg.d3Force("radial", radialForce)
    }
    radialForce.strength(forceConfig.radial.strength)

    // Add custom collision force for better separation
    let collisionForce = fg.d3Force("collision")
    if (!collisionForce) {
      collisionForce = d3
        .forceCollide()
        .radius((node: any) => {
          switch (node.category) {
            case "central":
              return 60
            case "branch":
              return 50
            case "domain":
              return 40
            case "tool":
              return 30
            default:
              return 35
          }
        })
        .strength(0.8)
      fg.d3Force("collision", collisionForce)
    }

    fg.d3ReheatSimulation()
  }, [graphRef, dimensions])

  // Initialize forces on mount and dimension changes
  useEffect(() => {
    initializeForces()
  }, [initializeForces])

  const updateForces = useCallback(
    (modifyForce: (force: d3.Force<any, any>) => void) => {
      if (!graphRef.current) return
      const fg = graphRef.current

      try {
        const forces = ["link", "charge", "center", "radial", "collision"]
        forces.forEach((forceName) => {
          const force = fg.d3Force(forceName)
          if (force) {
            modifyForce(force)
          }
        })
        fg.d3ReheatSimulation()
      } catch (error) {
        console.warn("Error updating forces:", error)
      }
    },
    [graphRef],
  )

  const resetForces = useCallback(
    (nodes: GraphNode[]) => {
      if (!graphRef.current || !dimensions) return

      const fg = graphRef.current
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      // Fix central node position
      const centralNode = nodes.find((n) => n.category === "central")
      if (centralNode) {
        centralNode.fx = centerX
        centralNode.fy = centerY
        centralNode.x = centerX
        centralNode.y = centerY
      }

      // Reset branch nodes to their radial positions
      const branchNodes = nodes.filter((n) => n.category === "branch")
      const angleStep = (2 * Math.PI) / branchNodes.length
      branchNodes.forEach((node, index) => {
        const angle = index * angleStep
        const radius = forceConfig.radial.radius(node)
        node.fx = centerX + radius * Math.cos(angle)
        node.fy = centerY + radius * Math.sin(angle)
      })

      // Reset other nodes
      nodes.forEach((node) => {
        if (node.category !== "central" && node.category !== "branch") {
          node.fx = undefined
          node.fy = undefined
          node.vx = 0
          node.vy = 0
        }
      })

      // Reinitialize forces
      initializeForces()
    },
    [graphRef, dimensions, initializeForces],
  )

  return {
    initializeForces,
    updateForces,
    resetForces,
  }
}

