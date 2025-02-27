"use client"

import { motion, useAnimation } from "framer-motion"
import { useCallback, useState, useEffect, useMemo, useRef } from "react"
import Particles from "react-particles"
import type { Container, Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faBrain, faDna, faHeartPulse } from "@fortawesome/free-solid-svg-icons"
import { Orbitron, Audiowide, Syncopate, Major_Mono_Display } from "next/font/google"
import { useReducedMotion } from "framer-motion"

// Font definitions
const orbitronFont = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const audiowideFont = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
})

const syncopateFont = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
})

const majorMonoFont = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-major-mono",
})

// Font references
const fonts = {
  orbitron: orbitronFont.className,
  audiowide: audiowideFont.className,
  syncopate: syncopateFont.className,
  majorMono: majorMonoFont.className,
}

// Animation configurations
const TRANSITION_DURATION = 0.3
const ROTATION_INTERVAL = 5000 

// Identity states with matching colors
const nameStates = [
  {
    font: fonts.orbitron,
    style: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500",
    animation: { scale: 1.05, rotateZ: 0 },
    description: "BIOMEDICAL ENGINEER",
    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    icon: faDna,
    subtitleStyle: `${fonts.orbitron} tracking-[0.5em] text-blue-400/80`,
    color: "blue-500",
    particleColors: ["#3B82F6", "#06B6D4", "#0EA5E9"],
  },
  {
    font: fonts.audiowide,
    style: "text-emerald-400",
    animation: { scale: 0.98, rotateZ: 0 },
    description: "FULL STACK DEV",
    textShadow: "2px 2px #059669, -1px -1px #065f46",
    icon: faCode,
    subtitleStyle: `${fonts.syncopate} tracking-widest text-emerald-500/80`,
    color: "emerald-400",
    particleColors: ["#059669", "#10B981", "#34D399"],
  },
  {
    font: fonts.majorMono,
    style: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    animation: { scale: 1.02, rotateZ: 0 },
    description: "ML RESEARCHER",
    textShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
    icon: faBrain,
    subtitleStyle: `${fonts.orbitron} tracking-[0.25em] text-purple-400`,
    color: "purple-500",
    particleColors: ["#A855F7", "#EC4899", "#F97316"],
  },
  {
    font: fonts.syncopate,
    style: "text-amber-400",
    animation: { scale: 0.95, rotateZ: 0 },
    description: "MEDICAL TECH",
    textShadow: "0 0 15px rgba(251, 191, 36, 0.4)",
    icon: faHeartPulse,
    subtitleStyle: `${fonts.audiowide} tracking-[0.3em] text-amber-500/80`,
    color: "amber-400",
    particleColors: ["#F59E0B", "#FBBF24", "#FCD34D"],
  },
]

export function AnimatedName() {
  const [currentState, setCurrentState] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const controls = useAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()
  
  // Generic spring transition configuration
  const springTransition = useMemo(
    () => ({
      duration: shouldReduceMotion ? 0.1 : TRANSITION_DURATION,
      type: "spring",
      stiffness: 300,
      damping: 20,
    }),
    [shouldReduceMotion],
  )

  // Handle state transitions
  const transitionToNextState = useCallback(
    async (nextState = null) => {
      const nextStateIndex = nextState !== null ? nextState : (currentState + 1) % nameStates.length
      await controls.start({
        ...nameStates[nextStateIndex].animation,
        transition: springTransition,
      })
      setCurrentState(nextStateIndex)
    },
    [currentState, controls, springTransition],
  )

  // Auto-rotate states effect
  useEffect(() => {
    const interval = setInterval(() => {
      transitionToNextState()
    }, ROTATION_INTERVAL)

    return () => clearInterval(interval)
  }, [transitionToNextState])

  // Init particles
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Container is available here if needed in the future
  }, [])

  // Handle user click to manually change state
  const handleClick = () => {
    const nextState = (currentState + 1) % nameStates.length
    transitionToNextState(nextState)
  }

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleClick()
    }
  }

  // Dynamic particle options based on current state theme
  const particleOptions = useMemo(
    () => ({
      fullScreen: false,
      style: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: -1,
      },
      particles: {
        number: {
          value: shouldReduceMotion ? 5 : 20, // Use proper particle count and respect reduced motion
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: nameStates[currentState].particleColors,
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 1,
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 0,
            sync: false,
          },
        },
        size: {
          value: isHovered ? 7 : 6,
          random: { enable: true, minimumValue: 2 },
          animation: {
            enable: true,
            speed: 20,
            minimumValue: 0.1,
            sync: false,
          },
        },
        life: {
          duration: {
            value: 2,
          },
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 9.81,
          },
          speed: 15,
          direction: "outside",
          random: false,
          straight: false,
          outModes: {
            default: "destroy",
            bottom: "destroy",
            left: "destroy",
            right: "destroy",
            top: "destroy",
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
      responsive: [
        {
          maxWidth: 768,
          options: {
            particles: {
              number: {
                value: shouldReduceMotion ? 3 : 12,
              },
            },
          },
        },
      ],
    }),
    [currentState, isHovered, shouldReduceMotion],
  )

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Render a placeholder during server rendering to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="relative w-full">
        <div className="flex flex-col items-center lg:items-start">
          <div className="h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] flex items-center justify-center lg:justify-start">
            <h1 className="cursor-pointer select-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Grant McNatt
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="relative w-full"
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Particles container */}
      {!shouldReduceMotion && (
        <div className="absolute inset-0 h-36 sm:h-48 md:h-56 lg:h-36">
          <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={particleOptions}
            className="absolute inset-0"
          />
        </div>
      )}

      {/* Content container - fixed height to prevent jumping */}
      <div className="flex flex-col items-center lg:items-start">
        {/* Wrapper div with fixed height to maintain consistent space */}
        <div className="h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] xl:h-[100px] flex items-center justify-center lg:justify-start">
          <motion.h1
            animate={controls}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            initial={nameStates[0].animation}
            className={`cursor-pointer select-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
              ${nameStates[currentState].font} ${nameStates[currentState].style}
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50`}
            style={{
              textShadow: nameStates[currentState].textShadow,
              // Remove letterSpacing variation to maintain consistent width
              transformOrigin: "center center",
              willChange: "transform",
            }}
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.2 },
            }}
            tabIndex={0}
            role="button"
            aria-label={`Grant McNatt - ${nameStates[currentState].description}. Click to change role.`}
          >
            Grant McNatt
          </motion.h1>
        </div>

        {/* Subtitle with consistently styled animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          key={currentState}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 mt-1 sm:mt-2"
        >
          <motion.div
            initial={{ rotate: -20, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: "backOut" }}
          >
            <FontAwesomeIcon
              icon={nameStates[currentState].icon}
              className="h-4 w-4"
              style={{
                color: nameStates[currentState].style.includes("gradient")
                  ? "#9CA3AF"
                  : nameStates[currentState].style.match(/text-([a-z-]+\d+)/)?.[1] || "#9CA3AF",
              }}
              aria-hidden="true"
            />
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={nameStates[currentState].description}
            className={`text-[10px] sm:text-xs md:text-sm ${nameStates[currentState].subtitleStyle}`}
          >
            {nameStates[currentState].description}
          </motion.span>
        </motion.div>
      </div>
    </div>
  )
}

