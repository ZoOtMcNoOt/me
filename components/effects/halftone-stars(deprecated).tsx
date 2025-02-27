"use client"

import { useRef, useEffect } from "react"

interface HalftoneWaveProps {
  theme?: string
}

export function HalftoneWave({ theme = 'dark' }: HalftoneWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  // Remove dimensions state which was causing the infinite loop
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    
    // Set canvas size with proper device pixel ratio handling
    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      ctx.scale(dpr, dpr)
      
      // Instead of setting state (which causes re-renders), store in refs
      // This fixes the infinite loop issue
      drawHalftonePattern(ctx, width, height)
    }
    
    // Create halftone pattern drawing function
    const drawHalftonePattern = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Create halftone dot grid with increased spacing
      const spacing = 40 // Increased from 28px to 40px for clearer pattern
      const cols = Math.ceil(width / spacing) + 4
      const rows = Math.ceil(height / spacing) + 4
      
      // Generate dot grid - do this once during setup
      const dots = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            baseX: i * spacing - spacing,
            baseY: j * spacing - spacing,
            size: 1.1, // Even smaller dots for more subtlety
            // Extremely slow wave speeds for a very gentle effect
            waves: [
              { frequency: 0.08, speed: 0.000008, amplitude: 12 },  // Much slower
              { frequency: 0.05, speed: 0.000010, amplitude: 8 },   // Much slower
              { frequency: 0.11, speed: 0.000007, amplitude: 10 }   // Much slower
            ],
            phase: Math.random() * Math.PI * 2
          })
        }
      }
      
      // Animation function
      const animate = (timestamp: number) => {
        // Get colors based on theme
        const colors = theme === 'dark' 
          ? { dot: 'rgba(255, 255, 255, 0.45)' } // Reduce opacity for subtlety
          : { dot: 'rgba(15, 23, 42, 0.35)' }    // Reduce opacity for subtlety
          
        // Clear canvas with transparent background
        context.clearRect(0, 0, width, height)
        
        const time = timestamp * 0.001 // Convert to seconds
        
        // Draw each dot in the grid
        dots.forEach(dot => {
          // Calculate displacement from multiple wave patterns
          let xDisplacement = 0
          let yDisplacement = 0
          
          dot.waves.forEach((wave, i) => {
            // Create different wave patterns with phase variations
            const waveOffset = dot.phase + (i * Math.PI / 3)
            const xFactor = Math.sin(
              time * wave.speed + 
              dot.baseX * wave.frequency + 
              dot.baseY * wave.frequency * 0.5 + 
              waveOffset
            )
            
            const yFactor = Math.cos(
              time * wave.speed * 1.2 + 
              dot.baseY * wave.frequency + 
              dot.baseX * wave.frequency * 0.3 + 
              waveOffset
            )
            
            xDisplacement += xFactor * wave.amplitude
            yDisplacement += yFactor * wave.amplitude
          })
          
          // Calculate final position with wave displacement
          const x = dot.baseX + xDisplacement
          const y = dot.baseY + yDisplacement
          
          // Only draw dots in viewport (with margin)
          if (x > -spacing && x < width + spacing && 
              y > -spacing && y < height + spacing) {
            
            // Draw dot
            context.beginPath()
            context.arc(x, y, dot.size, 0, Math.PI * 2)
            context.fillStyle = colors.dot
            context.fill()
          }
        })
        
        animationRef.current = requestAnimationFrame(animate)
      }
      
      // Start animation
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(animate)
    }
    
    updateSize()
    window.addEventListener('resize', updateSize)
    
    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', updateSize)
    }
  }, [theme]) // Only depend on theme, not dimensions
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20 pointer-events-none" />
    </div>
  )
}