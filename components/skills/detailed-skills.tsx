"use client"
import { useState } from "react"
import { motion } from "framer-motion"
// Import the client wrapper instead of the direct component
import ClientTechGraph from "@/components/skills/tech-graph-client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatedCard } from "@/components/ui/animated-card"
import { graphData } from "@/data/graph-data"
import { SectionTitle } from "@/components/layout/section-title"
import { skillDetails } from "@/data/skill-details"

const SkillGraph = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <ClientTechGraph />
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
    <section className="flex min-h-screen w-full flex-col items-start overflow-hidden section-padding">
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-left space-y-[var(--component-gap-md)] mb-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Skills</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              An overview of my technical skills and proficiencies
            </p>
          </motion.div>
        </SectionTitle>

        <Tabs defaultValue="graph" className="space-y-12">
          <TabsList className="sticky top-4 z-10 bg-background/80 backdrop-blur-sm">
            <TabsTrigger value="graph">Graph View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>
          <TabsContent value="graph">
            <div className="glass-panel rounded-lg">
              <SkillGraph />
            </div>
          </TabsContent>
          <TabsContent value="list">
            <div className="glass-panel rounded-lg">
              <SkillList />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

