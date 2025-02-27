"use client"

import { motion } from "framer-motion"
import { useEffect } from "react"

import { ParallaxBackground } from "@/components/effects/parallax-background"
import HeroSection from "@/components/home/hero-section"
import About from "@/components/home/about"
import Experience from "@/components/home/experience"
import Projects from "@/components/home/projects"
import { scrollToSection } from "@/lib/utils/navigation"
import { ActivityGrid } from "@/components/github/activity-grid"
import { DetailedSkills } from "@/components/skills/detailed-skills"
import { Contact } from "@/components/home/contact"
import { PageLayout, Section, SectionDivider } from "@/components/layout/page-layout"
import ClientParallaxBackground from "@/components/effects/parallax-background-client"

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash)
      }, 100)
    }
  }, [])

  return (
    <PageLayout>
      <ClientParallaxBackground />

      <div className="relative z-10">
        {/* Hero Section */}
        <Section id="home">
          <HeroSection />
          <SectionDivider />
        </Section>

        {/* About Section */}
        <Section id="about">
          <About />
          <SectionDivider />
        </Section>

        {/* Experience Section */}
        <Section id="experience">
          <Experience />
          <SectionDivider />
        </Section>

        {/* Projects Section */}
        <Section id="projects">
          <Projects />
          <SectionDivider />
        </Section>

        {/* Skills Section */}
        <Section id="skills">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-6"
          >
            <div className="mt-8">
              <DetailedSkills />
            </div>
          </motion.div>
          <SectionDivider />
        </Section>

        {/* Activity Section */}
        <Section id="activity">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl space-y-6"
          >
            <div className="mt-8">
              <ActivityGrid />
            </div>
          </motion.div>
          <SectionDivider />
        </Section>

        {/* Contact Section */}
        <Section id="contact">
          <Contact />
          <SectionDivider />
        </Section>
      </div>
    </PageLayout>
  )
}

