"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { PageLayout } from "@/components/page-layout"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// --- Sample Book Data ---

const books = {
  current: [
    {
      title: "Catch-22",
      author: "Joseph Heller",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 40,
      rating: 4.5,
      status: "Currently Reading",
      startDate: "2025-02-01",
      pagesRead: 200,
      totalPages: 500,
    },
    {
      title: "The Double",
      author: "Fyodor Dostoevsky",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 60,
      rating: 4,
      status: "Currently Reading",
      startDate: "2025-02-10",
      pagesRead: 90,
      totalPages: 150,
    },
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
      title: "The Gambler",
      author: "Fyodor Dostoevsky",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 100,
      rating: 3.5,
      status: "Completed",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      pagesRead: 200,
      totalPages: 200,
    },
    {
      title: "The Crest of the Peacock",
      author: "George Gheverghese Joseph",
      cover: "/placeholder.svg?height=300&width=200",
      progress: 100,
      rating: 4.5,
      status: "Completed",
      startDate: "2025-01-01",
      endDate: "2025-01-20",
      pagesRead: 400,
      totalPages: 400,
    },
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
      title: "The Name of the Rose",
      author: "Umberto Eco",
      cover: "/placeholder.svg?height=300&width=200",
      status: "Wishlist",
    },
    {
      title: "Midnight's Children",
      author: "Salman Rushdie",
      cover: "/placeholder.svg?height=300&width=200",
      status: "Wishlist",
    },
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

// --- Book Card Component ---
function BookCard({ book }: { book: any }) {
  // Render star rating with half-star support
  const stars = Array.from({ length: 5 }).map((_, i) => {
    const isFullStar = i < Math.floor(book.rating ?? 0)
    const isHalfStar = book.rating && i === Math.floor(book.rating) && book.rating % 1 !== 0
    return (
      <Star
        key={i}
        className={`
          h-4 w-4
          ${isFullStar ? "fill-primary text-primary" : "fill-none text-muted-foreground"}
          ${isHalfStar ? "fill-primary/50" : ""}
        `}
      />
    )
  })

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="snap-start"
    >
      <AnimatedCard className="min-w-[300px] p-6">
        <div className="flex flex-col gap-4">
          {/* Book Cover */}
          <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
            <img
              src={book.cover || "/placeholder.svg"}
              alt={book.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
            {book.status === "Currently Reading" && (
              <div className="absolute bottom-2 left-2 rounded-full bg-primary px-2 py-1 text-xs text-primary-foreground">
                Currently Reading
              </div>
            )}
          </div>

          {/* Title & Author */}
          <div>
            <h3 className="line-clamp-1 text-lg font-semibold">{book.title}</h3>
            <p className="text-sm text-muted-foreground">{book.author}</p>
            {/* Star Rating */}
            {book.rating && <div className="mt-2 flex items-center gap-1">{stars}</div>}
          </div>

          {/* Reading Progress (if applicable) */}
          {typeof book.progress === "number" && (
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

          {/* Dates (start/end) */}
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
    </motion.div>
  )
}

// --- Main Page Component ---
export default function ReadingPage() {
  const [activeTab, setActiveTab] = useState<"current" | "completed" | "wishlist">("current")
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Utility to sum pages read across current and completed books
  const totalPagesRead =
    books.current.reduce((acc, book) => acc + (book.pagesRead ?? 0), 0) +
    books.completed.reduce((acc, book) => acc + (book.pagesRead ?? 0), 0)

  return (
    <PageLayout>
      {/* Outer container with Swiss-inspired spacing */}
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-12">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
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
            <AnimatedCard className="space-y-6 p-6">
              <h2 className="text-xl font-semibold">Reading Stats</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Currently Reading</div>
                  <div className="mt-2 text-2xl font-bold">{books.current.length}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Books Completed</div>
                  <div className="mt-2 text-2xl font-bold">{books.completed.length}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Pages Read</div>
                  <div className="mt-2 text-2xl font-bold">{totalPagesRead}</div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="text-sm text-muted-foreground">Wishlist</div>
                  <div className="mt-2 text-2xl font-bold">{books.wishlist.length}</div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Tabs */}
          <Tabs defaultValue="current" onValueChange={(val) => setActiveTab(val as typeof activeTab)}>
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="current">Currently Reading</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
              </TabsList>
              {/* Scroll Controls */}
              <div className="hidden items-center gap-2 sm:flex">
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
              className="
                no-scrollbar
                -mx-4
                flex
                snap-x
                snap-mandatory
                gap-4
                overflow-x-auto
                px-4
                pb-4
              "
            >
              <AnimatePresence mode="popLayout">
                <TabsContent key="current-tab" value="current" className="flex gap-4">
                  {books.current.length === 0 ? (
                    <p className="text-muted-foreground">No books here yet.</p>
                  ) : (
                    books.current.map((book) => <BookCard key={book.title} book={book} />)
                  )}
                </TabsContent>
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                <TabsContent key="completed-tab" value="completed" className="flex gap-4">
                  {books.completed.length === 0 ? (
                    <p className="text-muted-foreground">No completed books yet.</p>
                  ) : (
                    books.completed.map((book) => <BookCard key={book.title} book={book} />)
                  )}
                </TabsContent>
              </AnimatePresence>

              <AnimatePresence mode="popLayout">
                <TabsContent key="wishlist-tab" value="wishlist" className="flex gap-4">
                  {books.wishlist.length === 0 ? (
                    <p className="text-muted-foreground">No books in your wishlist yet.</p>
                  ) : (
                    books.wishlist.map((book) => <BookCard key={book.title} book={book} />)
                  )}
                </TabsContent>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}

