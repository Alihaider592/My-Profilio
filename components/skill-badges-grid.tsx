"use client"

import { Badge } from "@/components/ui/badge"
import { Code2, Palette, Zap, Atom, Triangle, Wind, FileCode2 } from "lucide-react"

const skills = [
  {
    name: "HTML",
    icon: Code2,
    color: "hover:bg-orange-500 hover:text-white hover:border-orange-500",
  },
  {
    name: "CSS",
    icon: Palette,
    color: "hover:bg-blue-500 hover:text-white hover:border-blue-500",
  },
  {
    name: "JavaScript",
    icon: Zap,
    color: "hover:bg-yellow-500 hover:text-black hover:border-yellow-500",
  },
  {
    name: "React",
    icon: Atom,
    color: "hover:bg-cyan-500 hover:text-white hover:border-cyan-500",
  },
  {
    name: "Next.js",
    icon: Triangle,
    color:
      "hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white",
  },
  {
    name: "Tailwind",
    icon: Wind,
    color: "hover:bg-teal-500 hover:text-white hover:border-teal-500",
  },
  {
    name: "TypeScript",
    icon: FileCode2,
    color: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
  },
]

interface SkillBadgesGridProps {
  className?: string
  showTitle?: boolean
  title?: string
}

export function SkillBadgesGrid({
  className = "",
  showTitle = true,
  title = "Core Technologies",
}: SkillBadgesGridProps) {
  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && <h3 className="text-xl font-semibold text-center">{title}</h3>}

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon
          return (
            <Badge
              key={skill.name}
              variant="outline"
              className={`
                px-4 py-2.5 text-sm font-medium
                transition-all duration-300 ease-in-out
                cursor-default
                hover:scale-105 hover:shadow-md
                ${skill.color}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
              }}
            >
              <IconComponent className="w-4 h-4 mr-2" />
              {skill.name}
            </Badge>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
