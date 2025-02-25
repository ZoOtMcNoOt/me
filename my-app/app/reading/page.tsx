"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { useRef, useState } from "react"

import { AnimatedCard } from "@/components/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PageLayout } from "@/components/page-layout"

const books = {
  current: [
    {
      title: "Deep Learning for Biomedical Applications",
      author: "Sarah Johnson",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 75,
      rating: 4.5,
      status: "Currently Reading",
      startDate: "2024-02-01",
      pagesRead: 225,
      totalPages: 300,
    },
    {
      title: "The Pragmatic Programmer",
      author: "Andrew Hunt & David Thomas",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 45,
      rating: 5,
      status: "Currently Reading",
      startDate: "2024-02-15",
      pagesRead: 180,
      totalPages: 400,
    },
    {
      title: "Clean Code",
      author: "Robert C. Martin",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 60,
      rating: 4,
      status: "Currently Reading",
      startDate: "2024-01-20",
      pagesRead: 180,
      totalPages: 300,
    },
  ],
  completed: [
    {
      title: "Design Patterns",
      author: "Erich Gamma et al.",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 100,
      rating: 5,
      status: "Completed",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      pagesRead: 400,
      totalPages: 400,
    },
    {
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 100,
      rating: 4.5,
      status: "Completed",
      startDate: "2023-12-01",
      endDate: "2023-12-30",
      pagesRead: 1200,
      totalPages: 1200,
    },
  ],
  wishlist: [
    {
      title: "Machine Learning in Healthcare",
      author: "Pradeep Natarajan",
      cover: "/placeholder.svg?height=300&width=200",
      status: "Wishlist",
    },
    {
      title: "System Design Interview",
      author: "Alex Xu",
      cover: "/placeholder.svg?height=300&width=200",
      status: "Wishlist",
    },
  ],
}

export default function ReadingPage() {
  const [activeTab, setActiveTab] = useState("current")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const renderBookCard = (book: any) => (
    <AnimatedCard className="min-w-[300px] p-6">
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg">
          <img src={book.cover || "/placeholder.svg"} alt={book.title} className="h-full w-full object-cover" />
          {book.status === "Currently Reading" && (
            <div className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
              Currently Reading
            </div>
          )}
        </div>
        <div>
          <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-muted-foreground">{book.author}</p>
          {book.rating && (
            <div className="mt-2 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(book.rating) ? "fill-primary text-primary" : "fill-none text-muted-foreground"
                  } ${i === Math.floor(book.rating) && book.rating % 1 !== 0 ? "fill-primary/50" : ""}`}
                />
              ))}
            </div>
          )}
        </div>
        {book.progress !== undefined && (
          <div className="space-y-2">
            <Progress value={book.progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>
                {book.pagesRead} of {book.totalPages} pages
              </span>
              <span>{book.progress}% complete</span>
            </div>
          </div>
        )}
        {book.startDate && (
          <div className="text-xs text-muted-foreground">
            Started: {new Date(book.startDate).toLocaleDateString()}
            {book.endDate && (
              <>
                <br />
                Finished: {new Date(book.endDate).toLocaleDateString()}
              </>
            )}
          </div>
        )}
      </div>
    </AnimatedCard>
  )

  return (
    <PageLayout>
      <div className="w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--section-spacing-sm)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-[var(--component-gap-sm)]"
        >
          <h1 className="text-3xl font-bold">Reading List</h1>
          <p className="text-muted-foreground">Track your reading journey and discover new books.</p>
        </motion.div>

        {/* Reading Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AnimatedCard className="space-y-[var(--component-gap-md)]">
            <h2 className="text-xl font-semibold">Reading Stats</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Currently Reading</div>
                <div className="mt-1 text-2xl font-bold">{books.current.length}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Books Completed</div>
                <div className="mt-1 text-2xl font-bold">{books.completed.length}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Pages Read</div>
                <div className="mt-1 text-2xl font-bold">
                  {books.current.reduce((acc, book) => acc + book.pagesRead, 0) +
                    books.completed.reduce((acc, book) => acc + book.pagesRead, 0)}
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm text-muted-foreground">Wishlist</div>
                <div className="mt-1 text-2xl font-bold">{books.wishlist.length}</div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        <Tabs defaultValue="current" className="space-y-[var(--component-gap-lg)]">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="current">Currently Reading</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleScroll("left")} className="rounded-full">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => handleScroll("right")} className="rounded-full">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4"
          >
            <TabsContent value="current" className="mt-0 flex gap-4">
              {books.current.map((book) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="snap-start"
                >
                  {renderBookCard(book)}
                </motion.div>
              ))}
            </TabsContent>
            <TabsContent value="completed" className="mt-0 flex gap-4">
              {books.completed.map((book) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="snap-start"
                >
                  {renderBookCard(book)}
                </motion.div>
              ))}
            </TabsContent>
            <TabsContent value="wishlist" className="mt-0 flex gap-4">
              {books.wishlist.map((book) => (
                <motion.div
                  key={book.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="snap-start"
                >
                  {renderBookCard(book)}
                </motion.div>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </PageLayout>
  )
}

