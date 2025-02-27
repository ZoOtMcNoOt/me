"use client"

import { motion } from "framer-motion"
import { AnimatedCard } from "@/components/ui/animated-card"
import { cn } from "@/lib/utils"
import { Circle, ExternalLink, Shield, Brain, Stethoscope, type LucideIcon } from "lucide-react"
import { SectionTitle } from "@/components/layout/section-title"

// Animation constants grouped together
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

// Type definition
interface Experience {
  company: string
  role: string
  date: string
  description: string
  skills?: string[]
  url?: string
  logo?: string
  icon: LucideIcon
}

// Data constant
const experiences: Experience[] = [
  {
    company: "Palantir Technologies",
    role: "Winter Defense Tech Fellow",
    date: "Dec 2024 – Feb 2025",
    description:
      "Developed analytics platform and integrated RAG Model for hazard warnings, improving safety trends analysis across 841 product types.",
    skills: ["Data Analytics", "RAG Models", "NLP", "Safety Systems"],
    url: "https://palantir.com",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pa8547c941-palantir-logo-cib-palantir-download-logo-icon-png-svg-icon-download-NFxky3y9H5FDxtu9qZc4fcDWEzD4IC.png",
    icon: Shield,
  },
  {
    company: "Advanced Vision and Learning Lab",
    role: "Research Assistant",
    date: "Sep 2024 – Present",
    description:
      "Architected CNNs using PyTorch for anomaly detection in sonar imagery, implementing advanced data augmentation strategies.",
    skills: ["PyTorch", "CNN", "Computer Vision", "Data Augmentation"],
    url: "https://example.edu/avl-lab",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-OtK4we9Ok7Ulgh2u3rmu5uDXMR9dG9.png",
    icon: Brain,
  },
  {
    company: "Texas A&M University School of Medicine",
    role: "Research Intern",
    date: "May 2024 – Aug 2024",
    description:
      "Developed MATLAB/C++ package for real-time EEG processing and implemented supervised learning for epileptogenesis detection.",
    skills: ["MATLAB", "C++", "EEG Processing", "Machine Learning"],
    url: "https://medicine.tamu.edu",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pngegg-PqH4IqAsBxGLuIrv53zWBQs5PsSuk2.png",
    icon: Stethoscope,
  },
]

// Named export
export function Experience() {
  return (
    <section className="flex min-h-screen w-full flex-col items-start overflow-hidden section-padding">
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--component-gap-xl)]">
        <SectionTitle id="experience">
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
        </SectionTitle>

        <div className="relative mx-auto max-w-5xl">
          {/* Timeline line with subtle styling */}
          <div className="absolute left-8 sm:left-1/2 top-[2.5rem] h-[calc(100%-2.5rem)] w-px -translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 opacity-80" />
          <div className="absolute left-8 sm:left-1/2 top-[2.5rem] h-[calc(100%-2.5rem)] w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30 blur-[1px]" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              {...slideIn(index % 2 === 0 ? -1 : 1)}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={cn(
                "mb-16 sm:mb-24",
                "flex flex-col sm:flex-row items-start justify-center gap-8 sm:gap-12",
                index % 2 === 0 && "sm:flex-row-reverse",
              )}
            >
              {/* Timeline node with animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 + 0.3 }}
                className="absolute left-8 sm:left-1/2 -translate-x-1/2 top-10"
              >
                <div className="relative">
                  <Circle className="h-4 w-4 fill-background stroke-blue-500 stroke-2" />
                  <div className="absolute inset-0 animate-ping">
                    <Circle className="h-4 w-4 fill-transparent stroke-blue-500/50 stroke-2" />
                  </div>
                </div>
              </motion.div>

              <div className={cn("w-full sm:w-[calc(50%-3rem)]", "ml-16 sm:ml-0")}>
                <AnimatedCard className="group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="relative p-6 sm:p-8 flex flex-col gap-4">
                    {/* Mobile timeline connector */}
                    <div className="absolute left-[-2rem] top-10 h-0.5 w-8 bg-gradient-to-r from-transparent via-blue-500 to-blue-500 sm:hidden">
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-blue-500 to-blue-500 opacity-50" />
                    </div>

                    <div className="flex justify-between items-start">
                      {exp.logo && (
                        <div className="w-20 h-12 relative">
                          <img
                            src={exp.logo || "/placeholder.svg"}
                            alt={`${exp.company} logo`}
                            className="object-contain w-full h-full filter invert brightness-0"
                          />
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground font-medium">{exp.date}</p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight group-hover:text-blue-500 transition-colors flex items-center gap-2">
                          {exp.company}
                          {exp.url && (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                              <ExternalLink className="h-4 w-4 text-blue-500" />
                            </a>
                          )}
                        </h3>
                        <p className="text-base sm:text-lg font-medium bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent flex items-center gap-2">
                          <exp.icon className="h-4 w-4 text-blue-500" />
                          {exp.role}
                        </p>
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{exp.description}</p>

                      {exp.skills && (
                        <div className="flex flex-wrap gap-2 pt-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs px-2 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
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

