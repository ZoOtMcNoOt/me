"\"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface PageLayoutProps {
  children: ReactNode
  className?: string
  fullWidth?: boolean
}

export function PageLayout({ children, className, fullWidth = false }: PageLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen w-full flex-col",
        "transition-[width,padding] duration-300",
        "overflow-x-hidden",
        className,
      )}
    >
      <main className={cn("flex-1 w-full", !fullWidth && "px-4 py-4 sm:px-6 sm:py-8")}>{children}</main>
    </div>
  )
}

