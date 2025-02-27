"use client"

import type React from "react"

import type { ForceGraphMethods } from "react-force-graph-2d"
import { Button } from "@/components/ui/button"
import { ZoomOut, ZoomIn, Package, PackageOpen, RotateCcw, RotateCw, Scaling, Maximize2, Minimize2 } from "lucide-react"
import type { GraphNode } from "@/types/graph"

interface GraphControlsProps {
  graphRef: React.RefObject<ForceGraphMethods>
  dimensions: { width: number; height: number }
  isFullscreen: boolean
  nodes: GraphNode[]
  onToggleFullscreen: () => void
  onRotateStart: (clockwise: boolean) => void
  onRotateEnd: () => void
  onExplode: () => void
  onReset: () => void
  onFit: () => void
  onZoomIn: () => void
  onZoomOut: () => void
}

export function GraphControls({
  graphRef,
  isFullscreen,
  onToggleFullscreen,
  onRotateStart,
  onRotateEnd,
  onExplode,
  onReset,
  onFit,
  onZoomIn,
  onZoomOut,
}: GraphControlsProps) {
  return (
    <div className="absolute right-4 top-4 z-50 flex gap-2">
      <Button variant="secondary" size="icon" onClick={onZoomOut} title="Zoom Out">
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onZoomIn} title="Zoom In">
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onReset} title="Reset Graph">
        <Package className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onExplode} title="Explode Graph">
        <PackageOpen className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onMouseDown={() => onRotateStart(false)}
        onMouseUp={onRotateEnd}
        onMouseLeave={onRotateEnd}
        onTouchStart={() => onRotateStart(false)}
        onTouchEnd={onRotateEnd}
        title="Rotate Counter-Clockwise"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        onMouseDown={() => onRotateStart(true)}
        onMouseUp={onRotateEnd}
        onMouseLeave={onRotateEnd}
        onTouchStart={() => onRotateStart(true)}
        onTouchEnd={onRotateEnd}
        title="Rotate Clockwise"
      >
        <RotateCw className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onFit} title="Fit View">
        <Scaling className="h-4 w-4" />
      </Button>
      <Button variant="secondary" size="icon" onClick={onToggleFullscreen} title="Toggle Fullscreen">
        {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
      </Button>
    </div>
  )
}

