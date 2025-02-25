"use client"

import type React from "react"
import { useState } from "react"

import { AnimatedCard } from "@/components/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TechGraph } from "@/features/skills/components/tech-graph"
// Update import to use consolidated data source
import { graphData } from "@/lib/data/graph-data"

interface SkillNode {
  id: string
  name: string
  level?: number
  description?: string
  yearsOfExperience?: number
  icon?: React.ReactNode
  color?: string
  category?: string
  val?: number
}

const skillDetails: Record<string, SkillNode> = {
  react: {
    name: "React",
    level: 90,
    description: "Modern React with hooks, server components, and Next.js",
    yearsOfExperience: 3,
    color: "#61DAFB",
  },
  typescript: {
    name: "TypeScript",
    level: 85,
    description: "Type-safe development with advanced TypeScript features",
    yearsOfExperience: 2,
    color: "#3178C6",
  },
  nodejs: {
    name: "Node.js",
    level: 80,
    description: "Server-side JavaScript and API development",
    yearsOfExperience: 3,
    color: "#339933",
  },
  python: {
    name: "Python",
    level: 95,
    description: "Scientific computing and data analysis",
    yearsOfExperience: 4,
    color: "#3776AB",
  },
  pytorch: {
    name: "PyTorch",
    level: 85,
    description: "Deep learning and neural network development",
    yearsOfExperience: 2,
    color: "#EE4C2C",
  },
  matlab: {
    name: "MATLAB",
    level: 85,
    description: "Signal processing and data analysis",
    yearsOfExperience: 3,
    color: "#0076A8",
  },
  // Add more skill details as needed...
}

const SkillGraph = () => {
  return (
    <div className="h-[600px] w-full">
      <TechGraph />
    </div>
  )
}

const SkillList = () => {
  const [selectedCategory, setSelectedCategory] = useState("software")

  const categoryColorMap = {
    software: "#2ecc71",
    data: "#9b59b6",
    engineering: "#e74c3c",
    research: "#f39c12",
  }

  // Filter nodes from tech graph data
  const categoryNodes = graphData.nodes.filter((node) => node.category === "branch")
  const domainNodes = graphData.nodes.filter(
    (node) =>
      node.category === "domain" && node.color === categoryColorMap[selectedCategory as keyof typeof categoryColorMap],
  )
  const toolNodes = graphData.nodes.filter(
    (node) =>
      node.category === "tool" && node.color === categoryColorMap[selectedCategory as keyof typeof categoryColorMap],
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {categoryNodes.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className="transition-colors"
            style={
              selectedCategory === category.id ? {} : { color: category.color, borderColor: `${category.color}40` }
            }
          >
            {category.name}
          </Button>
        ))}
      </div>

      <div className="space-y-6">
        {domainNodes.map((domain) => {
          const domainTools = toolNodes.filter((tool) => {
            const link = graphData.links.find(
              (l) =>
                (typeof l.source === "string" ? l.source === domain.id : l.source.id === domain.id) &&
                (typeof l.target === "string" ? l.target === tool.id : l.target.id === tool.id),
            )
            return !!link
          })

          return (
            <AnimatedCard key={domain.id} className="p-6">
              <h3 className="text-lg font-semibold mb-4">{domain.name}</h3>
              <div className="space-y-4">
                {domainTools.map((tool) => {
                  const details = skillDetails[tool.id]
                  if (!details) return null

                  return (
                    <div key={tool.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{tool.name}</h4>
                          <p className="text-sm text-muted-foreground">{details.yearsOfExperience} years experience</p>
                        </div>
                        <span className="text-sm text-muted-foreground">{details.level}%</span>
                      </div>
                      <Progress value={details.level} className="h-2" />
                      <p className="text-sm text-muted-foreground">{details.description}</p>
                    </div>
                  )
                })}
              </div>
            </AnimatedCard>
          )
        })}
      </div>
    </div>
  )
}

export function DetailedSkills() {
  return (
    <Tabs defaultValue="graph" className="space-y-12">
      <TabsList className="sticky top-4 z-10 bg-background/80 backdrop-blur-sm">
        <TabsTrigger value="graph">Graph View</TabsTrigger>
        <TabsTrigger value="list">List View</TabsTrigger>
      </TabsList>

      <TabsContent value="graph">
        <AnimatedCard className="overflow-hidden glass-panel rounded-lg p-1">
          <div className="overflow-hidden rounded-md aspect-[16/9]">
            <SkillGraph />
          </div>
        </AnimatedCard>
      </TabsContent>

      <TabsContent value="list">
        <div className="glass-panel rounded-lg">
          <SkillList />
        </div>
      </TabsContent>
    </Tabs>
  )
}

