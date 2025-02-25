import type { GraphNode } from "../types/graph"

export interface SkillDetails extends GraphNode {
  level?: number
  description?: string
  yearsOfExperience?: number
}

export const skillDetails: Record<string, SkillDetails> = {
  react: {
    id: "react",
    name: "React",
    level: 90,
    description: "Modern React with hooks, server components, and Next.js",
    yearsOfExperience: 3,
    color: "#61DAFB",
    val: 20,
    category: "tool",
  },
  typescript: {
    id: "typescript",
    name: "TypeScript",
    level: 85,
    description: "Type-safe development with advanced TypeScript features",
    yearsOfExperience: 2,
    color: "#3178C6",
    val: 20,
    category: "tool",
  },
  nodejs: {
    id: "nodejs",
    name: "Node.js",
    level: 80,
    description: "Server-side JavaScript and API development",
    yearsOfExperience: 3,
    color: "#339933",
    val: 20,
    category: "tool",
  },
  python: {
    id: "python",
    name: "Python",
    level: 95,
    description: "Scientific computing and data analysis",
    yearsOfExperience: 4,
    color: "#3776AB",
    val: 20,
    category: "tool",
  },
  pytorch: {
    id: "pytorch",
    name: "PyTorch",
    level: 85,
    description: "Deep learning and neural network development",
    yearsOfExperience: 2,
    color: "#EE4C2C",
    val: 20,
    category: "tool",
  },
  matlab: {
    id: "matlab",
    name: "MATLAB",
    level: 85,
    description: "Signal processing and data analysis",
    yearsOfExperience: 3,
    color: "#0076A8",
    val: 20,
    category: "tool",
  },
  // Add more skill details as needed...
}

