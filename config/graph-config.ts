import type { GraphNode, GraphLink } from "./graph-types"

export const categoryColors = {
  primary: "rgba(52, 152, 219, 0.6)", // Brighter for primary connections
  branch: "rgba(46, 204, 113, 0.4)",
  tool: "rgba(155, 89, 182, 0.4)",
  cross: "rgba(241, 196, 15, 0.4)",
} as const

export const forceConfig = {
  link: {
    distance: (link: GraphLink) => {
      switch (link.category) {
        case "primary":
          return 250
        case "branch":
          return 180
        case "tool":
          return 120
        default:
          return 150
      }
    },
    strength: (link: GraphLink) => {
      switch (link.category) {
        case "primary":
          return 0.3
        case "branch":
          return 0.4
        case "tool":
          return 0.5
        default:
          return 0.2
      }
    },
  },
  charge: {
    strength: (node: GraphNode) => {
      switch (node.category) {
        case "central":
          return -1200
        case "branch":
          return -600
        case "domain":
          return -400
        default:
          return -300
      }
    },
    distanceMax: 600,
  },
  center: {
    strength: 0.1,
  },
  radial: {
    strength: (node: GraphNode) => {
      if (!node.level) return 0
      return Math.max(0, 1 - node.level * 0.3)
    },
    radius: (node: GraphNode) => {
      if (!node.level) return 0
      return node.level * 150 + 50
    },
  },
}

