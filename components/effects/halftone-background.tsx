"use client"

import { useRef, useEffect } from "react"

export default function HalftoneBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Set canvas size
    const setCanvasSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      ctx.scale(dpr, dpr)
    }
    
    // Initialize canvas
    setCanvasSize()
    window.addEventListener('resize', setCanvasSize)
    
    // Dot configuration
    const spacing = 35
    const cols = Math.ceil(window.innerWidth / spacing) + 4
    const rows = Math.ceil(window.innerHeight / spacing) + 4
    
    // Generate dot grid
    const dots = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          baseX: i * spacing - spacing,
          baseY: j * spacing - spacing,
          size: 1.1,
          phase: j * 0.2,  // Row-based phase for wave-like movement
        })
      }
    }
    
    // Animation
    const animate = (time: number) => {
      const timeInSeconds = time * 0.1
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))
      
      // Get appropriate color (handle both themes)
      const isDark = document.documentElement.classList.contains('dark')
      const dotColor = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(15, 23, 42, 0.35)'
      
      // Draw dots
      dots.forEach(dot => {
        // Create wave motion with multiple overlapping waves
        const waveX = Math.sin(timeInSeconds * 0.0012 + dot.baseY * 0.02 + dot.phase) * 15
        const waveY = Math.cos(timeInSeconds * 0.0009 + dot.baseX * 0.01 + dot.phase) * 10
        
        // Position with wave displacement
        const x = dot.baseX + waveX
        const y = dot.baseY + waveY
        
        // Skip dots outside viewport
        if (x < -spacing || x > window.innerWidth + spacing || 
            y < -spacing || y > window.innerHeight + spacing) {
          return
        }
        
        // Draw dot
        ctx.beginPath()
        ctx.arc(x, y, dot.size, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      })
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)
    
    // Cleanup
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}