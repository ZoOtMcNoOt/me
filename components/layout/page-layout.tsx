"use client"

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

interface SectionProps {
  children: ReactNode
  className?: string
}

interface SectionTitleProps {
  children: ReactNode
  id: string
  className?: string
}

export function Section({ children, className }: SectionProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen w-full",
        "flex flex-col items-center",
        "pt-24 pb-16",
        "gap-[var(--component-gap-lg)]",
        "overflow-hidden",
        className,
      )}
    >
      <div className="relative z-10 w-full max-w-[min(1400px,calc(100vw-var(--container-padding)*2))] mx-auto px-4 sm:px-6 lg:px-8 space-y-[var(--component-gap-md)]">
        {children}
      </div>
    </section>
  )
}

export function SectionTitle({ children, id, className }: SectionTitleProps) {
  return (
    <div id={id} className={cn("scroll-mt-16", className)}>
      {children}
    </div>
  )
}

export function SectionDivider() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
  )
}

