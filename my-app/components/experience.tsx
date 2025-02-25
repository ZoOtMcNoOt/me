"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "./animated-card"
import { cn } from "@/lib/utils"
import { Circle } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const slideIn = (direction: number) => ({
  initial: { opacity: 0, x: direction * 20 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
})

interface Experience {
  company: string
  role: string
  date: string
  description: string
}

const experiences: Experience[] = [
  {
    company: "Palantir Technologies",
    role: "Winter Defense Tech Fellow",
    date: "Dec 2024 – Feb 2025",
    description:
      "Developed analytics platform and integrated RAG Model for hazard warnings, improving safety trends analysis across 841 product types.",
  },
  {
    company: "Advanced Vision and Learning Lab",
    role: "Research Assistant",
    date: "Sep 2024 – Present",
    description:
      "Architected CNNs using PyTorch for anomaly detection in sonar imagery, implementing advanced data augmentation strategies.",
  },
  {
    company: "Texas A&M University School of Medicine",
    role: "Research Intern",
    date: "May 2024 – Aug 2024",
    description:
      "Developed MATLAB/C++ package for real-time EEG processing and implemented supervised learning for epileptogenesis detection.",
  },
]

export default function Experience() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-center overflow-hidden section-padding scroll-mt-20">
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--component-gap-xl)]">
        <motion.div
          {...fadeInUp}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center space-y-[var(--component-gap-md)]"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Experience
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            My professional journey in software development and research.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-5xl">
          {" "}
          {/* Increased max-width */}
          {/* Timeline line with gradient and glow */}
          <div className="absolute left-8 sm:left-1/2 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 blur-[0.5px]" />
          <div className="absolute left-8 sm:left-1/2 h-full w-px -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              {...slideIn(index % 2 === 0 ? -1 : 1)}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "mb-16 sm:mb-24", // Increased spacing between items
                "flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-12", // Increased gap
                index % 2 === 0 && "sm:flex-row-reverse",
              )}
            >
              {/* Timeline node with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="absolute left-8 sm:left-1/2 -translate-x-1/2 top-6"
              >
                <div className="relative">
                  <Circle className="h-4 w-4 fill-background stroke-blue-500 stroke-2" />
                  <div className="absolute inset-0 animate-ping">
                    <Circle className="h-4 w-4 fill-transparent stroke-blue-500/50 stroke-2" />
                  </div>
                </div>
              </motion.div>

              <div
                className={cn(
                  "w-full sm:w-[calc(50%-3rem)]", // Increased width
                  "ml-16 sm:ml-0", // Adjusted margin for mobile
                )}
              >
                <AnimatedCard className="group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="relative p-6 sm:p-8">
                    {" "}
                    {/* Increased padding */}
                    {/* Mobile timeline connector with animation */}
                    <div className="absolute left-[-2rem] top-8 h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-500 to-blue-500 sm:hidden">
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-blue-500 to-blue-500 opacity-50" />
                    </div>
                    <div className="space-y-3">
                      {" "}
                      {/* Increased spacing */}
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-blue-500 transition-colors">
                          {exp.company}
                        </h3>
                        <p className="text-base sm:text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          {exp.role}
                        </p>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium">{exp.date}</p>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </AnimatedCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

