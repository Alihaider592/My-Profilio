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
    image: "/weather-app-preview.jpg",
    tech: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    liveUrl: "https://buy-sphere.vercel.app/",
    githubUrl: "https://github.com/Alihaider592/buy-sphere",
    featured: true,
  },
  {
    title: "Portfilio Web",
    description:
      "A sleek portfolio website showcasing projects and skills with smooth animations and a modern, responsive design.",
    image: "/task-app-preview.jpg",
    tech: ["Next.js", "React", "Mongoo DB", "ESLint"],
    liveUrl: "https://ali-haider-my-portfolio.vercel.app",
    githubUrl: "https://github.com/Alihaider592/My-Profilio",
    featured: true,
  },
  {
    title: "Blog Uploading App",
    description:
      "A simple blog upload web app for posting articles with image uploads and responsive, user-friendly publishing.",
    image: "/ecommerce-dashboard-preview.jpg",
    tech: ["Next.js", "React", "Mongoo DB", "Cloudnier"],
    liveUrl: "https://first-next-h2npu85qi-alihaider592s-projects.vercel.app/",
    githubUrl: "https://github.com/malik/task-management",
    featured: true,
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
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
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
        
      </div>
    </section>
  )
}
