"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  techStack: string[]
  demoLink?: string
  githubLink?: string
  image?: string
  variant?: "featured" | "regular"
  isVisible?: boolean
  animationDelay?: number
}

export function ProjectCard({
  title,
  description,
  techStack,
  demoLink,
  githubLink,
  image,
  variant = "regular",
  isVisible = true,
  animationDelay = 0,
}: ProjectCardProps) {
  const isFeatured = variant === "featured"

  return (
    <Card
      className={`group overflow-hidden hover:shadow-lg transition-all duration-500 ${
        isFeatured ? "hover:scale-[1.02]" : "hover:scale-105 hover:-translate-y-2"
      } ${isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      <div className="relative overflow-hidden">
        <img
          src={image || "/placeholder.svg?height=200&width=400&query=project preview"}
          alt={title}
          className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            isFeatured ? "h-48" : "h-32"
          }`}
        />
        {isFeatured ? (
          // Featured project overlay with buttons
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center gap-4">
            {demoLink && (
              <Button
                size="sm"
                variant="secondary"
                asChild
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100"
              >
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
            {githubLink && (
              <Button
                size="sm"
                variant="outline"
                asChild
                className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-200 bg-transparent"
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
          </div>
        ) : (
          // Regular project subtle overlay
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        )}
      </div>

      <CardHeader className={isFeatured ? "" : "pb-3"}>
        <CardTitle
          className={`group-hover:text-primary transition-colors duration-300 ${isFeatured ? "text-xl" : "text-lg"}`}
        >
          {title}
        </CardTitle>
        <CardDescription className={`leading-relaxed ${isFeatured ? "text-base" : "text-sm line-clamp-2"}`}>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className={isFeatured ? "" : "pt-0"}>
        <div className={`flex flex-wrap ${isFeatured ? "gap-2" : "gap-1 mb-4"}`}>
          {(isFeatured ? techStack : techStack.slice(0, 3)).map((tech, index) => (
            <Badge
              key={index}
              variant={isFeatured ? "secondary" : "outline"}
              className={`text-xs transition-all duration-200 cursor-default ${
                isFeatured ? "hover:scale-110" : "hover:bg-primary hover:text-primary-foreground"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {tech}
            </Badge>
          ))}
        </div>

        {!isFeatured && (
          <div className="flex gap-2">
            {demoLink && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:scale-110 transition-transform duration-200"
                asChild
              >
                <a href={demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </a>
              </Button>
            )}
            {githubLink && (
              <Button
                size="sm"
                variant="ghost"
                className="p-2 hover:scale-110 transition-transform duration-200"
                asChild
              >
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub Repository</span>
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
