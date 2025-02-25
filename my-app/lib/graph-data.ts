import type { GraphData } from "./graph-types"

export const categoryColors = {
  primary: "rgba(52, 152, 219, 0.6)", // Brighter for primary connections
  branch: "rgba(46, 204, 113, 0.4)",
  tool: "rgba(155, 89, 182, 0.4)",
  cross: "rgba(241, 196, 15, 0.4)",
} as const

export const techData: GraphData = {
  nodes: [
    // Central Node
    { id: "central", name: "What I Know", val: 45, color: "#3498db", category: "central", level: 0 },

    // Primary Branches (Level 1)
    { id: "engineering", name: "Engineering &\nDesign", val: 35, color: "#e74c3c", category: "branch", level: 1 },
    { id: "software", name: "Software\nDevelopment", val: 35, color: "#2ecc71", category: "branch", level: 1 },
    { id: "data", name: "Data &\nAnalytics", val: 35, color: "#9b59b6", category: "branch", level: 1 },
    { id: "research", name: "Research\nMethods", val: 35, color: "#f39c12", category: "branch", level: 1 },

    // Engineering & Design (Level 2)
    { id: "medical_devices", name: "Medical Devices", val: 25, color: "#e74c3c", category: "domain", level: 2 },
    { id: "circuit_design", name: "Circuit Design", val: 25, color: "#e74c3c", category: "domain", level: 2 },
    { id: "cad", name: "CAD & Modeling", val: 25, color: "#e74c3c", category: "domain", level: 2 },
    { id: "biomedical", name: "Biomedical Systems", val: 25, color: "#e74c3c", category: "domain", level: 2 },
    { id: "control_systems", name: "Control Systems", val: 25, color: "#e74c3c", category: "domain", level: 2 },

    // Software Development (Level 2)
    { id: "web", name: "Web Systems", val: 25, color: "#2ecc71", category: "domain", level: 2 },
    { id: "mobile", name: "Mobile Development", val: 25, color: "#2ecc71", category: "domain", level: 2 },
    { id: "architecture", name: "System Architecture", val: 25, color: "#2ecc71", category: "domain", level: 2 },
    { id: "devops", name: "DevOps & Cloud", val: 25, color: "#2ecc71", category: "domain", level: 2 },
    { id: "databases", name: "Database Systems", val: 25, color: "#2ecc71", category: "domain", level: 2 },

    // Data & Analytics (Level 2)
    { id: "ml", name: "Machine Learning", val: 25, color: "#9b59b6", category: "domain", level: 2 },
    { id: "viz", name: "Data Visualization", val: 25, color: "#9b59b6", category: "domain", level: 2 },
    { id: "stats", name: "Statistical Analysis", val: 25, color: "#9b59b6", category: "domain", level: 2 },
    { id: "cv", name: "Computer Vision", val: 25, color: "#9b59b6", category: "domain", level: 2 },
    { id: "signal_processing", name: "Signal Processing", val: 25, color: "#9b59b6", category: "domain", level: 2 },

    // Research Methods (Level 2)
    { id: "exp_design", name: "Experimental Design", val: 25, color: "#f39c12", category: "domain", level: 2 },
    { id: "lit_review", name: "Literature Review", val: 25, color: "#f39c12", category: "domain", level: 2 },
    { id: "documentation", name: "Documentation", val: 25, color: "#f39c12", category: "domain", level: 2 },
    { id: "data_collection", name: "Data Collection", val: 25, color: "#f39c12", category: "domain", level: 2 },

    // Tools & Technologies (Level 3)
    // Engineering Tools
    { id: "matlab", name: "MATLAB", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "simulink", name: "Simulink", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "labview", name: "LabVIEW", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "ni_daq", name: "NI DAQ", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "solidworks", name: "SolidWorks", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "fusion360", name: "Fusion 360", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "arduino", name: "Arduino", val: 20, color: "#e74c3c", category: "tool", level: 3 },
    { id: "pcb_design", name: "PCB Design", val: 20, color: "#e74c3c", category: "tool", level: 3 },

    // Software Tools
    { id: "react", name: "React", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "nextjs", name: "Next.js", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "typescript", name: "TypeScript", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "nodejs", name: "Node.js", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "postgresql", name: "PostgreSQL", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "redis", name: "Redis", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "docker", name: "Docker", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "trpc", name: "tRPC", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "prisma", name: "Prisma", val: 20, color: "#2ecc71", category: "tool", level: 3 },
    { id: "github_actions", name: "GitHub Actions", val: 20, color: "#2ecc71", category: "tool", level: 3 },

    // Data Science Tools
    { id: "python", name: "Python", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "pytorch", name: "PyTorch", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "pytorch_lightning", name: "PyTorch Lightning", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "tensorflow", name: "TensorFlow", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "scikit", name: "scikit-learn", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "opencv", name: "OpenCV", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "pandas", name: "Pandas", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "numpy", name: "NumPy", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "plotly", name: "Plotly", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "seaborn", name: "Seaborn", val: 20, color: "#9b59b6", category: "tool", level: 3 },
    { id: "transformers", name: "Transformers", val: 20, color: "#9b59b6", category: "tool", level: 3 },

    // Research Tools
    { id: "jupyter", name: "Jupyter", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "latex", name: "LaTeX", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "git", name: "Git", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "mendeley", name: "Mendeley", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "zotero", name: "Zotero", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "tableau", name: "Tableau", val: 20, color: "#f39c12", category: "tool", level: 3 },
    { id: "powerbi", name: "Power BI", val: 20, color: "#f39c12", category: "tool", level: 3 },
  ],
  links: [
    // Central to Primary Branches
    { source: "central", target: "engineering", value: 8, category: "primary" },
    { source: "central", target: "software", value: 8, category: "primary" },
    { source: "central", target: "data", value: 8, category: "primary" },
    { source: "central", target: "research", value: 8, category: "primary" },

    // Engineering & Design Connections
    { source: "engineering", target: "medical_devices", value: 5, category: "branch" },
    { source: "engineering", target: "circuit_design", value: 5, category: "branch" },
    { source: "engineering", target: "cad", value: 5, category: "branch" },
    { source: "engineering", target: "biomedical", value: 5, category: "branch" },
    { source: "engineering", target: "control_systems", value: 5, category: "branch" },

    // Software Development Connections
    { source: "software", target: "web", value: 5, category: "branch" },
    { source: "software", target: "mobile", value: 5, category: "branch" },
    { source: "software", target: "architecture", value: 5, category: "branch" },
    { source: "software", target: "devops", value: 5, category: "branch" },
    { source: "software", target: "databases", value: 5, category: "branch" },

    // Data & Analytics Connections
    { source: "data", target: "ml", value: 5, category: "branch" },
    { source: "data", target: "viz", value: 5, category: "branch" },
    { source: "data", target: "stats", value: 5, category: "branch" },
    { source: "data", target: "cv", value: 5, category: "branch" },
    { source: "data", target: "signal_processing", value: 5, category: "branch" },

    // Research Methods Connections
    { source: "research", target: "exp_design", value: 5, category: "branch" },
    { source: "research", target: "lit_review", value: 5, category: "branch" },
    { source: "research", target: "documentation", value: 5, category: "branch" },
    { source: "research", target: "data_collection", value: 5, category: "branch" },

    // Engineering Tool Connections
    { source: "medical_devices", target: "matlab", value: 4, category: "tool" },
    { source: "medical_devices", target: "labview", value: 4, category: "tool" },
    { source: "medical_devices", target: "ni_daq", value: 4, category: "tool" },
    { source: "circuit_design", target: "arduino", value: 4, category: "tool" },
    { source: "circuit_design", target: "pcb_design", value: 4, category: "tool" },
    { source: "cad", target: "solidworks", value: 4, category: "tool" },
    { source: "cad", target: "fusion360", value: 4, category: "tool" },
    { source: "control_systems", target: "simulink", value: 4, category: "tool" },
    { source: "control_systems", target: "matlab", value: 4, category: "tool" },

    // Software Tool Connections
    { source: "web", target: "react", value: 4, category: "tool" },
    { source: "web", target: "nextjs", value: 4, category: "tool" },
    { source: "web", target: "typescript", value: 4, category: "tool" },
    { source: "architecture", target: "nodejs", value: 4, category: "tool" },
    { source: "architecture", target: "trpc", value: 4, category: "tool" },
    { source: "databases", target: "postgresql", value: 4, category: "tool" },
    { source: "databases", target: "redis", value: 4, category: "tool" },
    { source: "databases", target: "prisma", value: 4, category: "tool" },
    { source: "devops", target: "docker", value: 4, category: "tool" },
    { source: "devops", target: "github_actions", value: 4, category: "tool" },

    // Data Science Tool Connections
    { source: "ml", target: "python", value: 4, category: "tool" },
    { source: "ml", target: "pytorch", value: 4, category: "tool" },
    { source: "ml", target: "pytorch_lightning", value: 4, category: "tool" },
    { source: "ml", target: "tensorflow", value: 4, category: "tool" },
    { source: "ml", target: "scikit", value: 4, category: "tool" },
    { source: "cv", target: "opencv", value: 4, category: "tool" },
    { source: "viz", target: "plotly", value: 4, category: "tool" },
    { source: "viz", target: "seaborn", value: 4, category: "tool" },
    { source: "stats", target: "numpy", value: 4, category: "tool" },
    { source: "stats", target: "pandas", value: 4, category: "tool" },
    { source: "ml", target: "transformers", value: 4, category: "tool" },

    // Research Tool Connections
    { source: "exp_design", target: "jupyter", value: 4, category: "tool" },
    { source: "documentation", target: "latex", value: 4, category: "tool" },
    { source: "documentation", target: "git", value: 4, category: "tool" },
    { source: "lit_review", target: "mendeley", value: 4, category: "tool" },
    { source: "lit_review", target: "zotero", value: 4, category: "tool" },
    { source: "data_collection", target: "tableau", value: 4, category: "tool" },
    { source: "data_collection", target: "powerbi", value: 4, category: "tool" },

    // Cross-domain Connections
    { source: "python", target: "jupyter", value: 3, category: "cross" },
    { source: "matlab", target: "signal_processing", value: 3, category: "cross" },
    { source: "opencv", target: "medical_devices", value: 3, category: "cross" },
    { source: "pytorch", target: "cv", value: 3, category: "cross" },
    { source: "docker", target: "ml", value: 3, category: "cross" },
    { source: "github_actions", target: "documentation", value: 3, category: "cross" },
    { source: "tableau", target: "viz", value: 3, category: "cross" },
    { source: "powerbi", target: "databases", value: 3, category: "cross" },
    { source: "ni_daq", target: "data_collection", value: 3, category: "cross" },
    { source: "python", target: "arduino", value: 3, category: "cross" },
  ],
}

import type { GraphLink, GraphNode } from "./graph-types"

export const forceConfig = {
  link: {
    distance: (link: GraphLink) => {
      switch (link.category) {
        case "primary":
          return 120 // Reduced distance
        case "branch":
          return 100
        case "tool":
          return 80
        default:
          return 90
      }
    },
    strength: (link: GraphLink) => {
      switch (link.category) {
        case "primary":
          return 0.8 // Increased strength
        case "branch":
          return 0.6
        case "tool":
          return 0.5
        default:
          return 0.4
      }
    },
  },
  charge: {
    strength: (node: GraphNode) => {
      switch (node.category) {
        case "central":
          return -600 // Reduced repulsion
        case "branch":
          return -400
        case "domain":
          return -300
        default:
          return -200
      }
    },
    distanceMax: 500, // Reduced max distance
    theta: 0.5,
  },
  center: {
    strength: 0.2, // Increased centering force
  },
  radial: {
    strength: (node: GraphNode) => {
      if (!node.level) return 0
      return Math.max(0, 1 - node.level * 0.2) // Adjusted radial strength
    },
    radius: (node: GraphNode) => {
      if (!node.level) return 0
      return node.level * 120 // Reduced radius
    },
  },
}

