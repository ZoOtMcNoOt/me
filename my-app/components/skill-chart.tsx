"use client"

import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  color: string
}

const skills: Skill[] = [
  { name: "Python", level: 90, color: "#3572A5" },
  { name: "JavaScript", level: 85, color: "#F7DF1E" },
  { name: "React", level: 80, color: "#61DAFB" },
  { name: "TypeScript", level: 75, color: "#3178C6" },
  { name: "C++", level: 70, color: "#00599C" },
  { name: "PyTorch", level: 65, color: "#EE4C2C" },
  { name: "TensorFlow", level: 60, color: "#FF6F00" },
  { name: "MATLAB", level: 55, color: "#0076A8" },
]

export function SkillChart() {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}%</span>
          </div>
          <div className="h-2 rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: skill.color }}
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

