"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { AnimatedName } from "./animated-name"
import { Button } from "@/components/ui/button"
import { scrollToSection } from "@/lib/utils/navigation"
import { SectionTitle } from "@/components/layout/section-title"

export default function HeroSection() {
  return (
    <SectionTitle id="home">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 sm:gap-12 pb-8 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          className="relative w-full max-w-[240px] lg:max-w-[320px] aspect-[4/5]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl animate-pulse" />
          <div className="relative w-full h-full overflow-hidden rounded-2xl border-2 border-gray-800 shadow-2xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cs5MkJyjesjSnjaOj4HbFM9IqbT2J8.png"
              alt="Profile"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 768px) 300px, 400px"
            />
          </div>
        </motion.div>
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left pt-4 sm:pt-8 flex-1">
          <AnimatedName />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-gray-400 max-w-[90vw] sm:max-w-[600px] px-4 sm:px-0"
          >
            Biomedical Engineering Student & Software Developer crafting innovative solutions at the intersection of
            healthcare and technology.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0"
          >
            <Button onClick={() => scrollToSection("contact")} className="w-full sm:w-auto">
              Contact Me
            </Button>
            <Button variant="outline" className="w-full sm:w-auto">
              View Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </SectionTitle>
  )
}

