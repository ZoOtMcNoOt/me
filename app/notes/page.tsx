"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CalendarDays, Tag, Search, Filter } from "lucide-react"
import Link from "next/link"

import { AnimatedCard } from "@/components/ui/animated-card"
import { PageLayout } from "@/components/page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Move data to a separate file in a real application
const notes = [
  {
    id: "1",
    title: "Understanding Neural Networks",
    excerpt: "An exploration of deep learning architectures and their applications in biomedical imaging...",
    date: "2024-02-20",
    tags: ["Deep Learning", "Neural Networks", "Medical Imaging"],
    readTime: "8 min read",
    slug: "understanding-neural-networks",
  },
  {
    id: "2",
    title: "The Future of Brain-Computer Interfaces",
    excerpt: "Analyzing recent developments in BCI technology and their potential impact on healthcare...",
    date: "2024-02-15",
    tags: ["BCI", "Neuroscience", "Healthcare"],
    readTime: "6 min read",
    slug: "future-of-brain-computer-interfaces",
  },
  {
    id: "3",
    title: "Optimizing React Performance",
    excerpt: "Best practices and techniques for improving React application performance...",
    date: "2024-02-10",
    tags: ["React", "Performance", "Web Development"],
    readTime: "5 min read",
    slug: "optimizing-react-performance",
  },
  {
    id: "4",
    title: "Introduction to Machine Learning",
    excerpt: "A beginner-friendly guide to understanding the fundamentals of machine learning algorithms...",
    date: "2024-02-05",
    tags: ["Machine Learning", "AI", "Data Science"],
    readTime: "7 min read",
    slug: "introduction-to-machine-learning",
  },
]

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [filteredNotes, setFilteredNotes] = useState(notes)
  const [allTags, setAllTags] = useState<string[]>([])

  // Extract all unique tags
  useEffect(() => {
    const tags = new Set<string>()
    notes.forEach((note) => {
      note.tags.forEach((tag) => tags.add(tag))
    })
    setAllTags(Array.from(tags).sort())
  }, [])

  // Filter notes based on search query and selected tag
  useEffect(() => {
    const filtered = notes.filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.excerpt.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = selectedTag === "" || note.tags.includes(selectedTag)

      return matchesSearch && matchesTag
    })

    setFilteredNotes(filtered)
  }, [searchQuery, selectedTag])

  // Format date helper
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--section-spacing-md)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-[var(--component-gap-md)]"
        >
          <div>
            <h1 className="text-3xl font-bold">Notes</h1>
            <p className="mt-2 text-muted-foreground">
              Thoughts, tutorials, and documentation on technology and development.
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                aria-label="Search notes"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {selectedTag ? selectedTag : "Filter by tag"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedTag("")}>All Tags</DropdownMenuItem>
                {allTags.map((tag) => (
                  <DropdownMenuItem key={tag} onClick={() => setSelectedTag(tag)}>
                    {tag}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </motion.div>

        <AnimatePresence>
          {filteredNotes.length > 0 ? (
            <motion.div layout className="grid gap-[var(--component-gap-md)]">
              {filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  layout
                >
                  <Link href={`/notes/${note.slug}`} className="block" aria-label={`Read ${note.title}`}>
                    <AnimatedCard className="p-6 h-full">
                      <article>
                        <h2 className="text-xl font-semibold">{note.title}</h2>
                        <p className="mt-2 text-muted-foreground line-clamp-2">{note.excerpt}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4" aria-hidden="true" />
                            <time dateTime={note.date}>{formatDate(note.date)}</time>
                            <span aria-hidden="true">•</span>
                            <span>{note.readTime}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {note.tags.map((tag) => (
                              <Badge
                                key={`${note.id}-${tag}`}
                                variant="outline"
                                className="flex items-center gap-1 bg-primary/10 text-primary hover:bg-primary/20"
                              >
                                <Tag className="h-3 w-3" aria-hidden="true" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </article>
                    </AnimatedCard>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <p className="text-lg text-muted-foreground">No notes found matching your search criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedTag("")
                }}
              >
                Clear filters
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  )
}

