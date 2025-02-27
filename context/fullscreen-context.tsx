"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface FullscreenContextType {
  isFullscreen: boolean
  setIsFullscreen: (value: boolean) => void
}

const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined)

export function FullscreenProvider({ children }: { children: ReactNode }) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Optional: Sync with actual browser fullscreen state
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;
    
    // Fullscreen change handler
    const handleFullscreenChange = () => {
      const isDocumentFullscreen = document.fullscreenElement !== null;
      if (isFullscreen !== isDocumentFullscreen) {
        setIsFullscreen(isDocumentFullscreen);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [isFullscreen]);

  return <FullscreenContext.Provider value={{ isFullscreen, setIsFullscreen }}>{children}</FullscreenContext.Provider>
}

export function useFullscreen() {
  const context = useContext(FullscreenContext)
  if (context === undefined) {
    throw new Error("useFullscreen must be used within a FullscreenProvider")
  }
  return context
}

