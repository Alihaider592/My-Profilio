// src/components/HeroSection.jsx (or .tsx)

"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // **FIXED SCROLL FUNCTION**
  // This function looks for the element with id="projects"
  const scrollToProjects = () => {
    // Ensure the ID matches the ID you set in your main page/layout
    const element = document.getElementById("projects")
    if (element) {
      // Use smooth scroll behavior
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">
                Hi, I'm <span className="text-primary animate-pulse">Ali Haider</span>
              </h1>
              <h2
                className={`text-xl md:text-2xl text-muted-foreground font-mono transition-all duration-1000 delay-300 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                Full-Stack Developer
              </h2>
              <p
                className={`text-lg text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              >
                "I build scalable, accessible, and pixel-perfect digital experiences across the web. Passionate about crafting thoughtful interfaces and robust back-end systems, I blend design with engineering to deliver end-to-end solutions that truly work."
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              {/* 1. VIEW MY WORK BUTTON (Scroll function is correct, but requires the target ID) */}
              <Button
                onClick={scrollToProjects}
                size="lg"
                className="group hover:scale-105 transition-all duration-300"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 group-hover:animate-bounce transition-transform" />
              </Button>

              {/* 2. DOWNLOAD CV BUTTON (Path corrected, deployment is required) */}
              <a 
                // CRITICAL: Ensure MY_Resume-10.pdf is in the root of your 'public' folder.
                href="/MY_Resume-10.pdf" 
                download="Ali_Haider_FullStack_Developer_Resume.pdf" 
                
                // Styling that makes the anchor tag look like your desired button
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                           border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-11 px-8 py-2 text-lg 
                           hover:scale-105 transition-all duration-300"
              >
                Download CV
              </a>
            </div>

            {/* Social Links - No change needed, they are correct */}
            <div
              className={`flex gap-4 pt-4 transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
            >
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:scale-110 hover:rotate-12 transition-all duration-300"
              >
                <a href="https://github.com/Alihaider592" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:scale-110 hover:rotate-12 transition-all duration-300"
              >
                <a href="https://www.linkedin.com/in/ali-haider-719451378/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:scale-110 hover:rotate-12 transition-all duration-300"
              >
                <a href="mailto:alicoder592@gmail.com">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </a>
              </Button>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div
            className={`flex justify-center lg:justify-end transition-all duration-1000 delay-200 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}
          >
            <div className="relative group">
              <div className="w-80 h-80 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-105 transition-all duration-500 animate-pulse">
                <img
                  src="/professional-developer-headshot.png"
                  alt="Ali Haider - Full-Stack Developer"
                  className="w-72 h-72 rounded-xl object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              {/* Decorative elements with floating animation */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent rounded-full opacity-40 animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary/30 rounded-full animate-ping delay-500"></div>
              <div className="absolute bottom-1/4 -right-8 w-3 h-3 bg-accent/50 rounded-full animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}