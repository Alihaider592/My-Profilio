"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"

type Skill = {
  name: string
  level: number
}

type SkillCategory = {
  title: string
  skills: Skill[]
}

// Updated categorized skills to directly match your work history sections
const skillCategories: SkillCategory[] = [
  {
    title: "Full Stack & Web Development",
    skills: [
      { name: "React.js / Next.js", level: 78 },
      { name: "Node.js & Express.js", level: 72 },
      { name: "JavaScript / TypeScript", level: 75 },
      { name: "RESTful APIs & Database Integration", level: 70 },
      { name: "MongoDB & Mongoose", level: 74 },
    ],
  },
  {
    title: "Styling, Design & Workflow",
    skills: [
      { name: "Tailwind CSS", level: 85 },
      { name: "CSS Modules & Styled Components", level: 72 },
      { name: "Git & GitHub Workflow", level: 80 },
      { name: "VS Code & Vite", level: 82 },
      { name: "ESLint & Prettier ", level: 75 },
    ],
  },
  {
    title: "Operating Systems & Deployment",
    skills: [
      { name: "Windows (All Versions)", level: 88 },
      { name: "Ubuntu Linux & CLI", level: 76 },
      { name: "Vercel Deployment", level: 80 },
    ],
  },
  {
    title: "Office & Database Operations",
    skills: [
      { name: "Database Administration", level: 82 },
      { name: "Data Entry & Validation", level: 86 },
      { name: "MS Office Suite (Advanced)", level: 84 },
      { name: "System Troubleshooting & IT Support", level: 78 },
      { name: "Administrative Documentation", level: 80 },
    ],
  },
  {
    title: "Professional Communication",
    skills: [
      { name: "Inbound/Outbound Communications", level: 85 },
      { name: "Customer Relationship Management (CRM)", level: 80 },
      { name: "Conflict Resolution & Support", level: 82 },
      { name: "Active Listening & Data Logging", level: 84 },
    ],
  },
  {
    title: "Languages",
    skills: [
      { name: "Urdu (Native / Bilingual)", level: 95 },
      { name: "English (Professional / Conversational)", level: 80 },
    ],
  },
];
// Competencies mapped exactly from your journey milestones
const additionalSkills: string[] = [
  "MERN Stack Development",
  "Full-Stack Web Engineering",
  "Responsive UI/UX Design",
  "Agile & Scrum Sprints",
  "Campus IT Infrastructure Support",
  "Academic Data Management",
  "Customer Support Excellence",
  "CRM Data Entry Integration",
  "Problem-Solving Mindset",
  "Technical Communication Workflow",
  "Independent Learning & Adaptation"
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const triggerAnimation = () => {
    setIsVisible(true)
    setTimeout(() => setSkillsVisible(true), 500)
  }

  const resetAnimation = () => {
    setIsVisible(false)
    setSkillsVisible(false)
  }

  useEffect(() => {
    const isLargeEnough = typeof window !== 'undefined' && window.innerWidth >= 640;

    if (!isLargeEnough) {
        triggerAnimation();
        return; 
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation()
          } else {
            resetAnimation()
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute("href") === "#skills") {
        setTimeout(() => triggerAnimation(), 100)
      }
    }

    document.querySelectorAll("a[href='#skills']").forEach((link) => {
      link.addEventListener("click", handleNavClick)
    })

    return () => {
      document.querySelectorAll("a[href='#skills']").forEach((link) => {
        link.removeEventListener("click", handleNavClick)
      })
    }
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 min-h-screen bg-black text-slate-100">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 sm:opacity-100 sm:translate-y-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-balance text-white">Skills & Expertise</h1>
          <div
            className={`h-1 bg-teal-500 rounded-full mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "w-16" : "w-0"
            }`}
          ></div>
          <p
            className={`text-lg text-slate-400 max-w-3xl mx-auto transition-all duration-1000 delay-500 sm:opacity-100 sm:translate-y-0 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            A cohesive overview of my professional timeline capabilities, scaling from Full-Stack engineering and database operations to enterprise client systems communication.
          </p>
        </div>

        {/* Skill Cards divided by career sections */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`h-full bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 border border-slate-800/80 rounded-xl transition-all duration-1000 sm:opacity-100 sm:translate-y-0 sm:transition-none ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200 + 700}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-center text-teal-400 font-bold">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm text-slate-200">{skill.name}</span>
                      <span className="text-xs text-teal-400 font-mono font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-[#1f222c] rounded-full h-2 border border-slate-800/40">
                      <div
                        className={`bg-teal-500 h-2 rounded-full transition-all duration-1500 ease-out shadow-[0_0_8px_1px_rgba(20,184,166,0.4)]`}
                        style={{
                          width: skillsVisible ? `${skill.level}%` : "0%",
                          transitionDelay: `${index * 200 + skillIndex * 100 + 1000}ms`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Skills Badges */}
        <div className="space-y-8">
          <h2
            className={`text-2xl font-semibold text-center text-white transition-all duration-1000 delay-1000 sm:opacity-100 sm:translate-y-0 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Core Competencies
          </h2>
          <div
            className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-1200 sm:opacity-100 sm:translate-y-0 ${
              skillsVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            {additionalSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm bg-[#121318] text-slate-300 border border-slate-800 hover:border-teal-500/30 hover:bg-teal-950/20 transition-all duration-200 cursor-default"
                style={{ animationDelay: `${index * 50 + 1400}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Summary Counter Adjustments */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 delay-1600 sm:opacity-100 sm:translate-y-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-teal-500">2.5+</div>
            <div className="text-slate-400">Years Dynamic Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-teal-500">20+</div>
            <div className="text-slate-400">Core Technologies Mastered</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-teal-500">4+</div>
            <div className="text-slate-400">Roles Excelled Within</div>
          </div>
        </div>

      </div>
    </section>
  )
}