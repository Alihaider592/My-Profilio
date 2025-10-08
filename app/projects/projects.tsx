"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useEffect, useRef, useState } from "react"

type Project = {
  title: string
  description: string
  image?: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
}

const projects: Project[] = [
  {
    title: "E-Commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing products, orders, and analytics. Built with modern React patterns and real-time data updates.",
    image: "/ecommerce-dashboard-preview.jpg",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://dashboard-demo.vercel.app",
    githubUrl: "https://github.com/malik/ecommerce-dashboard",
    featured: true,
  },
  {
    title: "Task Management App",
    description:
      "A collaborative task management application with drag-and-drop functionality, team collaboration features, and real-time updates.",
    image: "/task-app-preview.jpg",
    tech: ["Next.js", "React", "Prisma", "PostgreSQL"],
    liveUrl: "https://taskapp-demo.vercel.app",
    githubUrl: "https://github.com/malik/task-management",
    featured: true,
  },
  {
    title: "Weather Forecast App",
    description:
      "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
    image: "/weather-app-preview.jpg",
    tech: ["React", "OpenWeather API", "Mapbox", "CSS Modules"],
    liveUrl: "https://weather-demo.vercel.app",
    githubUrl: "https://github.com/malik/weather-app",
    featured: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing modern web development techniques with smooth animations and optimized performance.",
    image: "/portfolio-preview.jpg",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "MDX"],
    liveUrl: "https://portfolio-demo.vercel.app",
    githubUrl: "https://github.com/malik/portfolio",
    featured: false,
  },
  {
    title: "Recipe Finder",
    description:
      "A recipe discovery platform with advanced search filters, meal planning features, and nutritional information.",
    image: "/recipe-app-preview.jpg",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    liveUrl: "https://recipes-demo.vercel.app",
    githubUrl: "https://github.com/malik/recipe-finder",
    featured: false,
  },
]

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const triggerAnimation = () => {
    setIsVisible(true)
    projects.forEach((_, index) => {
      setTimeout(() => {
        setCardsVisible((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * 200 + 300) // stagger animation
    })
  }

  const resetAnimation = () => {
    setIsVisible(false)
    setCardsVisible([])
  }

  // Scroll-based animation
  useEffect(() => {
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
      { threshold: 0.3 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Navbar click animation
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute("href") === "#projects") {
        setTimeout(() => triggerAnimation(), 100)
      }
    }

    document.querySelectorAll("a[href='#projects']").forEach((link) => {
      link.addEventListener("click", handleNavClick)
    })

    return () => {
      document.querySelectorAll("a[href='#projects']").forEach((link) => {
        link.removeEventListener("click", handleNavClick)
      })
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Full-Stack Projects</h1>
          <div
            className={`h-1 bg-primary rounded-full mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? "w-16" : "w-0"
            }`}
          />
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            A collection of projects that showcase my Full-Stack skills from interactive web apps to responsive designs.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((p) => p.featured)
            .map((project, index) => (
              <Card
                key={index}
                className={`group overflow-hidden hover:shadow-lg transition-all duration-500 hover:scale-[1.02] ${
                  cardsVisible[index] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
                    <Button
                      size="sm"
                      variant="secondary"
                      asChild
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
                    >
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                      className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200 bg-transparent"
                    >
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-base leading-relaxed">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="text-xs hover:scale-110 transition-transform duration-200 cursor-default"
                        style={{ animationDelay: `${techIndex * 100}ms` }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* More Projects */}
        <div className="space-y-8">
          <h2
            className={`text-2xl font-semibold text-center transition-all duration-1000 delay-700 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            More Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => {
                const adjustedIndex = index + projects.filter((p) => p.featured).length
                return (
                  <Card
                    key={index}
                    className={`group hover:shadow-md transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                      cardsVisible[adjustedIndex] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                    }`}
                    style={{ transitionDelay: `${adjustedIndex * 200}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tech.slice(0, 3).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className="p-2 hover:scale-110 transition-transform duration-200" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Live Demo</span>
                          </a>
                        </Button>
                        <Button size="sm" variant="ghost" className="p-2 hover:scale-110 transition-transform duration-200" asChild>
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                            <span className="sr-only">GitHub Repository</span>
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
          </div>
        </div>
      </div>
    </section>
  )
}
