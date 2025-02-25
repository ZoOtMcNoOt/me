export interface GraphNode {
  id: string
  name: string
  val: number
  color?: string
  category?: string
  level?: number
  x?: number
  y?: number
  fx?: number
  fy?: number
}

export interface GraphLink {
  source: string | GraphNode
  target: string | GraphNode
  value: number
  category: "primary" | "branch" | "tool" | "cross"
}

export interface GraphData {
  nodes: GraphNode[]
  links: GraphLink[]
}

export interface GraphDimensions {
  width: number
  height: number
}

