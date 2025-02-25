import type React from "react"
import type { ForceGraphMethods } from "react-force-graph-2d"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2, RotateCcw, RotateCw, ZoomIn, ZoomOut, Compass, RefreshCw } from "lucide-react"
import type { GraphDimensions, GraphNode } from "../types"

interface GraphControlsProps {
  graphRef: React.MutableRefObject<ForceGraphMethods | undefined>
  dimensions: GraphDimensions
  isFullscreen: boolean
  nodes: GraphNode[]
  onToggleFullscreen: () => void
  onRotate: (nodes: GraphNode[], clockwise: boolean) => void
  onExplode: () => void
  onReset: () => void
}

export function GraphControls({
  graphRef,
  dimensions,
  isFullscreen,
  nodes,
  onToggleFullscreen,
  onRotate,
  onExplode,
  onReset,
}: GraphControlsProps) {
  const handleZoom = (factor: number) => {
    if (!graphRef.current) return
    const currentZoom = graphRef.current.zoom()
    graphRef.current.zoom(currentZoom * factor, 400)
  }

  const handleFitView = () => {
    if (!graphRef.current) return

    // Add slight delay to ensure proper fit
    setTimeout(() => {
      graphRef.current?.zoomToFit(400, 50)
    }, 100)
  }

  return (
    <div
      className={`fixed ${
        isFullscreen ? "top-4 right-4" : "bottom-4 right-4"
      } z-[70] flex flex-wrap gap-2 p-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border shadow-lg`}
    >
      <div className="flex gap-2">
        <Button variant="secondary" size="icon" onClick={onToggleFullscreen} className="h-8 w-8">
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
        <div className="h-8 w-px bg-border" />
        <Button variant="secondary" size="icon" onClick={() => handleZoom(1.5)} className="h-8 w-8">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={() => handleZoom(0.667)} className="h-8 w-8">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <div className="h-8 w-px bg-border" />
        <Button variant="secondary" size="icon" onClick={() => onRotate(nodes, false)} className="h-8 w-8">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="secondary" size="icon" onClick={() => onRotate(nodes, true)} className="h-8 w-8">
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" size="sm" onClick={handleFitView} className="h-8">
          <Compass className="h-4 w-4 mr-2" />
          Fit
        </Button>
        <Button variant="secondary" size="sm" onClick={onExplode} className="h-8">
          <RefreshCw className="h-4 w-4 mr-2" />
          Explode
        </Button>
        <Button variant="secondary" size="sm" onClick={onReset} className="h-8">
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  )
}

