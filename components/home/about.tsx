"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Book, Code, FlaskRoundIcon as Flask, GraduationCap, Heart, ShieldAlert, Coffee, ChevronDown } from "lucide-react"
import { AnimatedCard } from "@/components/ui/animated-card"
import { Section, SectionTitle } from "@/components/layout/page-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar } from "@/components/ui/avatar"
import Image from "next/image"

// Interest categories
const interests = [
  {
    icon: Code,
    title: "Software Development",
    description: "Building scalable, high-impact applications for healthcare and research—bridging modern frameworks with patient-centric design.",
  },
  {
    icon: Flask,
    title: "Medical Devices",
    description: "Prototyping hardware solutions that integrate sensors, real-time data acquisition, and embedded systems to improve patient care.",
  },
  {
    icon: ShieldAlert,
    title: "Policy & Regulation",
    description: "Exploring how FDA guidelines, data privacy laws, and ethical frameworks shape innovation in digital health and biomedical devices.",
  },
  {
    icon: Book,
    title: "Research",
    description: "Investigating cutting-edge technologies at the intersection of AI, signal processing, and healthcare, striving for real-world impact.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description: "Biomedical Engineering at Texas A&M, merging advanced technical coursework with healthcare applications.",
  },
  {
    icon: Heart,
    title: "Beyond Tech",
    description: "Cultivating passions in classical literature, social policy, and community outreach, balancing technical pursuits with social responsibility.",
  },
]

const stats = [
  { label: "Projects Completed", value: "5+" },
  { label: "Technologies Used", value: "20+" },
  { label: "Years Coding", value: "6+" },
]

// Journey milestones
const journeyMilestones = [
  {
    year: "Early Years",
    title: "First Computer",
    description: "Got my first computer and spent hours figuring out how it worked. I was fascinated by how technology could solve real-world problems."
  },
  {
    year: "High School",
    title: "Coding Awakening",
    description: "Started teaching myself programming. The satisfaction of building something functional from scratch became my driving motivation."
  },
  {
    year: "College",
    title: "Finding My Path",
    description: "Joined Texas A&M's Biomedical Engineering program. Discovered how computing can transform healthcare delivery."
  },
  {
    year: "Today",
    title: "Continuous Learning",
    description: "Balancing coursework with personal projects that bridge the gap between technology and healthcare applications."
  }
]

// Personal interests for the "Beyond Work" tab
const personalInterests = [
  { emoji: "📚", interest: "Science fiction novels (currently re-reading The Expanse series)" },
  { emoji: "🧠", interest: "Learning about neuroscience and consciousness" },
  { emoji: "🌲", interest: "Hiking and spending time outdoors" },
  { emoji: "☕", interest: "Finding the perfect cup of coffee" },
]

// Bio Component with Expandable content
const BiographySection = () => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <AnimatedCard className="p-4 sm:p-6 md:p-8 relative overflow-hidden">
      <div className="prose prose-gray dark:prose-invert max-w-none space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          {/* Optional: Add a small avatar image here */}
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-primary">
            {/* Replace with your actual image path */}
            {/* <Image src="/images/avatar.jpg" alt="Grant" fill className="object-cover" /> */}
            <div className="bg-primary/20 h-full w-full flex items-center justify-center">
              <span className="text-2xl">G</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-1">Hey, I'm Grant</h3>
            <p className="text-sm text-muted-foreground">Biomedical Engineering @ Texas A&M</p>
          </div>
        </div>
        
        <p className="text-base md:text-lg leading-relaxed">
          I've been fascinated by computers since I was young, spending countless hours tinkering with hardware and teaching myself to code. As I grew older, I discovered that I could combine this passion with my interest in healthcare to create meaningful impact.
        </p>
        
        <p className="text-base md:text-lg leading-relaxed">
          What excites me most is how technology can transform healthcare delivery and patient outcomes. When I'm working on projects that combine software development with medical applications, I lose track of time - that's when I know I'm in my element.
        </p>
        
        <div className={`transition-all duration-500 overflow-hidden ${expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
          <p className="text-base md:text-lg leading-relaxed">
            At Texas A&M, I found my sweet spot in Biomedical Engineering—a field where I can write code that directly impacts patient care. The technical challenges are substantial, but the potential to improve lives makes every frustrating debugging session worthwhile.
          </p>
          
          <p className="text-base md:text-lg leading-relaxed">
            Beyond my technical work, I'm deeply interested in how policy and ethics shape healthcare innovation. I believe that understanding the regulatory landscape is just as important as mastering the technical skills. My goal is to develop technologies that are not only innovative but also accessible and compliant with healthcare standards.
          </p>
        </div>
        
        <button 
          onClick={() => setExpanded(!expanded)} 
          className="flex items-center text-sm text-primary hover:text-primary/80 transition-colors"
        >
          {expanded ? "Read less" : "Read more about my journey"} 
          <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </AnimatedCard>
  );
};

// Main About component with tabs for different content
export default function About() {
  return (
    <Section id="about">
      <SectionTitle>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-left space-y-4"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">About Me</h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Where technology meets healthcare—and where I find purpose.
          </p>
        </motion.div>
      </SectionTitle>

      <div className="mt-8 space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <BiographySection />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="interests" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="interests">Professional Interests</TabsTrigger>
              <TabsTrigger value="journey">My Journey</TabsTrigger>
              <TabsTrigger value="personal">Beyond Work</TabsTrigger>
            </TabsList>
            
            {/* Interests Tab */}
            <TabsContent value="interests" className="mt-0">
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
            </TabsContent>
            
            {/* Journey Timeline Tab */}
            <TabsContent value="journey" className="mt-0">
              <AnimatedCard className="w-full p-6">
                <div className="relative border-l-2 border-primary/30 pl-6 pb-2 space-y-6">
                  {journeyMilestones.map((milestone, index) => (
                    <div key={index} className="relative">
                      <div className="absolute -left-[31px] h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="mb-1">
                        <span className="text-xs font-semibold text-primary">{milestone.year}</span>
                      </div>
                      <h3 className="text-base md:text-lg font-medium">{milestone.title}</h3>
                      <p className="mt-1 text-sm md:text-base text-muted-foreground">{milestone.description}</p>
                    </div>
                  ))}
                </div>
              </AnimatedCard>
            </TabsContent>
            
            {/* Personal Interests Tab */}
            <TabsContent value="personal" className="mt-0">
              <AnimatedCard className="w-full p-6">
                <div className="flex items-center mb-4 space-x-3">
                  <Coffee className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-medium">When I'm not coding or studying...</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalInterests.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg">
                      <div className="text-xl">{item.emoji}</div>
                      <p className="text-sm">{item.interest}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-sm text-center text-muted-foreground italic">
                  "I believe that the intersection of technology and compassion is where the most meaningful innovation happens."
                </div>
              </AnimatedCard>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center">
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
    </Section>
  )
}

