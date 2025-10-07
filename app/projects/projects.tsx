"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useEffect, useState } from "react"

const projects = [
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

  useEffect(() => {
    setIsVisible(true)
    // Stagger card animations
    projects.forEach((_, index) => {
      setTimeout(() => {
        setCardsVisible((prev) => {
          const newState = [...prev]
          newState[index] = true
          return newState
        })
      }, index * 200)
    })
  }, [])

  return (
    <section id="projects" className="py-20 px-6 min-h-screen ">
      <div className="max-w-6xl mx-auto">
        <div
          className={`text-center space-y-4 mb-16 transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-balance">Full-Stack Projects</h1>
          <div
            className={`h-1 bg-primary rounded-full mx-auto transition-all duration-1000 delay-300 ${isVisible ? "w-16" : "w-0"}`}
          ></div>
          <p
            className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            A collection of projects that showcase my skills in Full-Stack Development, MERN Stack, Front-End, Back-End from interactive web applications
            to responsive design implementations.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((project) => project.featured)
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

        {/* Other Projects Grid */}
        <div className="space-y-8">
          <h2
            className={`text-2xl font-semibold text-center transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            More Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => !project.featured)
              .map((project, index) => {
                const adjustedIndex = index + 2 // Account for featured projects
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
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 hover:scale-110 transition-transform duration-200"
                          asChild
                        >
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                            <span className="sr-only">Live Demo</span>
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-2 hover:scale-110 transition-transform duration-200"
                          asChild
                        >
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

        {/* Call to Action */}
        <div
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <Button
            variant="outline"
            size="lg"
            asChild
            className="hover:scale-105 transition-all hover:text-primary/90 duration-300 group bg-transparent"
          >
            <a href="https://github.com/malik" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              View All Projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
