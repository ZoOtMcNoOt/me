import type React from "react"
import "@/styles/globals.css"
import {
  Monoton,
  Rubik_Glitch,
  Major_Mono_Display,
  Megrim,
  Fira_Code,
  Space_Grotesk,
  JetBrains_Mono,
} from "next/font/google"
import { cn } from "@/lib/utils"
import { Providers } from "@/components/providers"
import { Sidebar } from "@/components/layout/sidebar"
import { FullscreenProvider } from "@/context/fullscreen-context"

// Google fonts configuration
const monoton = Monoton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-monoton",
})

const rubikGlitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik-glitch",
})

const majorMonoDisplay = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-major-mono-display",
})

const megrim = Megrim({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-megrim",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata = {
  title: "Grant McNatt - Portfolio",
  description: "Biomedical Engineering Student & Software Developer",
    generator: 'v0.dev'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen font-sans antialiased overflow-x-hidden",
          monoton.variable,
          rubikGlitch.variable,
          majorMonoDisplay.variable,
          megrim.variable,
          firaCode.variable,
          spaceGrotesk.variable,
          jetbrainsMono.variable,
        )}
      >
        <FullscreenProvider>
          <Providers>
            <div className="relative flex min-h-screen flex-col">
              <Sidebar />
              <main
                className={cn(
                  "flex-1 w-full",
                  "transition-[padding] duration-[var(--transition-duration)]",
                  "lg:pl-[var(--sidebar-width)]",
                  "peer-data-[state=collapsed]:lg:pl-0",
                )}
              >
                {children}
              </main>
            </div>
          </Providers>
        </FullscreenProvider>
      </body>
    </html>
  )
}

