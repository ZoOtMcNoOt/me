"use client"

import { useRef, useEffect, useState } from "react"

interface DotWavesProps {
  theme?: string
}

export function ParallaxBackground({ theme = 'dark' }: DotWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })
  
  // Set up canvas and animation
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return
    
    // Set canvas to full screen size
    const updateSize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      
      // Set display size (css pixels)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      // Set actual size in memory (scaled for retina displays)
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      // Scale context to match dpr
      ctx.scale(dpr, dpr)
      
      setSize({ width, height })
    }
    
    // Initialize size
    updateSize()
    
    // Add resize listener
    window.addEventListener('resize', updateSize)
    
    // Create dots
    const spacing = 40
    const cols = Math.ceil(window.innerWidth / spacing)
    const rows = Math.ceil(window.innerHeight / spacing)
    
    const dots = []
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        dots.push({
          x: i * spacing,
          y: j * spacing,
          size: Math.random() * 1.2 + 0.8,
          speedX: Math.random() * 0.2 - 0.1,
          speedY: Math.random() * 0.2 - 0.1,
          offset: Math.random() * Math.PI * 2
        })
      }
    }
    
    // Define colors
    const colors = theme === 'dark' 
      ? ['rgba(79, 149, 255, 0.7)', 'rgba(183, 106, 255, 0.7)', 'rgba(255, 90, 173, 0.7)']
      : ['rgba(37, 99, 235, 0.7)', 'rgba(124, 58, 237, 0.7)', 'rgba(219, 39, 119, 0.7)']
    
    let animationId: number
    
    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1))
      
      const time = Date.now() * 0.001
      
      dots.forEach((dot) => {
        // Wave motion
        const waveX = Math.sin(time + dot.offset) * 15
        const waveY = Math.cos(time * 1.3 + dot.offset) * 15
        
        const x = dot.x + waveX
        const y = dot.y + waveY
        
        // Only draw dots in viewport
        if (x > -20 && x < window.innerWidth + 20 && y > -20 && y < window.innerHeight + 20) {
          const colorIndex = Math.floor((Math.sin(time + dot.offset) + 1) * 1.5) % 3
          
          ctx.beginPath()
          ctx.arc(x, y, dot.size, 0, Math.PI * 2)
          ctx.fillStyle = colors[colorIndex]
          ctx.fill()
        }
      })
      
      animationId = requestAnimationFrame(animate)
    }
    
    animationId = requestAnimationFrame(animate)
    
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateSize)
    }
  }, [theme])
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/30" />
    </div>
  )
}