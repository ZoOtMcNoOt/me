"use client"

import { motion } from "framer-motion"
import { Book, Code, FlaskRoundIcon as Flask, GraduationCap, Heart, ShieldAlert } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { SectionTitle } from "@/components/layout/section-title"

// Interests array adjusted to remove neural engineering, add policy & broader healthcare tech
const interests = [
  {
    icon: Code,
    title: "Software Development",
    description:
      "Building scalable, high-impact applications for healthcare and research—bridging modern frameworks with patient-centric design.",
  },
  {
    icon: Flask,
    title: "Medical Devices",
    description:
      "Prototyping hardware solutions that integrate sensors, real-time data acquisition, and embedded systems to improve patient care.",
  },
  {
    icon: ShieldAlert,
    title: "Policy & Regulation",
    description:
      "Exploring how FDA guidelines, data privacy laws, and ethical frameworks shape innovation in digital health and biomedical devices.",
  },
  {
    icon: Book,
    title: "Research",
    description:
      "Investigating cutting-edge technologies at the intersection of AI, signal processing, and healthcare, striving for real-world impact.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Biomedical Engineering at Texas A&M, merging advanced technical coursework with healthcare applications.",
  },
  {
    icon: Heart,
    title: "Beyond Tech",
    description:
      "Cultivating passions in classical literature, social policy, and community outreach, balancing technical pursuits with social responsibility.",
  },
]

// Stats array remains flexible; update the values to match your actual achievements
const stats = [
  { label: "Projects Completed", value: "5+" },
  { label: "Technologies Used", value: "20+" },
  { label: "Years Coding", value: "6+" },
]

export default function About() {
  return (
    <section className="w-full py-16 overflow-x-hidden">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle id="about">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-left space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">About Me</h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Leveraging technology, policy, and innovation to transform healthcare.
            </p>
          </motion.div>
        </SectionTitle>

        <div className="mt-12 space-y-12">
          {/* Bio Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <AnimatedCard className="p-4 sm:p-6 md:p-8">
              <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
                <p className="text-base md:text-lg leading-relaxed">
                  As a Biomedical Engineering student at Texas A&amp;M University, I’m passionate about reshaping the
                  healthcare landscape through smart technology and thoughtful policy. My work ranges from prototyping
                  medical devices and embedded systems to exploring AI-driven data analysis for more efficient
                  diagnostics and treatment.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  I’m particularly fascinated by how regulatory frameworks and ethical considerations guide the
                  integration of novel solutions into real-world clinical environments. Whether it’s adhering to FDA
                  requirements, ensuring data privacy, or balancing patient needs with business innovation, I believe
                  that a holistic approach can truly elevate medical outcomes. Beyond academics, I stay involved in
                  open-source healthcare projects and community outreach, aiming to bridge technology, research, and
                  policy to ensure equitable and sustainable progress in healthcare.
                </p>
              </div>
            </AnimatedCard>
          </motion.div>

          {/* Interests Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {interests.map((interest, index) => (
              <motion.div
                key={interest.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex"
              >
                <AnimatedCard className="w-full p-4 md:p-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 text-primary">
                        <interest.icon className="h-4 w-4 md:h-5 md:w-5" />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base">{interest.title}</h3>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground">{interest.description}</p>
                  </div>
                </AnimatedCard>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Optionally limit overall width, then center inside */}
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-center">
                {/* Use w-fit so the grid only occupies as much width as needed */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-fit justify-items-center">
                  {stats.map((stat) => (
                    <AnimatedCard key={stat.label} className="w-full max-w-[200px] p-4 md:p-6">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="mt-1 md:mt-2 text-xs md:text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

