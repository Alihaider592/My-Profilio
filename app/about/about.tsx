"use client"

import { useEffect, useState, useRef } from "react"

export default function About() {
  const [isVisible, setIsVisible] = useState(false)
  const [skillsVisible, setSkillsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Function to trigger animations
  const triggerAnimation = () => {
    setIsVisible(true)
    setTimeout(() => setSkillsVisible(true), 500)
  }

  // Function to reset animations
  const resetAnimation = () => {
    setIsVisible(false)
    setSkillsVisible(false)
  }

  useEffect(() => {
    // Intersection Observer for scroll-based animations
    // Using a lower threshold (0.1) makes the animation trigger more easily,
    // which is essential for short, small screens.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerAnimation()
          } else {
            // Keep content visible on small screens by not resetting state
            // if the window is small (e.g., smaller than the 'lg' grid breakpoint)
            if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
            resetAnimation()
          }
        })
      },
      // Lower threshold for better mobile responsiveness
      { threshold: 0.1 } 
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Listen for clicks on navbar links
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute("href") === "#about") {
        setTimeout(() => {
          triggerAnimation()
        }, 100)
      }
    }

    document.querySelectorAll("a[href='#about']").forEach((link) => {
      link.addEventListener("click", handleNavClick)
    })

    return () => {
      document.querySelectorAll("a[href='#about']").forEach((link) => {
        link.removeEventListener("click", handleNavClick)
      })
    }
  }, [])

  return (
    <section ref={sectionRef} id="about" className="py-20 px-6 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Animation with CSS visibility guarantee */}
          <div 
            // sm:opacity-100 sm:translate-x-0 ensures visibility on small screens if JS fails
            className={`space-y-6 transition-all duration-1000 sm:opacity-100 sm:translate-x-0 ${
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
            }`}
          >
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">About Me</h1>
              <div
                className={`h-1 bg-primary rounded-full transition-all duration-1000 delay-300 ${isVisible ? "w-16" : "w-0"}`}
              ></div>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p className={`text-lg transition-all duration-1000 delay-500 sm:opacity-100 sm:translate-y-0 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                I'm a passionate Full Stack Developer with a strong eye for detail and a love for creating seamless, efficient web applications. My journey in web development began with curiosity about how websites function and has grown into a career focused on building accessible, performant, and scalable solutions.
              </p>
              <p className={`transition-all duration-1000 delay-700 sm:opacity-100 sm:translate-y-0 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                I specialize in the MERN stack and modern JavaScript frameworks, with extensive experience in React, Next.js, Node.js, MongoDB, and TypeScript. I believe in writing clean, maintainable code and continuously staying up-to-date with the latest technologies, design patterns, and best practices.
              </p>
              <p className={`transition-all duration-1000 delay-900 sm:opacity-100 sm:translate-y-0 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                Beyond coding, I enjoy exploring new design and development trends, contributing to open-source projects, and sharing knowledge with the developer community through blogging, mentoring, and collaborative projects.
              </p>
            </div>
          </div>

          {/* Right Column: Animation with CSS visibility guarantee */}
          <div 
            // sm:opacity-100 sm:translate-x-0 ensures visibility on small screens if JS fails
            className={`space-y-8 transition-all duration-1000 delay-300 sm:opacity-100 sm:translate-x-0 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
          >
            <h2 className="text-xl font-semibold">Core Technologies</h2>
            <div className="grid grid-cols-2 gap-6">
              
              {/* Left Skills Column */}
              <div className="space-y-4">
                {[
                  { name: "HTML & CSS", level: "Expert", width: "95%", delay: 1000 },
                  { name: "JavaScript", level: "Expert", width: "90%", delay: 1200 },
                  { name: "TypeScript", level: "Advanced", width: "85%", delay: 1400 },
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        // Animation is controlled by 'skillsVisible' state, which is set by JS
                        className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-[${skill.delay}ms] ${
                          skillsVisible ? `w-[${skill.width}]` : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Skills Column */}
              <div className="space-y-4">
                {[
                  { name: "React", level: "Expert", width: "92%", delay: 1600 },
                  { name: "Next.js", level: "Advanced", width: "88%", delay: 1800 },
                  { name: "Tailwind CSS", level: "Expert", width: "94%", delay: 2000 },
                ].map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                      <div
                        // Animation is controlled by 'skillsVisible' state, which is set by JS
                        className={`bg-primary h-2 rounded-full transition-all duration-1500 delay-[${skill.delay}ms] ${
                          skillsVisible ? `w-[${skill.width}]` : "w-0"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Highlights: Animation with CSS visibility guarantee */}
            <div 
              // sm:opacity-100 sm:translate-y-0 ensures visibility on small screens if JS fails
              className={`space-y-4 pt-6 border-t border-border transition-all duration-1000 delay-1000 sm:opacity-100 sm:translate-y-0 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h3 className="font-semibold">Experience Highlights</h3>
              <div className="space-y-3 text-sm text-muted-foreground">
                {[
                  "1+ year of professional Full-Stack development",
                  "3+ successful project deliveries",
                  "Strong focus on accessibility and performance",
                  "Active contributor to open-source projects",
                ].map((item, i) => (
                  <div 
                    key={i} 
                    // sm:opacity-100 sm:translate-x-0 ensures visibility on small screens if JS fails
                    className={`flex items-center gap-3 transition-all duration-700 delay-[${1200 + i * 200}ms] sm:opacity-100 sm:translate-x-0 ${
                      isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                    }`}
                  >
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}