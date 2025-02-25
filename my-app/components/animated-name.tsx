"use client"

import { motion, useAnimation } from "framer-motion"
import { useCallback, useState } from "react"
import Particles from "react-particles"
import type { Container, Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCode, faMicrochip, faAtom, faDna } from "@fortawesome/free-solid-svg-icons"
import { Rubik_Glitch, Orbitron, Audiowide, Syncopate, Major_Mono_Display } from "next/font/google"

const glitch = Rubik_Glitch({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-glitch",
})

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
})

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
})

const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-syncopate",
})

const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-major-mono",
})

const nameStates = [
  {
    font: glitch.className,
    style: "text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500",
    animation: { scale: 1.05 },
    description: "BIOENGINEERING",
    textShadow: "0 0 20px rgba(59, 130, 246, 0.5)",
    icon: faCode,
    subtitleStyle: `${orbitron.className} tracking-[0.5em] text-blue-400/80`,
  },
  {
    font: audiowide.className,
    style: "text-emerald-400",
    animation: { scale: 0.98 },
    description: "FULL STACK DEV",
    textShadow: "2px 2px #059669, -1px -1px #065f46",
    icon: faMicrochip,
    subtitleStyle: `${syncopate.className} tracking-widest text-emerald-500/80`,
  },
  {
    font: majorMono.className,
    style: "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500",
    animation: { scale: 1.02 },
    description: "ML RESEARCHER",
    textShadow: "0 0 30px rgba(168, 85, 247, 0.4)",
    icon: faAtom,
    subtitleStyle: `${orbitron.className} tracking-[0.25em] text-purple-400`,
  },
  {
    font: syncopate.className,
    style: "text-amber-400",
    animation: { scale: 0.95 },
    description: "MEDICAL TECH",
    textShadow: "0 0 15px rgba(251, 191, 36, 0.4)",
    icon: faDna,
    subtitleStyle: `${audiowide.className} tracking-[0.3em] text-amber-500/80`,
  },
]

export default function AnimatedName() {
  const [currentState, setCurrentState] = useState(0)
  const controls = useAnimation()

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    // Optional: You can access the container here if needed
  }, [])

  const handleClick = async () => {
    const nextState = (currentState + 1) % nameStates.length
    const currentAnimation = nameStates[nextState].animation

    await controls.start({
      ...currentAnimation,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    })

    setCurrentState(nextState)
  }

  return (
    <div className="relative w-full px-4">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: false,
          style: {
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
          },
          particles: {
            number: {
              value: 0,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: ["#BD10E0", "#B8E986", "#50E3C2", "#FFD300", "#E86363"],
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
              value: 8,
              random: { enable: true, minimumValue: 4 },
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
              speed: 20,
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
            detect_on: "window",
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: false,
              },
            },
          },
          detectRetina: true,
        }}
      />
      <div className="flex flex-col items-center gap-4 transform-gpu">
        <motion.h1
          animate={controls}
          onClick={handleClick}
          className={`cursor-pointer select-none text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl ${nameStates[currentState].font} ${nameStates[currentState].style}`}
          style={{
            textShadow: nameStates[currentState].textShadow,
            letterSpacing: nameStates[currentState].font.includes("monoton") ? "0.1em" : "normal",
            transformOrigin: "center center",
            willChange: "transform",
          }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.2 },
          }}
        >
          Grant McNatt
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.3,
            staggerChildren: 0.1,
          }}
          className="flex items-center gap-2"
        >
          <FontAwesomeIcon
            icon={nameStates[currentState].icon}
            className="h-4 w-4"
            style={{
              color: nameStates[currentState].style.includes("gradient")
                ? "#9CA3AF"
                : nameStates[currentState].style.match(/text-([a-z-]+\d+)/)?.[1] || "#9CA3AF",
            }}
          />
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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

