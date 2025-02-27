"use client"

import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion"
import { useRef, useEffect, useState, useMemo } from "react"

interface MousePosition {
  x: number
  y: number
}

interface DeviceOrientation {
  beta: number | null
  gamma: number | null
}

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  speed: number
  angle: number
}

export function ParallaxBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientation>({ beta: null, gamma: null })
  const [hasDeviceOrientation, setHasDeviceOrientation] = useState(false)
  const animationFrameId = useRef<number>()
  const particles = useRef<Particle[]>([])
  const lastTime = useRef<number>(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Smooth scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // Color transitions based on scroll
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    ["hsl(222.2 84% 4.9%)", "hsl(222.2 84% 3.9%)", "hsl(222.2 84% 2.9%)"],
  )

  // Particle colors based on scroll
  const particleColors = useMemo(
    () => [
      { r: 59, g: 130, b: 246 }, // Blue
      { r: 139, g: 92, b: 246 }, // Purple
      { r: 236, g: 72, b: 153 }, // Pink
    ],
    [],
  )

  // Initialize particles
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight * 3 // Triple height for scrolling
    }
    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Create initial particles
    particles.current = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      color: `rgb(${particleColors[i % 3].r}, ${particleColors[i % 3].g}, ${particleColors[i % 3].b})`,
      speed: Math.random() * 0.5 + 0.2,
      angle: Math.random() * Math.PI * 2,
    }))

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [particleColors])

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (currentTime: number) => {
      if (!lastTime.current) lastTime.current = currentTime
      const deltaTime = currentTime - lastTime.current
      lastTime.current = currentTime

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle) => {
        // Update position
        particle.x += Math.cos(particle.angle) * particle.speed
        particle.y += Math.sin(particle.angle) * particle.speed

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Mouse/device influence
        const dx = mousePosition.x - particle.x
        const dy = mousePosition.y - particle.y + window.scrollY
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (1 - distance / maxDistance) * 0.02
          particle.x -= dx * force
          particle.y -= dy * force
        }

        // Draw particle with gradient
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size)
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, "transparent")

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()
      })

      // Draw connections
      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const dx = particles.current[i].x - particles.current[j].x
          const dy = particles.current[i].y - particles.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particles.current[i].x, particles.current[i].y)
            ctx.lineTo(particles.current[j].x, particles.current[j].y)
            ctx.stroke()
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate)
    }

    animationFrameId.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [mousePosition])

  // Handle mouse/touch movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY })
      }
    }

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta !== null && e.gamma !== null) {
        setHasDeviceOrientation(true)
        setDeviceOrientation({
          beta: (e.beta / 180) * 30,
          gamma: (e.gamma / 90) * 30,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)
    window.addEventListener("deviceorientation", handleDeviceOrientation)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("deviceorientation", handleDeviceOrientation)
    }
  }, [])

  return (
    <div ref={ref} className="fixed inset-0 -z-10">
      {/* Dynamic background color */}
      <motion.div className="absolute inset-0 transition-colors duration-300" style={{ backgroundColor }} />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
        style={{
          transform: `translateY(${-window.scrollY}px)`,
          willChange: "transform",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Mouse movement gradient */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          background: useMotionTemplate`radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
          willChange: "background",
        }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          transform: "translateZ(0)",
        }}
      />
    </div>
  )
}

