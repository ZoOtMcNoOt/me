"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from "lucide-react"

interface ActivityDay {
  date: string
  count: number
}

interface GitHubData {
  days: ActivityDay[]
  totalContributions: number
}

export function ActivityGrid() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const maxRetries = 3

  useEffect(() => {
    async function fetchGitHubActivity() {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("/api/github-activity")
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub activity: ${response.statusText}`)
        }
        const data = await response.json()
        if (data.error) {
          throw new Error(data.error)
        }
        setData(data)
      } catch (err) {
        console.error("Error fetching GitHub activity:", err)
        setError(err instanceof Error ? err.message : "Failed to load activity data")
        // Retry logic
        if (retryCount < maxRetries) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1)
          }, Math.pow(2, retryCount) * 1000) // Exponential backoff
        }
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubActivity()
  }, [retryCount]) // Add retryCount to dependencies

  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-muted hover:bg-muted/80"
    if (count <= 3) return "bg-primary/30 hover:bg-primary/40"
    if (count <= 6) return "bg-primary/50 hover:bg-primary/60"
    if (count <= 9) return "bg-primary/70 hover:bg-primary/80"
    return "bg-primary hover:bg-primary/90"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse flex justify-between items-center">
          <div className="h-4 w-32 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>
        {/* Mobile loading state */}
        <div className="block md:hidden">
          <div className="grid grid-flow-row gap-1">
            {Array.from({ length: 52 }).map((_, weekIndex) => (
              <div key={weekIndex} className="grid grid-flow-col gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="h-3 w-3 rounded-sm bg-muted/50" />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop loading state */}
        <div className="hidden md:block">
          <div className="grid grid-flow-col gap-1 auto-cols-fr">
            {Array.from({ length: 52 }).map((_, weekIndex) => (
              <div key={weekIndex} className="grid gap-1">
                {Array.from({ length: 7 }).map((_, dayIndex) => (
                  <div key={dayIndex} className="h-3 w-3 rounded-sm bg-muted/50" />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="rounded-full bg-destructive/10 p-3">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Unable to load GitHub activity</h3>
            <p className="text-sm text-muted-foreground">
              {error === "GitHub token is not configured"
                ? "GitHub integration is not properly configured. Please check your settings."
                : "There was a problem loading your GitHub activity. Please try again."}
            </p>
          </div>
          {retryCount < maxRetries && (
            <Button variant="outline" size="sm" onClick={() => setRetryCount((prev) => prev + 1)} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </div>
      </div>
    )
  }

  if (!data?.days.length) {
    return (
      <div className="rounded-lg border p-4 text-muted-foreground">
        <p>No GitHub activity found.</p>
      </div>
    )
  }

  // Create a 7x52 grid of the last year's contributions
  const weeks = Array.from({ length: 52 }, (_, weekIndex) => {
    const weekData = data.days.slice(weekIndex * 7, (weekIndex + 1) * 7)
    return weekData
  })

  return (
    <div className="space-y-8 w-full max-w-full px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
      {" "}
      {/* Increased spacing */}
      <div className="relative w-full pb-8">
        {" "}
        {/* Increased bottom padding */}
        <div className="relative">
          {/* Mobile: Vertical layout */}
          <div className="block md:hidden">
            <div className="grid grid-flow-row gap-2 w-full max-w-full place-content-center">
              {" "}
              {/* Increased gap */}
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid grid-cols-7 gap-2 w-fit">
                  {" "}
                  {/* Increased gap */}
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 rounded-sm transition-colors ${day ? getActivityColor(day.count) : "bg-muted"}`}
                      onMouseEnter={() => day && setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Horizontal layout */}
          <div className="hidden md:block w-full">
            <div className="grid grid-flow-col gap-1 auto-cols-fr w-full">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="grid gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`h-3 w-3 rounded-sm transition-colors ${day ? getActivityColor(day.count) : "bg-muted"}`}
                      onMouseEnter={() => day && setHoveredDay(day)}
                      onMouseLeave={() => setHoveredDay(null)}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {hoveredDay && (
            <div className="pointer-events-none absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-full rounded-lg bg-popover px-2 py-1 text-xs">
              {hoveredDay.count} contributions on {formatDate(hoveredDay.date)}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>Total Contributions: {data.totalContributions}</div>
        <div className="flex items-center gap-2">
          Less
          <div className="flex gap-1">
            {[0, 3, 6, 9, 12].map((level) => (
              <div key={level} className={`h-3 w-3 rounded-sm ${getActivityColor(level)}`} />
            ))}
          </div>
          More
        </div>
      </div>
    </div>
  )
}

