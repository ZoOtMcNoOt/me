"use client"

import { Button } from "@/components/ui/button"

import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedCard } from "@/components/ui/animated-card"
import { SectionTitle } from "@/components/layout/section-title"
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

interface Project {
  title: string
  description: string
  image: string
  tech: string[]
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: "VialCount Pro",
    description: "FDA-compliant web application for automated vial counting and inventory tracking",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["React", "Next.js", "Tailwind", "Roboflow", "Supabase"],
    github: "#",
    demo: "#",
  },
  {
    title: "Portable One Lead ECG",
    description: "Mobile application for real-time ECG analysis with integrated hardware",
    image: "/placeholder.svg?height=400&width=600",
    tech: ["React Native", "TensorFlow", "Arduino", "C++"],
    github: "#",
    demo: "#",
  },
]

interface ProjectCardProps {
  project: Project
  index: number
  className?: string
}

const ProjectCard = ({ project, index, className }: ProjectCardProps) => (
  <motion.div {...fadeInUp} transition={{ duration: 0.5, delay: index * 0.2 }} viewport={{ once: true }}>
    <AnimatedCard className={className}>
      <div className="aspect-video overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          width={600}
          height={400}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4 sm:p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
          <p className="text-sm sm:text-base text-gray-400">{project.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span key={tech} className="rounded-full bg-blue-500/10 px-2 py-1 text-xs sm:text-sm text-blue-500">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {[
            { href: project.github, icon: Github, label: "Code" },
            { href: project.demo, icon: ExternalLink, label: "Demo" },
          ].map(({ href, icon: Icon, label }) => (
            <Button key={label} asChild variant="outline" size="sm">
              <Link href={href}>
                <Icon className="mr-2 h-4 w-4" />
                {label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </AnimatedCard>
  </motion.div>
)

export default function Projects() {
  return (
    <section className="flex min-h-screen w-full flex-col items-start overflow-hidden section-padding">
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--section-spacing-sm)]">
        <SectionTitle id="projects">
          <motion.div
            {...fadeInUp}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-left space-y-[var(--component-gap-md)]"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Featured Projects</h2>
            <p className="mt-4 text-sm sm:text-base text-gray-400">
              Here are some of my recent projects that showcase my technical skills and problem-solving abilities.
            </p>
          </motion.div>
        </SectionTitle>
        <div className="grid gap-[var(--component-gap-lg)] md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              className="h-full space-y-[var(--component-gap-md)]" // Added consistent spacing
            />
          ))}
        </div>
      </div>
    </section>
  )
}

