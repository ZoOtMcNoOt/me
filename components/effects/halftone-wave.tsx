"use client"

import { useRef, useEffect } from "react"

interface HalftoneWaveProps {
  theme?: string
}

export function HalftoneWave({ theme = 'dark' }: HalftoneWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
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
      
      setupWaveAnimation(ctx, width, height)
    }
    
    // Create halftone pattern animation
    const setupWaveAnimation = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Create halftone dot grid with proper spacing
      const spacing = 40 // Spacing between dots
      const cols = Math.ceil(width / spacing) + 4
      const rows = Math.ceil(height / spacing) + 4
      
      // Generate dot grid
      const dots = []
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            baseX: i * spacing - spacing,
            baseY: j * spacing - spacing,
            size: 1.1, // Small dots as requested
            // 10X FASTER SPEEDS as requested
            waves: [
              // Primary horizontal wave - more visible
              { frequency: 0.02, speed: 0.012, amplitude: 15 },  // 10x faster
              // Secondary diagonal wave
              { frequency: 0.03, speed: 0.009, amplitude: 10 },  // 10x faster
              // Subtle variation wave
              { frequency: 0.04, speed: 0.015, amplitude: 8 }    // 10x faster
            ],
            // Group phase by rows to create more visible wave fronts
            phase: j * 0.2
          })
        }
      }
      
      // Animation function
      const animate = (timestamp: number) => {
        // Get colors based on theme
        const colors = theme === 'dark' 
          ? { dot: 'rgba(255, 255, 255, 0.48)' }
          : { dot: 'rgba(15, 23, 42, 0.38)' }
          
        // Clear canvas with transparent background
        context.clearRect(0, 0, width, height)
        
        const time = timestamp * 0.001 // Convert to seconds
        
        // Draw each dot in the grid
        dots.forEach(dot => {
          // Calculate displacement from wave patterns
          let xDisplacement = 0
          let yDisplacement = 0
          
          // Primary wave - horizontal movement for clear wave pattern
          const primaryWave = dot.waves[0]
          const primaryDisplacement = Math.sin(
            time * primaryWave.speed + 
            dot.baseY * primaryWave.frequency + 
            dot.phase
          ) * primaryWave.amplitude
          
          // Secondary wave - diagonal movement
          const secondaryWave = dot.waves[1]
          const secondaryDisplacement = Math.sin(
            time * secondaryWave.speed + 
            dot.baseX * secondaryWave.frequency * 0.5 + 
            dot.baseY * secondaryWave.frequency * 0.5 + 
            dot.phase
          ) * secondaryWave.amplitude
          
          // Variation wave - adds subtle complexity
          const variationWave = dot.waves[2]
          const variationX = Math.sin(
            time * variationWave.speed * 0.7 + 
            dot.baseX * variationWave.frequency + 
            dot.phase * 0.5
          ) * variationWave.amplitude * 0.5
          
          const variationY = Math.cos(
            time * variationWave.speed * 0.8 + 
            dot.baseY * variationWave.frequency + 
            dot.phase * 0.3
          ) * variationWave.amplitude * 0.5
          
          // Combine wave effects
          xDisplacement = primaryDisplacement * 0.3 + secondaryDisplacement * 0.7 + variationX
          yDisplacement = primaryDisplacement * 0.7 + secondaryDisplacement * 0.3 + variationY
          
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
  }, [theme])
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/20 pointer-events-none" />
    </div>
  )
}