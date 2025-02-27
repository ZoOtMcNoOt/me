import type React from "react"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SectionTitle({ id, children, className }: SectionTitleProps) {
  return (
    <div id={id} className={cn("scroll-mt-16", className)}>
      {children}
    </div>
  )
}

