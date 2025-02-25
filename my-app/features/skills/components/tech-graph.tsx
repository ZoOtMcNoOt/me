"use client"

import { useRef, useEffect } from "react"
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d"
import { useFullscreen } from "@/lib/fullscreen-context"
import { GraphControls } from "./graph-controls"
import { useGraphDimensions } from "../hooks/use-graph-dimensions"
import { useGraphHighlight } from "../hooks/use-graph-highlight"
import { useGraphState } from "../hooks/use-graph-state"
import { useGraphForces } from "../hooks/use-graph-forces"
import { useGraphLayout } from "../hooks/use-graph-layout"
import { useRadialLayout } from "../hooks/use-radial-layout"
import { renderNodeLabel } from "../utils/graph-rendering"
import { categoryColors } from "../config/force-config"
import type { GraphNode, GraphLink } from "../types"

interface TechGraphProps {
  onGraphReady?: (controls: ForceGraphMethods) => void
}

export function TechGraph({ onGraphReady }: TechGraphProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<ForceGraphMethods | undefined>()
  const dimensions = useGraphDimensions(containerRef)
  const { isFullscreen, setIsFullscreen } = useFullscreen()

  // Graph state and layout management
  const { filteredData, handleNodeClick, showAllLevel3Nodes, resetVisibleNodes } = useGraphState()
  const { highlightNodes, highlightLinks, handleNodeHover } = useGraphHighlight(filteredData)
  const { resetForces } = useGraphForces(graphRef)
  const { explodeLayout, rotateLayout } = useGraphLayout(graphRef, dimensions)
  const { applyRadialLayout, releaseNodes } = useRadialLayout(graphRef, dimensions)

  // Initialize radial layout
  useEffect(() => {
    if (graphRef.current && filteredData.nodes.length > 0) {
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      // Reset forces first
      resetForces(filteredData.nodes)

      // Position nodes without fixing them
      filteredData.nodes.forEach((node) => {
        if (node.category === "central") {
          node.x = centerX
          node.y = centerY
        }
        // Remove all fixed positions
        node.fx = undefined
        node.fy = undefined
      })

      // Apply layout with slight delay to ensure proper initialization
      setTimeout(() => {
        applyRadialLayout(filteredData.nodes, filteredData.links)
        setTimeout(() => {
          graphRef.current?.zoomToFit(400, 50)
        }, 500)
      }, 100)
    }
  }, [applyRadialLayout, filteredData, dimensions, resetForces])

  const handleExplode = () => {
    if (!graphRef.current) return

    // Release all fixed positions except central node
    filteredData.nodes.forEach((node) => {
      if (node.category !== "central") {
        node.fx = undefined
        node.fy = undefined
      }
    })

    explodeLayout(filteredData.nodes)
    showAllLevel3Nodes()

    // Ensure simulation is active
    graphRef.current.d3ReheatSimulation()
  }

  const handleReset = () => {
    if (!graphRef.current) return

    // Reset forces first
    resetForces(filteredData.nodes)
    resetVisibleNodes()

    // Clear all fixed positions
    filteredData.nodes.forEach((node) => {
      node.fx = undefined
      node.fy = undefined
    })

    // Reapply layout with the same timing pattern as initial render
    setTimeout(() => {
      applyRadialLayout(filteredData.nodes, filteredData.links)
      setTimeout(() => {
        graphRef.current?.zoomToFit(400, 50)
      }, 500)
    }, 100)
  }

  // Enhanced link rendering for cross-branch connections
  const getLinkStyle = (link: GraphLink) => {
    const isCrossBranch = link.category === "cross"
    const baseColor = link.category === "primary" ? "rgba(255, 255, 255, 0.2)" : `${categoryColors[link.category]}40`
    const highlightColor = link.category === "primary" ? "rgba(255, 255, 255, 0.6)" : categoryColors[link.category]

    return {
      width: highlightLinks.has(link) ? 2 : 1,
      color: highlightLinks.has(link) ? highlightColor : baseColor,
      dashArray: isCrossBranch ? [5, 5] : undefined,
      particles: highlightLinks.has(link) ? 4 : 0,
    }
  }

  return (
    <div
      ref={containerRef}
      data-fullscreen={isFullscreen}
      className={`relative transition-all duration-500 ${
        isFullscreen ? "fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm" : "h-[600px] w-full"
      }`}
    >
      <GraphControls
        graphRef={graphRef}
        dimensions={dimensions}
        isFullscreen={isFullscreen}
        nodes={filteredData.nodes}
        onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        onRotate={rotateLayout}
        onExplode={handleExplode}
        onReset={handleReset}
      />
      <ForceGraph2D
        ref={(el) => {
          graphRef.current = el || undefined
          if (el && onGraphReady) onGraphReady(el)
        }}
        graphData={filteredData}
        nodeLabel="name"
        nodeColor={(node: GraphNode) => (highlightNodes.has(node.id) ? node.color : `${node.color}99`)}
        nodeRelSize={3}
        nodeVal={(node: GraphNode) => Math.pow(node.val, 1.1)}
        linkWidth={(link: GraphLink) => getLinkStyle(link).width}
        linkColor={(link: GraphLink) => getLinkStyle(link).color}
        linkLineDash={(link: GraphLink) => getLinkStyle(link).dashArray}
        linkDirectionalParticles={(link: GraphLink) => getLinkStyle(link).particles}
        linkDirectionalParticleWidth={2}
        linkDirectionalParticleSpeed={0.005}
        nodeCanvasObjectMode={() => "after"}
        nodeCanvasObject={(node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
          renderNodeLabel(node, ctx, globalScale, highlightNodes.has(node.id))
        }}
        backgroundColor="transparent"
        width={dimensions?.width ?? 800}
        height={dimensions?.height ?? 600}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        enableZoom={true}
        enablePanInteraction={false}
        enableNodeDrag={true}
        onNodeDrag={(node) => {
          // Don't fix position during drag
          node.fx = undefined
          node.fy = undefined
        }}
        onNodeDragEnd={(node) => {
          // Ensure node remains unfixed after drag
          node.fx = undefined
          node.fy = undefined

          // Reheat simulation with reduced decay
          if (graphRef.current) {
            graphRef.current.d3Force("charge").distanceMax(1500)
            graphRef.current.d3ReheatSimulation()
            graphRef.current.d3Force("charge").distanceMax(2000)
          }
        }}
        cooldownTicks={300}
        cooldownTime={5000}
        d3AlphaDecay={0.008}
        d3VelocityDecay={0.15}
        onEngineStop={() => {
          // Additional fit after simulation stops
          graphRef.current?.zoomToFit(400, 50)
        }}
      />
    </div>
  )
}

