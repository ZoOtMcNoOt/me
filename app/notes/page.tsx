"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import Link from "next/link"

import { PageLayout } from "@/components/page-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

function NoteSkeletonItem() {
  return (
    <div className="p-6 border border-border/50 bg-card/30 rounded-lg">
      <div className="h-7 w-3/4 bg-zinc-800/40 rounded mb-3"></div>
      <div className="h-4 w-full bg-zinc-800/30 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-zinc-800/30 rounded mb-4"></div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <div className="h-4 w-24 bg-zinc-800/30 rounded"></div>
        <div className="flex gap-2">
          <div className="h-5 w-16 bg-primary/20 rounded-full"></div>
          <div className="h-5 w-20 bg-primary/20 rounded-full"></div>
        </div>
      </div>
    </div>
  )
}

function NoteSkeletonGrid() {
  return (
    <div className="grid gap-4">
      <NoteSkeletonItem />
      <NoteSkeletonItem />
      <NoteSkeletonItem />
    </div>
  )
}

export default function NotesPage() {
  const [notes, setNotes] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [filteredNotes, setFilteredNotes] = useState([])
  const [allTags, setAllTags] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Load notes on mount
  useEffect(() => {
    async function loadNotes() {
      try {
        setIsLoading(true)
        const response = await fetch('/api/notes')
        
        if (!response.ok) {
          throw new Error('Failed to fetch notes')
        }
        
        const notesData = await response.json()
        console.log('Loaded notes:', notesData)
        
        setNotes(notesData)
        setFilteredNotes(notesData)
        
        // Extract all unique tags
        const tags = new Set()
        notesData.forEach((note) => {
          if (note.tags && Array.isArray(note.tags)) {
            note.tags.forEach((tag) => tags.add(tag))
          }
        })
        setAllTags(Array.from(tags).sort())
      } catch (error) {
        console.error('Error loading notes:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    loadNotes()
  }, [])

  // Filter notes based on search query and selected tag
  useEffect(() => {
    if (!notes.length) return

    const filtered = notes.filter((note) => {
      const matchesSearch =
        searchQuery === "" ||
        note.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesTag = selectedTag === "" || note.tags?.includes(selectedTag)

      return matchesSearch && matchesTag
    })

    setFilteredNotes(filtered)
  }, [searchQuery, selectedTag, notes])

  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
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

        {/* Notes Content */}
        {isLoading ? (
          <NoteSkeletonGrid />
        ) : filteredNotes.length > 0 ? (
          <div className="grid gap-4">
            {filteredNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="block">
                <div className="p-6 border border-border/50 bg-card/30 rounded-lg hover:bg-card/50 transition-colors">
                  <h2 className="text-xl font-semibold">{note.title}</h2>
                  <p className="mt-2 text-muted-foreground line-clamp-2">{note.excerpt}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-4">
                    <time className="text-sm text-muted-foreground">
                      {new Date(note.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </time>
                    <div className="flex flex-wrap gap-2">
                      {note.tags?.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
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
          </div>
        )}
      </div>
    </PageLayout>
  )
}

