"use client"

import { useEffect, useRef, useState } from "react"

export function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Delay skills animation
          setTimeout(() => setSkillsVisible(true), 500)
        }
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-20 px-6" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Section Header */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">About Me</h2>
              <div
                className={`h-1 bg-primary rounded-full transition-all duration-1000 delay-300 ${isVisible ? "w-16" : "w-0"}`}
              ></div>
            </div>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p
                className={`text-lg transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                I'm a passionate frontend developer with a keen eye for detail and a love for creating seamless user
                experiences. My journey in web development started with curiosity about how websites work, and it has
                evolved into a career focused on building accessible, performant applications.
              </p>

              <p
                className={`transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                Currently, I specialize in modern JavaScript frameworks and have extensive experience with React,
                Next.js, and TypeScript. I believe in writing clean, maintainable code and staying up-to-date with the
                latest web technologies and best practices.
              </p>

              <p
                className={`transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                When I'm not coding, you can find me exploring new design trends, contributing to open-source projects,
                or sharing knowledge with the developer community through blog posts and mentoring.
              </p>
            </div>
          </div>

          {/* Right Column - Skills Grid */}
          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          >
            <h3 className="text-xl font-semibold">Core Technologies</h3>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">HTML & CSS</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-1000 ${skillsVisible ? "w-[95%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">JavaScript</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-1200 ${skillsVisible ? "w-[90%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">TypeScript</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-1400 ${skillsVisible ? "w-[85%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">React</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-1600 ${skillsVisible ? "w-[92%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Next.js</span>
                    <span className="text-sm text-muted-foreground">Advanced</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-1800 ${skillsVisible ? "w-[88%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tailwind CSS</span>
                    <span className="text-sm text-muted-foreground">Expert</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-2000 ${skillsVisible ? "w-[94%]" : "w-0"}`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Highlights */}
            <div
              className={`space-y-4 pt-6 border-t border-border transition-all duration-1000 delay-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <h4 className="font-semibold">Experience Highlights</h4>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div
                  className={`flex items-center gap-3 transition-all duration-700 delay-1200 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  <span>3+ years of professional frontend development</span>
                </div>
                <div
                  className={`flex items-center gap-3 transition-all duration-700 delay-1400 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
                  <span>10+ successful project deliveries</span>
                </div>
                <div
                  className={`flex items-center gap-3 transition-all duration-700 delay-1600 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-400"></div>
                  <span>Strong focus on accessibility and performance</span>
                </div>
                <div
                  className={`flex items-center gap-3 transition-all duration-700 delay-1800 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
                >
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-600"></div>
                  <span>Active contributor to open-source projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
