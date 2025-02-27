"use client"

import type * as React from "react"
import { motion, useMotionTemplate, useMotionValue } from "framer-motion"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function AnimatedCard({ children, className, ...props }: AnimatedCardProps) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      className={cn(
        "group relative rounded-xl overflow-hidden",
        "glass-panel",
        "w-full h-full",
        "flex flex-col",
        className,
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(59, 130, 246, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      {children}
    </div>
  )
}

// Export the component as default as well
export default AnimatedCard

