import type { ForceConfig } from "../types"

export const categoryColors = {
  primary: "rgba(255, 255, 255, 0.2)", // Lighter default color for edges
  branch: "rgba(46, 204, 113, 0.6)",
  tool: "rgba(155, 89, 182, 0.6)",
  cross: "rgba(241, 196, 15, 0.3)",
} as const

export const forceConfig: ForceConfig = {
  link: {
    distance: (link) => {
      switch (link.category) {
        case "primary":
          return 150 // Reduced distance for more compact layout
        case "branch":
          return 120
        case "tool":
          return 80
        case "cross":
          return 200
        default:
          return 100
      }
    },
    strength: (link) => {
      switch (link.category) {
        case "primary":
          return 1 // Stronger connection to maintain structure
        case "branch":
          return 0.8
        case "tool":
          return 0.5
        case "cross":
          return 0.1
        default:
          return 0.3
      }
    },
  },
  charge: {
    strength: (node) => {
      switch (node.category) {
        case "central":
          return -3000 // Increased from -2000 for stronger central positioning
        case "branch":
          return -1000
        case "domain":
          return -500
        case "tool":
          return -300
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
          return 150
        case "domain":
          return 300
        case "tool":
          return 450
        default:
          return 250
      }
    },
  },
}

