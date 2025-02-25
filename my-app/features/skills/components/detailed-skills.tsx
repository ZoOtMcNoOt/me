"use client"

import { useState } from "react"
import { AnimatedCard } from "@/components/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TechGraph } from "@/features/skills/components/tech-graph"
// Update import to use consolidated data sources
import { graphData } from "@/lib/data/graph-data"
import { skillDetails } from "@/lib/data/skill-details"

function SkillList() {
  const [selectedCategory, setSelectedCategory] = useState("software")

  const categoryColorMap = {
    software: "#2ecc71",
    data: "#9b59b6",
    engineering: "#e74c3c",
    research: "#f39c12",
  }

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
    <Tabs defaultValue="graph" className="space-y-8">
      <TabsList>
        <TabsTrigger value="graph">Graph View</TabsTrigger>
        <TabsTrigger value="list">List View</TabsTrigger>
      </TabsList>

      <TabsContent value="graph">
        <AnimatedCard>
          <TechGraph />
        </AnimatedCard>
      </TabsContent>

      <TabsContent value="list">
        <SkillList />
      </TabsContent>
    </Tabs>
  )
}

