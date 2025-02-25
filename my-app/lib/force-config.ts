import type { ForceConfig } from "../types/graph"

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
          return -1000 // Strong repulsion for central node
        case "branch":
          return -800 // Strong repulsion for branches
        case "domain":
          return -400 // Moderate repulsion for domains
        default:
          return -200 // Light repulsion for tools
      }
    },
    distanceMax: 1000,
    theta: 0.5,
  },
  center: {
    strength: 0.05,
  },
  radial: {
    strength: (node) => {
      switch (node.category) {
        case "central":
          return 1
        case "branch":
          return 0.8
        case "domain":
          return 0.6
        case "tool":
          return 0.4
        default:
          return 0.3
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

