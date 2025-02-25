export interface GraphNode {
  id: string
  name: string
  val: number
  color?: string
  category?: "central" | "branch" | "domain" | "tool"
  level?: number
  x?: number
  y?: number
  fx?: number
  fy?: number
  vx?: number
  vy?: number
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

export interface ForceConfig {
  link: {
    distance: (link: GraphLink) => number
    strength: (link: GraphLink) => number
  }
  charge: {
    strength: (node: GraphNode) => number
    distanceMax: number
    theta?: number
  }
  center: {
    strength: number
  }
  radial: {
    strength: (node: GraphNode) => number
    radius: (node: GraphNode) => number
  }
}

export interface RadialLayoutConfig {
  centerNodeRadius: number
  branchRadius: number
  domainRadius: number
  toolRadius: number
  angleOffset?: number
}

