"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"

const skillCategories = [
  {
    title: "Frontend Technologies",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 92 },
      { name: "Next.js", level: 88 },
    ],
  },
  {
    title: "Styling & Design",
    skills: [
      { name: "Tailwind CSS", level: 94 },
      { name: "Sass/SCSS", level: 80 },
      { name: "CSS Modules", level: 75 },
      { name: "Styled Components", level: 70 },
      { name: "Figma", level: 65 },
      { name: "Adobe XD", level: 60 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git", level: 88 },
      { name: "Webpack", level: 70 },
      { name: "Vite", level: 82 },
      { name: "ESLint", level: 85 },
      { name: "Prettier", level: 90 },
      { name: "Jest", level: 75 },
    ],
  },
]

const additionalSkills = [
  "Responsive Design",
  "Web Accessibility (a11y)",
  "Performance Optimization",
  "SEO Best Practices",
  "Progressive Web Apps",
  "API Integration",
  "State Management",
  "Component Libraries",
  "Version Control",
  "Agile Methodology",
  "Cross-browser Testing",
  "Mobile-first Development",
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Skills & Expertise</h1>
          <div
            className={`h-1 bg-primary rounded-full mx-auto transition-all duration-1000 delay-300 ${isVisible ? "w-16" : "w-0"}`}
          ></div>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            A comprehensive overview of my technical skills and proficiency levels across various frontend technologies
            and development tools.
          </p>
        </div>

        {/* Skill Categories with Progress Bars */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`h-full transition-all duration-1000 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 200 + 700}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-center">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className={`bg-primary h-2 rounded-full transition-all duration-1500 ease-out ${
                          isVisible ? `w-[${skill.level}%]` : "w-0"
                        }`}
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
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

        {/* Additional Skills as Badges */}
        <div className="space-y-8">
          <h2
            className={`text-2xl font-semibold text-center transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            Additional Competencies
          </h2>
          <div
            className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-1200 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            {additionalSkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                style={{ animationDelay: `${index * 50 + 1400}ms` }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Skills Summary */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 delay-1600 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">3+</div>
            <div className="text-muted-foreground">Years Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">Technologies Mastered</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  )
}
