import type { ForceConfig } from "@/types/graph"

export const categoryColors = {
  primary: "rgba(255, 255, 255, 0.2)", // Lighter default color for edges
  branch: "rgba(46, 204, 113, 0.6)", // Green
  tool: "rgba(155, 89, 182, 0.6)", // Purple
  cross: "rgba(241, 196, 15, 0.3)", // Yellow
} as const

export const forceConfig: ForceConfig = {
  link: {
    distance: (link) => {
      switch (link.category) {
        case "primary":
          return 200 // Distance from center to branches
        case "branch":
          return 150 // Distance between branch and its children
        case "tool":
          return 100 // Distance between domain and tools
        case "cross":
          return 300 // Longer distance for cross-branch links
        default:
          return 150
      }
    },
    strength: (link) => {
      switch (link.category) {
        case "primary":
          return 0.8 // Strong connection to center
        case "branch":
          return 0.6 // Strong connection within branch
        case "tool":
          return 0.4 // Moderate connection to tools
        case "cross":
          return 0.1 // Very weak cross-branch connections
        default:
          return 0.3
      }
    },
  },
  charge: {
    strength: (node) => {
      switch (node.category) {
        case "central":
          return -2000 // Stronger central node repulsion
        case "branch":
          return -1000 // Strong repulsion for branches
        case "domain":
          return -500 // Moderate repulsion for domains
        case "tool":
          return -300 // Light repulsion for tools
        default:
          return -400
      }
    },
    distanceMax: 1000,
    theta: 0.9,
  },
  center: {
    strength: 0.3, // Increased from 0.15 for stronger centering
  },
  radial: {
    strength: (node) => {
      switch (node.category) {
        case "central":
          return 1
        case "branch":
          return 0.9
        case "domain":
          return 0.7
        case "tool":
          return 0.5
        default:
          return 0.6
      }
    },
    radius: (node) => {
      switch (node.category) {
        case "central":
          return 0
        case "branch":
          return 200
        case "domain":
          return 350
        case "tool":
          return 500
        default:
          return 300
      }
    },
  },
}

