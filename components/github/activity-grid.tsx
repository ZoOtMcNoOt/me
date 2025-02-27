"use client"

import { useEffect, useState, useMemo, useRef, useCallback } from "react"
import { AlertTriangle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionTitle } from "@/components/layout/section-title"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

// Types
interface ActivityDay {
  date: string
  count: number
}

interface GitHubData {
  days: ActivityDay[]
  totalContributions: number
}

interface ProcessedData {
  weeks: (ActivityDay | null)[][]
  monthData: {
    names: string[]
    positions: number[]
  }
  firstDayOfWeek: number
}

export function ActivityGrid() {
  // State
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredDay, setHoveredDay] = useState<ActivityDay | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [isDesktop, setIsDesktop] = useState(true)

  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  // Constants
  const MAX_RETRIES = 3
  const CELL_SIZE = 10
  const YEAR_LENGTH = 364 // 52 weeks × 7 days

  // Helper functions
  const getFixedMonthLabels = useCallback(() => {
    // Show all 12 months in chronological order with even spacing
    const monthNames = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"]

    // Calculate positions evenly across the 52 weeks
    const positions = monthNames.map((_, index) => {
      // Each month gets approximately 4.3 weeks (52/12)
      return Math.round(index * (52 / 12))
    })

    return { names: monthNames, positions }
  }, [])

  const getDayLabels = useCallback((firstDayOfWeek: number) => {
    const allDayLabels = ["S", "M", "T", "W", "T", "F", "S"]

    // Shift the firstDayOfWeek forward by one to align with actual dates
    const adjustedFirstDay = (firstDayOfWeek + 1) % 7

    // If first day is Sunday (0), return as is
    if (adjustedFirstDay === 0) return allDayLabels

    // Otherwise, rotate the array to start with the correct day
    return [...allDayLabels.slice(adjustedFirstDay), ...allDayLabels.slice(0, adjustedFirstDay)]
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getActivityLevel = (count: number) => {
    if (count === 0) return "activity-cell-level-0"
    if (count <= 3) return "activity-cell-level-1"
    if (count <= 6) return "activity-cell-level-2"
    if (count <= 9) return "activity-cell-level-3"
    return "activity-cell-level-4"
  }

  // Process GitHub activity data
  const processData = useCallback(
    (rawData: GitHubData): ProcessedData => {
      // Initialize return structure
      const result: ProcessedData = {
        weeks: [],
        monthData: getFixedMonthLabels(),
        firstDayOfWeek: 0, // Default to Sunday
      }

      if (!rawData?.days?.length) return result

      // Determine the most recent date
      const dates = rawData.days.map((day) => new Date(day.date))
      const latestDate = new Date(Math.max(...dates.map((d) => d.getTime())))

      // Find the day of week for the latest date (0 = Sunday, 6 = Saturday)
      result.firstDayOfWeek = latestDate.getDay()

      // Get the most recent year of data
      let yearData = [...rawData.days]
      if (yearData.length > YEAR_LENGTH) {
        yearData = yearData.slice(-YEAR_LENGTH)
      } else if (yearData.length < YEAR_LENGTH) {
        // Pad with empty days if needed
        const emptyDays = Array(YEAR_LENGTH - yearData.length).fill(null)
        yearData = [...emptyDays, ...yearData]
      }

      // Create weeks grid - for a full year (52 weeks)
      result.weeks = Array.from({ length: 52 }, (_, weekIndex) => {
        const startIndex = weekIndex * 7
        const weekData = yearData.slice(startIndex, startIndex + 7)
        return weekData
      })

      return result
    },
    [getFixedMonthLabels],
  )

  // Process data when it changes
  const processedData = useMemo(() => {
    return data
      ? processData(data)
      : {
          weeks: [],
          monthData: getFixedMonthLabels(),
          firstDayOfWeek: 0,
        }
  }, [data, processData, getFixedMonthLabels])

  // Get the day labels based on processed data
  const dayLabels = useMemo(() => {
    return getDayLabels(processedData.firstDayOfWeek)
  }, [processedData.firstDayOfWeek, getDayLabels])

  // Rest of the component implementation...
  // [Previous implementation continues unchanged]

  // Fetch GitHub activity data
  useEffect(() => {
    const controller = new AbortController()

    async function fetchGitHubActivity() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch("/api/github-activity", {
          signal: controller.signal,
          headers: {
            "Cache-Control": "max-age=3600",
          },
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to fetch GitHub activity: ${response.status} ${errorText}`)
        }

        const responseData = await response.json()
        if (responseData.error) {
          throw new Error(responseData.error)
        }
        if (!responseData?.days?.length) {
          throw new Error("No activity data received")
        }

        // Sort data by date
        responseData.days.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setData(responseData)
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return // Ignore aborted requests
        }

        console.error("Error fetching GitHub activity:", err)
        const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
        setError(errorMessage)

        // Retry logic
        if (retryCount < MAX_RETRIES) {
          setTimeout(() => {
            setRetryCount((prev) => prev + 1)
          }, Math.pow(2, retryCount) * 1000) // Exponential backoff
        }
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubActivity()

    return () => {
      controller.abort()
    }
  }, [retryCount])

  // Check screen size on mount and on resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    // Initial check
    checkScreenSize()

    // Add resize listener
    window.addEventListener("resize", checkScreenSize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    }
  }, [])

  // Render loading state
  if (loading) {
    return (
      <div style={{ width: "100%", marginBottom: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <div
            style={{ height: "1rem", width: "8rem", background: "var(--muted)", borderRadius: "0.25rem" }}
            className="animate-pulse"
          />
          <div
            style={{ height: "1rem", width: "6rem", background: "var(--muted)", borderRadius: "0.25rem" }}
            className="animate-pulse"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", width: "fit-content", margin: "0 auto" }}>
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex", gap: "4px" }}>
              {Array.from({ length: 12 }).map((_, colIndex) => (
                <div
                  key={colIndex}
                  style={{
                    height: "10px",
                    width: "10px",
                    borderRadius: "2px",
                    background: "var(--muted-foreground)",
                    opacity: 0.2,
                    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    animationDelay: `${(rowIndex + colIndex) * 50}ms`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Render error state
  if (error) {
    return (
      <div
        style={{
          borderRadius: "0.5rem",
          border: "1px solid var(--destructive)",
          padding: "1.5rem",
          opacity: 0.7,
        }}
      >
        <div
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem", textAlign: "center" }}
        >
          <div style={{ borderRadius: "9999px", background: "rgba(var(--destructive), 0.1)", padding: "0.75rem" }}>
            <AlertTriangle style={{ height: "1.5rem", width: "1.5rem", color: "var(--destructive)" }} />
          </div>
          <div style={{ marginTop: "0.5rem" }}>
            <h3 style={{ fontSize: "0.875rem", fontWeight: "500", marginBottom: "0.5rem" }}>
              Unable to load GitHub activity
            </h3>
            <p style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>
              {error === "GitHub token is not configured"
                ? "GitHub integration is not properly configured. Please check your settings."
                : error}
            </p>
          </div>
          {retryCount < MAX_RETRIES && (
            <Button variant="outline" size="sm" onClick={() => setRetryCount((prev) => prev + 1)} className="gap-2">
              <RefreshCw style={{ height: "1rem", width: "1rem" }} />
              Try Again ({MAX_RETRIES - retryCount} attempts remaining)
            </Button>
          )}
        </div>
      </div>
    )
  }

  // Render no data state
  if (!data?.days?.length) {
    return (
      <div
        style={{
          borderRadius: "0.5rem",
          border: "1px solid var(--border)",
          padding: "1rem",
          color: "var(--muted-foreground)",
        }}
      >
        <p>No GitHub activity found.</p>
      </div>
    )
  }

  // Destructure processed data
  const { weeks, monthData } = processedData

  return (
    <section style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
      <div
        style={{
          width: "100%",
          maxWidth: "min(1400px, calc(100vw - var(--container-padding) * 2))",
          margin: "0 auto",
          padding: "0 1rem",
        }}
      >
        <SectionTitle id="activity">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginLeft: "auto", marginRight: "auto", textAlign: "left", marginBottom: "1.5rem" }}
            className="space-y-[var(--component-gap-md)]"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">GitHub Activity</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              My open source contributions and coding activity over the past year.
            </p>
          </motion.div>
        </SectionTitle>

        <div style={{ width: "100%" }} ref={containerRef}>
          {/* Mobile view */}
          <div style={{ display: isDesktop ? "none" : "block", maxHeight: "500px", margin: "0 auto", width: "100%" }}>
            <div style={{ position: "relative" }}>
              {/* Month labels for mobile - show only quarterly months */}
              <div
                style={{
                  paddingLeft: "2rem",
                  marginBottom: "0.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {monthData.names
                  .filter((_, i) => i % 3 === 0) // Show every third month
                  .slice(0, 4) // Limit to 4 labels for mobile
                  .map((month, i) => (
                    <div key={i} style={{ fontSize: "0.75rem", color: "var(--muted-foreground)" }}>
                      {month}
                    </div>
                  ))}
              </div>

              <div style={{ display: "flex" }}>
                {/* Weekday labels */}
                <div style={{ marginRight: "0.5rem", display: "flex", flexDirection: "column", gap: "2px" }}>
                  {dayLabels.map((day, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--muted-foreground)",
                        height: `${CELL_SIZE}px`,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Activity cells - mobile view */}
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {weeks.slice(-12).map((week, weekIndex) => (
                    <div
                      key={weekIndex}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                        width: `${100 / 12}%`,
                      }}
                    >
                      {week.map((day, dayIndex) => (
                        <div
                          key={`${weekIndex}-${dayIndex}`}
                          className={cn(
                            "activity-cell rounded-sm cursor-pointer",
                            day ? getActivityLevel(day.count) : "activity-cell-level-0",
                          )}
                          style={{
                            height: CELL_SIZE,
                            width: "100%",
                            minWidth: CELL_SIZE,
                            transition: "transform 0.1s ease-in-out",
                          }}
                          onMouseEnter={() => day && setHoveredDay(day)}
                          onMouseLeave={() => setHoveredDay(null)}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.25)"
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)"
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop view */}
          <div style={{ display: isDesktop ? "block" : "none", width: "100%" }}>
            {/* Month labels */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "2rem",
                paddingRight: "1rem",
                height: "1.25rem",
                marginBottom: "0.5rem",
                width: "100%",
              }}
            >
              {monthData.names.map((month, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {month}
                </div>
              ))}
            </div>

            <div style={{ display: "flex" }}>
              {/* Weekday labels */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2px",
                  marginRight: "0.5rem",
                  marginTop: "2px",
                }}
              >
                {dayLabels.map((day, index) => (
                  <div
                    key={index}
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--muted-foreground)",
                      height: `${CELL_SIZE}px`,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Activity grid */}
              <div
                style={{
                  display: "flex",
                  gap: "2px",
                  width: "100%",
                  position: "relative",
                }}
              >
                {weeks.map((week, weekIndex) => (
                  <div
                    key={weekIndex}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      width: `${100 / 52}%`,
                    }}
                  >
                    {week.map((day, dayIndex) => (
                      <div
                        key={`${weekIndex}-${dayIndex}`}
                        className={cn(
                          "activity-cell rounded-sm cursor-pointer",
                          day ? getActivityLevel(day.count) : "activity-cell-level-0",
                        )}
                        style={{
                          height: CELL_SIZE,
                          width: "100%",
                          minWidth: CELL_SIZE,
                          transition: "transform 0.1s ease-in-out",
                        }}
                        onMouseEnter={() => day && setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        onMouseOver={(e) => {
                          e.currentTarget.style.transform = "scale(1.25)"
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.transform = "scale(1)"
                        }}
                      />
                    ))}
                  </div>
                ))}

                {/* Tooltip */}
                {hoveredDay && (
                  <div
                    ref={tooltipRef}
                    style={{
                      position: "absolute",
                      top: "-30px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      zIndex: 50,
                      background: "var(--popover)",
                      padding: "0.25rem 0.5rem",
                      fontSize: "0.75rem",
                      borderRadius: "0.25rem",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                      pointerEvents: "none",
                    }}
                  >
                    {hoveredDay.count} contributions on {formatDate(hoveredDay.date)}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Legend and totals */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "1rem",
              marginTop: "1.5rem",
              fontSize: "0.875rem",
              color: "var(--muted-foreground)",
              paddingBottom: "2rem",
            }}
          >
            <div>Total Contributions: {data.totalContributions}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              Less
              <div style={{ display: "flex", gap: "2px" }}>
                {[0, 3, 6, 9, 12].map((level) => (
                  <div
                    key={level}
                    className={`rounded-sm ${getActivityLevel(level)}`}
                    style={{ height: 10, width: 10 }}
                  />
                ))}
              </div>
              More
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

