"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { skillDetails } from "@/data/skill-details"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
}

// Define categories and their display names
const categoryMap = {
  Languages: ["python", "js_ts", "typescript", "cplusplus", "matlab"],
  Frameworks: ["react", "nextjs", "pytorch", "tf_keras", "nodejs"],
  Tools: ["git", "docker", "aws_lambda", "postgresql", "vercel"],
}

// Convert skillDetails to array format for the chart and grid
const skills = Object.entries(skillDetails)
  .filter(([id]) => {
    return Object.values(categoryMap).some((category) => category.includes(id))
  })
  .map(([id, skill]) => ({
    name: skill.name,
    level: skill.level || 0,
    color: skill.color || "#000000",
    category: Object.entries(categoryMap).find(([_, ids]) => ids.includes(id))?.[0] || "Other",
  }))

const categories = Array.from(new Set(skills.map((skill) => skill.category)))

interface SkillChartProps {
  skills: typeof skills
}

const SkillChart = ({ skills }: SkillChartProps) => (
  <div className="space-y-4">
    {skills.map((skill) => (
      <motion.div key={skill.name} {...fadeInUp} transition={{ duration: 0.5 }} className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{skill.name}</span>
          <span className="text-muted-foreground">{skill.level}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: skill.color }}
            initial={{ width: 0 }}
            animate={{ width: `${skill.level}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    ))}
  </div>
)

interface SkillGridProps {
  skills: typeof skills
}

const SkillGrid = ({ skills }: SkillGridProps) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {categories.map((category, categoryIndex) => (
      <motion.div
        key={category}
        {...fadeInUp}
        transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
        viewport={{ once: true }}
      >
        <AnimatedCard className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-bold">{category}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {skills
              .filter((skill) => skill.category === category)
              .map((skill, i) => (
                <motion.span
                  key={skill.name}
                  {...scaleIn}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-full px-2 py-1 text-xs sm:text-sm"
                  style={{
                    backgroundColor: `${skill.color}20`,
                    color: skill.color,
                  }}
                >
                  {skill.name}
                </motion.span>
              ))}
          </div>
        </AnimatedCard>
      </motion.div>
    ))}
  </div>
)

export default function Skills() {
  return (
    <section className="flex min-h-screen w-[calc(100vw-var(--sidebar-width))] flex-col items-center justify-center overflow-hidden section-padding scroll-mt-20 peer-data-[state=collapsed]:w-screen">
      <div className="responsive-container">
        <motion.div {...fadeInUp} viewport={{ once: true }} className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Skills</h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400">
            Technical proficiency and expertise across various technologies.
          </p>
        </motion.div>

        <div className="mt-16">
          <Tabs defaultValue="chart" className="space-y-8">
            <TabsList className="mx-auto flex flex-wrap justify-center">
              <TabsTrigger value="chart">Proficiency Chart</TabsTrigger>
              <TabsTrigger value="grid">Category Grid</TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="mx-auto max-w-2xl">
              <AnimatedCard className="p-6">
                <SkillChart skills={skills} />
              </AnimatedCard>
            </TabsContent>

            <TabsContent value="grid">
              <SkillGrid skills={skills} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

