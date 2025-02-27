"use client"

import type React from "react"

import { useRef, useEffect, useCallback, useState } from "react"
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d"
import { useFullscreen, FullscreenProvider } from "@/context/fullscreen-context"
import { GraphControls } from "@/components/skills/graph-controls"
import { useGraphDimensions } from "@/hooks/use-graph-dimensions"
import { useGraphHighlight } from "@/hooks/use-graph-highlight"
import { useGraphState } from "@/hooks/use-graph-state"
import { useGraphForces } from "@/hooks/use-graph-forces"
import { useGraphLayout } from "@/hooks/use-graph-layout"
import { useRadialLayout } from "@/hooks/use-radial-layout"
import { renderNodeLabel } from "@/lib/utils/graph-rendering"
import { forceConfig, categoryColors } from "@/config/force-config"
import type { GraphNode, GraphLink } from "@/types/graph"
import { createPortal } from "react-dom"

interface TechGraphProps {
  onGraphReady?: (controls: ForceGraphMethods) => void
}

function TechGraphInner({ onGraphReady }: TechGraphProps) {
  // Initialize refs first
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<ForceGraphMethods | null>(null)
  const isInitialRender = useRef(true)
  const rotationFrameRef = useRef<number | null>(null)
  const [isRotating, setIsRotating] = useState(false)
  const [rotateClockwise, setRotateClockwise] = useState(false)

  // Initialize context and state hooks
  const { isFullscreen, setIsFullscreen } = useFullscreen()
  const dimensions = useGraphDimensions(containerRef, isFullscreen)
  const { filteredData, handleNodeClick, showAllLevel3Nodes, resetVisibleNodes } = useGraphState()
  const { highlightNodes, highlightLinks, handleNodeHover } = useGraphHighlight(filteredData)
  const { resetForces } = useGraphForces(graphRef)
  const { explodeLayout } = useGraphLayout(graphRef, dimensions)
  const { applyRadialLayout } = useRadialLayout(graphRef, dimensions)

  // Rotation handlers
  const handleRotation = useCallback(() => {
    if (!isRotating || !dimensions.width || !dimensions.height) return

    const ROTATION_SPEED = 0.015 // Consistent speed for both directions
    const angle = rotateClockwise ? ROTATION_SPEED : -ROTATION_SPEED
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2

    // Temporarily reduce force strengths during rotation
    if (graphRef.current) {
      const chargeForce = graphRef.current.d3Force("charge")
      const linkForce = graphRef.current.d3Force("link")
      if (chargeForce) chargeForce.strength((node: any) => forceConfig.charge.strength(node as GraphNode) * 0.5)
      if (linkForce) linkForce.strength((link: any) => forceConfig.link.strength(link as GraphLink) * 0.5)
    }

    filteredData.nodes.forEach((node) => {
      if (!node.x || !node.y) return

      // Calculate position relative to center
      const dx = node.x - centerX
      const dy = node.y - centerY

      // Apply rotation matrix
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      node.x = centerX + (dx * cos - dy * sin)
      node.y = centerY + (dx * sin + dy * cos)

      // Clear any fixed positions
      node.fx = undefined
      node.fy = undefined
    })

    if (graphRef.current) {
      graphRef.current.d3ReheatSimulation()
    }

    rotationFrameRef.current = requestAnimationFrame(handleRotation)
  }, [isRotating, rotateClockwise, dimensions, filteredData.nodes])

  const handleRotateStart = useCallback((clockwise: boolean) => {
    setRotateClockwise(clockwise)
    setIsRotating(true)
  }, [])

  const handleRotateEnd = useCallback(() => {
    setIsRotating(false)
    if (rotationFrameRef.current) {
      cancelAnimationFrame(rotationFrameRef.current)
      rotationFrameRef.current = null
    }

    // Fix node positions in place after rotation
    filteredData.nodes.forEach((node) => {
      if (node.x && node.y) {
        node.fx = node.x
        node.fy = node.y
      }
    })

    // Restore original force strengths
    if (graphRef.current) {
      const chargeForce = graphRef.current.d3Force("charge")
      const linkForce = graphRef.current.d3Force("link")
      if (chargeForce) chargeForce.strength((node: any) => forceConfig.charge.strength(node as GraphNode))
      if (linkForce) linkForce.strength((link: any) => forceConfig.link.strength(link as GraphLink))
      graphRef.current.d3ReheatSimulation()
    }
  }, [filteredData.nodes])

  // Effect to handle rotation animation
  useEffect(() => {
    if (isRotating && !rotationFrameRef.current) {
      rotationFrameRef.current = requestAnimationFrame(handleRotation)
    }

    return () => {
      if (rotationFrameRef.current) {
        cancelAnimationFrame(rotationFrameRef.current)
        rotationFrameRef.current = null
      }
    }
  }, [isRotating, handleRotation])

  // Define callbacks after hooks are initialized
  const zoomToFit = useCallback(() => {
    if (!graphRef.current || !containerRef.current) return

    const padding = 40
    const containerBounds = containerRef.current.getBoundingClientRect()
    const { width, height } = containerBounds

    // Initialize boundaries including node positions and sizes
    const nodePositions = filteredData.nodes.map((node) => ({
      x: node.x || 0,
      y: node.y || 0,
      size: Math.sqrt(Math.pow(node.val || 1, 1.1)) * 3,
    }))

    const minX = Math.min(...nodePositions.map((n) => n.x - n.size))
    const maxX = Math.max(...nodePositions.map((n) => n.x + n.size))
    const minY = Math.min(...nodePositions.map((n) => n.y - n.size))
    const maxY = Math.max(...nodePositions.map((n) => n.y + n.size))

    // Calculate content dimensions with padding
    const contentWidth = maxX - minX + padding * 2
    const contentHeight = maxY - minY + padding * 2

    // Calculate the scale needed to fit the content within the container
    const scaleX = (width - padding * 2) / contentWidth
    const scaleY = (height - padding * 2) / contentHeight
    const scale = Math.min(scaleX, scaleY, 2) // Limit max scale to 2x

    // Calculate the center point of the content
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // Apply the transformation with smooth animation
    graphRef.current.pauseAnimation()
    graphRef.current.centerAt(centerX, centerY, 800)
    setTimeout(() => {
      if (graphRef.current) {
        graphRef.current.zoom(scale, 800)
        graphRef.current.resumeAnimation()
      }
    }, 50)
  }, [filteredData.nodes])

  // Handle fullscreen toggle
  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen, setIsFullscreen])

  // Handle fullscreen exit
  const handleFullscreenExit = useCallback(
    (e: React.MouseEvent) => {
      // Only handle clicks directly on the backdrop
      if (e.target === e.currentTarget) {
        setIsFullscreen(false)
      }
    },
    [setIsFullscreen],
  )

  const setupForces = useCallback(() => {
    if (!graphRef.current) return

    graphRef.current
      .d3Force("link")
      ?.distance((link) => forceConfig.link.distance(link as GraphLink))
      ?.strength((link) => forceConfig.link.strength(link as GraphLink))

    graphRef.current
      .d3Force("charge")
      ?.strength((node) => forceConfig.charge.strength(node as GraphNode))
      ?.distanceMax(forceConfig.charge.distanceMax)
      ?.theta(forceConfig.charge.theta)

    graphRef.current.d3Force("center")?.strength(forceConfig.center.strength)

    const radialForce = graphRef.current.d3Force("radial")
    if (radialForce) {
      radialForce
        .strength((node: any) => forceConfig.radial.strength(node as GraphNode))
        .radius((node: any) => forceConfig.radial.radius(node as GraphNode))
    }
  }, [])

  const safelyManipulateGraph = useCallback(
    (callback: () => void) => {
      if (graphRef.current && filteredData.nodes.length > 0) {
        callback()
      }
    },
    [filteredData.nodes.length],
  )

  const getLinkStyle = useCallback(
    (link: GraphLink) => {
      const isCrossBranch = link.category === "cross"
      const baseColor = link.category === "primary" ? categoryColors.primary : `${categoryColors[link.category]}40`
      const highlightColor = link.category === "primary" ? "rgba(255, 255, 255, 0.6)" : categoryColors[link.category]

      return {
        width: highlightLinks.has(link) ? 2 : 1,
        color: highlightLinks.has(link) ? highlightColor : baseColor,
        dashArray: isCrossBranch ? [5, 5] : undefined,
        particles: highlightLinks.has(link) ? 4 : 0,
      }
    },
    [highlightLinks],
  )

  const handleNodeDrag = useCallback(
    (node: GraphNode) => {
      // Clear fixed positions when dragging starts
      filteredData.nodes.forEach((n) => {
        n.fx = undefined
        n.fy = undefined
      })
    },
    [filteredData.nodes],
  )

  const handleNodeDragEnd = useCallback((node: GraphNode) => {
    node.fx = undefined
    node.fy = undefined

    if (graphRef.current) {
      const chargeForce = graphRef.current.d3Force("charge")
      if (chargeForce && typeof chargeForce.distanceMax === "function") {
        chargeForce.distanceMax(1500)
        graphRef.current.d3ReheatSimulation()
        chargeForce.distanceMax(forceConfig.charge.distanceMax)
      }
    }
  }, [])

  const handleExplode = useCallback(() => {
    safelyManipulateGraph(() => {
      filteredData.nodes.forEach((node) => {
        if (node.category !== "central") {
          node.fx = undefined
          node.fy = undefined
        }
      })

      explodeLayout(filteredData.nodes)
      showAllLevel3Nodes()

      if (graphRef.current) {
        graphRef.current.d3ReheatSimulation()
      }
    })
  }, [explodeLayout, filteredData.nodes, safelyManipulateGraph, showAllLevel3Nodes])

  const handleReset = useCallback(() => {
    safelyManipulateGraph(() => {
      resetForces(filteredData.nodes)
      resetVisibleNodes()

      filteredData.nodes.forEach((node) => {
        node.fx = undefined
        node.fy = undefined
      })

      const layoutTimer = setTimeout(() => {
        applyRadialLayout(filteredData.nodes, filteredData.links)
        const zoomTimer = setTimeout(zoomToFit, 500)
        return () => clearTimeout(zoomTimer)
      }, 100)

      return () => clearTimeout(layoutTimer)
    })
  }, [applyRadialLayout, filteredData, resetForces, resetVisibleNodes, safelyManipulateGraph, zoomToFit])

  const handleEngineStop = useCallback(() => {
    zoomToFit()
  }, [zoomToFit])

  const handleGraphRef = useCallback(
    (el: ForceGraphMethods | null) => {
      graphRef.current = el
      if (el && onGraphReady) {
        onGraphReady(el)
        setupForces()
      }
    },
    [onGraphReady, setupForces],
  )

  // Add these handlers after other handler definitions
  const handleZoomIn = useCallback(() => {
    if (!graphRef.current) return
    const currentZoom = graphRef.current.zoom()
    graphRef.current.zoom(currentZoom * 1.5, 400)
  }, [])

  const handleZoomOut = useCallback(() => {
    if (!graphRef.current) return
    const currentZoom = graphRef.current.zoom()
    graphRef.current.zoom(currentZoom * 0.667, 400)
  }, [])

  // Effects after all callbacks are defined
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (graphRef.current) {
      // Reset zoom and center using proper ForceGraph2D methods
      const resetAndZoom = async () => {
        // First pause any ongoing animations
        graphRef.current?.pauseAnimation()

        // Reset the camera position
        graphRef.current?.centerAt(0, 0, 0)
        graphRef.current?.zoom(1, 0)

        // Resume animation and perform the fit
        graphRef.current?.resumeAnimation()

        // Wait for the graph to stabilize before fitting
        setTimeout(zoomToFit, 100)
      }

      resetAndZoom()
    }
  }, [zoomToFit])

  useEffect(() => {
    safelyManipulateGraph(() => {
      setupForces()
    })
  }, [safelyManipulateGraph, setupForces])

  useEffect(() => {
    safelyManipulateGraph(() => {
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2

      resetForces(filteredData.nodes)

      filteredData.nodes.forEach((node) => {
        if (node.category === "central") {
          node.x = centerX
          node.y = centerY
        }
        node.fx = undefined
        node.fy = undefined
      })

      const layoutTimer = setTimeout(() => {
        applyRadialLayout(filteredData.nodes, filteredData.links)
        const zoomTimer = setTimeout(zoomToFit, 500)
        return () => clearTimeout(zoomTimer)
      }, 100)

      return () => clearTimeout(layoutTimer)
    })
  }, [applyRadialLayout, filteredData, dimensions, resetForces, safelyManipulateGraph, zoomToFit])

  // Add this conditional check before using window
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    // Your existing window-dependent code
    const handleResize = () => {
      // ...existing code
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {!isFullscreen ? (
        <div ref={containerRef} className="relative w-full h-full overflow-hidden rounded-lg border border-border/50">
          <GraphControls
            graphRef={graphRef}
            dimensions={dimensions}
            isFullscreen={isFullscreen}
            nodes={filteredData.nodes}
            onToggleFullscreen={handleToggleFullscreen}
            onRotateStart={handleRotateStart}
            onRotateEnd={handleRotateEnd}
            onExplode={handleExplode}
            onReset={handleReset}
            onFit={zoomToFit}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          <ForceGraph2D
            ref={handleGraphRef}
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
            width={dimensions?.width || 800}
            height={dimensions?.height || 600}
            onNodeHover={handleNodeHover}
            onNodeClick={handleNodeClick}
            enableZoom={true}
            enablePanInteraction={true}
            enableNodeDrag={true}
            onNodeDrag={handleNodeDrag}
            onNodeDragEnd={handleNodeDragEnd}
            cooldownTicks={300}
            cooldownTime={5000}
            d3AlphaDecay={0.008}
            d3VelocityDecay={0.15}
            onEngineStop={handleEngineStop}
            minZoom={0.1}
            maxZoom={4}
          />
        </div>
      ) : (
        createPortal(
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
            <div className="absolute inset-0 bg-background/95 backdrop-blur-sm" onClick={handleFullscreenExit} />
            <div ref={containerRef} className="relative h-screen w-screen">
              <GraphControls
                graphRef={graphRef}
                dimensions={dimensions}
                isFullscreen={isFullscreen}
                nodes={filteredData.nodes}
                onToggleFullscreen={handleToggleFullscreen}
                onRotateStart={handleRotateStart}
                onRotateEnd={handleRotateEnd}
                onExplode={handleExplode}
                onReset={handleReset}
                onFit={zoomToFit}
                onZoomIn={handleZoomIn}
                onZoomOut={handleZoomOut}
              />
              <ForceGraph2D
                ref={handleGraphRef}
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
                width={dimensions?.width || window.innerWidth}
                height={dimensions?.height || window.innerHeight}
                onNodeHover={handleNodeHover}
                onNodeClick={handleNodeClick}
                enableZoom={true}
                enablePanInteraction={true}
                enableNodeDrag={true}
                onNodeDrag={handleNodeDrag}
                onNodeDragEnd={handleNodeDragEnd}
                cooldownTicks={300}
                cooldownTime={5000}
                d3AlphaDecay={0.008}
                d3VelocityDecay={0.15}
                onEngineStop={handleEngineStop}
                minZoom={0.1}
                maxZoom={4}
              />
            </div>
          </div>,
          document.body,
        )
      )}
    </>
  )
}

export function TechGraph(props: TechGraphProps) {
  return (
    <FullscreenProvider>
      <TechGraphInner {...props} />
    </FullscreenProvider>
  )
}

