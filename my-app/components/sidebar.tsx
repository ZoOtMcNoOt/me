"use client"
import { Activity, Book, Brain, Code, FileText, Github, Home, Linkedin, Mail, Menu, Music, X } from "lucide-react"
import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { formatHashLink, isHashLink, scrollToSection } from "@/lib/navigation"
import { useFullscreen } from "@/lib/fullscreen-context"

const mainLinks = [
  { name: "Home", href: "#home", icon: Home },
  { name: "Experience", href: "#experience", icon: Activity },
  { name: "Projects", href: "#projects", icon: Code },
  { name: "Skills", href: "#skills", icon: Brain },
  { name: "Activity", href: "#activity", icon: Github },
]

const personalLinks = [
  { name: "Notes", href: "/notes", icon: FileText },
  { name: "Reading", href: "/reading", icon: Book },
  { name: "Music", href: "/music", icon: Music },
]

const socialLinks = [
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Email", href: "mailto:example@email.com", icon: Mail },
]

export function Sidebar() {
  const pathname = usePathname()
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isFullscreen } = useFullscreen()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Handle scroll events to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = mainLinks.map((item) => item.href.replace("#", ""))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Set initial active section
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash) {
      setActiveSection(hash)
      // Initial scroll if hash is present
      setTimeout(() => {
        scrollToSection(hash)
      }, 100)
    }
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isMobileMenuOpen && !target.closest("[data-sidebar]")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [isMobileMenuOpen])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHashLink(href)) {
      e.preventDefault()
      const sectionId = href.replace(/^\/?#/, "")
      scrollToSection(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  if (isFullscreen) {
    return null
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed left-4 top-4 z-50 lg:hidden",
          "h-9 w-9 rounded-lg border border-[hsl(var(--glass-border))]",
          "bg-[hsl(var(--glass-bg))] backdrop-blur-[var(--glass-backdrop)]",
        )}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        data-sidebar="trigger"
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        <span className="sr-only">Toggle menu</span>
      </Button>

      {/* Sidebar */}
      <aside
        data-sidebar="main"
        className={cn(
          "peer fixed left-0 top-0 z-40 h-screen w-[var(--sidebar-width)]",
          "backdrop-blur-md bg-background/75 border-r border-border/10",
          "transition-transform duration-[var(--transition-duration)]",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col gap-6 p-4 pt-16 lg:pt-4">
          <div className="flex items-center gap-2 px-2 py-4 border-b border-[hsl(var(--glass-border))]">
            <Link
              href="#home"
              onClick={(e) => handleClick(e, "#home")}
              className="text-lg font-bold hover:text-primary"
            >
              Grant McNatt
            </Link>
          </div>

          <nav className="flex flex-col gap-6">
            <div>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">NAVIGATION</div>
              <div className="flex flex-col gap-1">
                {mainLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={formatHashLink(link.href)}
                    onClick={(e) => handleClick(e, link.href)}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-2 py-1.5",
                      "text-sm font-medium text-muted-foreground",
                      "transition-colors hover:bg-accent hover:text-accent-foreground",
                      "relative after:absolute after:inset-0 after:rounded-lg after:opacity-0",
                      "after:transition-opacity hover:after:opacity-100",
                      activeSection === link.href.replace("#", "") &&
                        "bg-accent text-accent-foreground after:opacity-100",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">PERSONAL</div>
              <div className="flex flex-col gap-1">
                {personalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "group flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === link.href && "bg-accent text-accent-foreground",
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto pt-6 border-t border-[hsl(var(--glass-border))]">
            <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">SOCIAL</div>
            <div className="flex items-center justify-between px-4 py-2">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 z-30",
            "bg-background/80 backdrop-blur-sm lg:hidden",
            "transition-opacity duration-[var(--transition-duration)]",
            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
          )}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

