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

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Technologies",
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 88 },
    ],
  },
  {
    title: "Backend Technologies",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Next.js API Routes", level: 82 },
      { name: "RESTful APIs", level: 90 },
      { name: "Authentication (JWT, NextAuth)", level: 85 },
      { name: "GraphQL (Basics)", level: 70 },
    ],
  },
  {
    title: "Styling & Design",
    skills: [
      { name: "Tailwind CSS", level: 94 },
      { name: "Sass/SCSS", level: 80 },
      { name: "CSS Modules", level: 78 },
      { name: "Styled Components", level: 72 },
      { name: "Figma", level: 68 },
    ],
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "VS Code", level: 95 },
      { name: "Vite", level: 82 },
      { name: "Webpack", level: 70 },
      { name: "ESLint & Prettier", level: 88 },
      { name: "Jest / React Testing Library", level: 75 },
    ],
  },
  {
    title: "Deployment & DevOps",
    skills: [
      { name: "Vercel", level: 92 },
      { name: "CI/CD Pipelines (GitHub Actions)", level: 75 },
      { name: "Linux / CLI", level: 80 },
    ],
  },
  {
    title: "Databases & ORMs",
    skills: [
      { name: "MongoDB", level: 86 },
      { name: "Mongoose", level: 84 },
    ],
  },
]

const additionalSkills: string[] = [
  "Responsive Web Design",
  "Web Accessibility (a11y)",
  "Performance Optimization",
  "SEO Best Practices",
  "Progressive Web Apps",
  "RESTful API Integration",
  "State Management (Redux, Context API, etc.)",
  "UI Component Libraries",
  "Version Control (Git, GitHub)",
  "Agile & Scrum Methodologies",
  "Cross-browser Testing",
  "Mobile-first Development",
]

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const triggerAnimation = () => {
    setIsVisible(true)
    // Only trigger skillsVisible animation after a short delay on large screens
    // On small screens, this state will be immediately visible by CSS
    setTimeout(() => setSkillsVisible(true), 500)
  }

  const resetAnimation = () => {
    setIsVisible(false)
    setSkillsVisible(false)
  }

  // Scroll-based animations (only runs for devices larger than 'sm' due to the CSS fix)
  useEffect(() => {
    // We can remove the isSmallDevice check here since CSS handles the fallback.
    // However, we can use the check to skip setting up the observer entirely on small screens
    // for a tiny performance gain.

    const isLargeEnough = typeof window !== 'undefined' && window.innerWidth >= 640; // 640px is Tailwind's 'sm' breakpoint

    if (!isLargeEnough) {
        // On small screens, we just force the animation to complete state immediately.
        // This is done to ensure the progress bars fill up.
        triggerAnimation();
        return; 
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Only use intersection logic for large screens
          if (entry.isIntersecting) {
            triggerAnimation()
          } else {
            resetAnimation()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Navbar click trigger (Still useful for forcing state if navigating via hash link)
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
    <section id="skills" ref={sectionRef} className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header - ADDED sm:opacity-100 sm:translate-y-0 */}
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 sm:opacity-100 sm:translate-y-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Skills & Expertise</h1>
          <div
            // Line remains animated by JS, but is visible if 'isVisible' is forced true on small screens
            className={`h-1 bg-primary rounded-full mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "w-16" : "w-0"
            }`}
          ></div>
          <p
            // ADDED sm:opacity-100 sm:translate-y-0
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-500 sm:opacity-100 sm:translate-y-0 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            A comprehensive overview of my technical skills and proficiency levels across various Full-Stack Development, MERN Stack, Front-End, Back-End
            and development tools.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              // ADDED sm:opacity-100 sm:translate-y-0 sm:transition-none
              className={`h-full transition-all duration-1000 sm:opacity-100 sm:translate-y-0 sm:transition-none ${
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
                        // Progress bar animation still relies on skillsVisible (set to true immediately on small screens)
                        className={`bg-primary h-2 rounded-full transition-all duration-1500 ease-out`}
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
            // ADDED sm:opacity-100 sm:translate-y-0
            className={`text-2xl font-semibold text-center transition-all duration-1000 delay-1000 sm:opacity-100 sm:translate-y-0 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            Additional Competencies
          </h2>
          <div
            // ADDED sm:opacity-100 sm:translate-y-0
            className={`flex flex-wrap justify-center gap-3 transition-all duration-1000 delay-1200 sm:opacity-100 sm:translate-y-0 ${
              skillsVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
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

        {/* Summary - ADDED sm:opacity-100 sm:translate-y-0 */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-8 text-center transition-all duration-1000 delay-1600 sm:opacity-100 sm:translate-y-0 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">1+</div>
            <div className="text-muted-foreground">year Experience</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">15+</div>
            <div className="text-muted-foreground">Technologies Mastered</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">5+</div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
        </div>
      </div>
    </section>
  )
}