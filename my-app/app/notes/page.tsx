"use client"

import { motion } from "framer-motion"
import { CalendarDays, Tag } from "lucide-react"
import Link from "next/link"

import { AnimatedCard } from "@/components/animated-card"
import { PageLayout } from "@/components/page-layout"

const notes = [
  {
    title: "Understanding Neural Networks",
    excerpt: "An exploration of deep learning architectures and their applications in biomedical imaging...",
    date: "2024-02-20",
    tags: ["Deep Learning", "Neural Networks", "Medical Imaging"],
    readTime: "8 min read",
  },
  {
    title: "The Future of Brain-Computer Interfaces",
    excerpt: "Analyzing recent developments in BCI technology and their potential impact on healthcare...",
    date: "2024-02-15",
    tags: ["BCI", "Neuroscience", "Healthcare"],
    readTime: "6 min read",
  },
  {
    title: "Optimizing React Performance",
    excerpt: "Best practices and techniques for improving React application performance...",
    date: "2024-02-10",
    tags: ["React", "Performance", "Web Development"],
    readTime: "5 min read",
  },
]

export default function NotesPage() {
  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--section-spacing-sm)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-[var(--component-gap-sm)]"
        >
          <h1 className="text-3xl font-bold">Notes</h1>
          <p className="text-muted-foreground">Thoughts, tutorials, and documentation on technology and development.</p>
        </motion.div>

        <div className="grid gap-[var(--component-gap-md)]">
          {notes.map((note, index) => (
            <motion.div
              key={note.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href="#" className="block">
                <AnimatedCard className="p-6">
                  <h2 className="text-xl font-semibold">{note.title}</h2>
                  <p className="mt-2 text-muted-foreground">{note.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <time dateTime={note.date}>
                        {new Date(note.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span>{note.readTime}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {note.tags.map((tag) => (
                        <div
                          key={tag}
                          className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimatedCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

