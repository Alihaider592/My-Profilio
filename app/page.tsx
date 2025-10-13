"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import { useEffect, useState } from "react"
// Note: We only need Link for the social media buttons, but let's keep it imported
import Link from "next/link" 

// Assuming these are all rendered below the Hero section on the same page
import About from "./about/about"
import Skills from "./skills/skills"
import Projects from "./projects/projects" // The component we need to scroll to
import ContactPage from "./contact/contact"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // **NEW SCROLL FUNCTION FOR "VIEW MY WORK"**
  const scrollToProjects = () => {
    // Looks for the section with id="projects" (which is now wrapping your <Projects/> component)
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    // Note: The main content is wrapped in a <section>, which is fine.
    // The rest of the content (Projects, Skills, etc.) is outside this main section, but within the Home function return.
    <> 
    <section className="min-h-screen max-w-6xl mx-auto flex-col flex items-center justify-center px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto mb-5 mt-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
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
              {/* **FIX 2: VIEW MY WORK BUTTON** Changed Link to a Button calling the scroll function to keep it on the same page.
              */}
              <Button 
                onClick={scrollToProjects} 
                size="lg" 
                className="group cursor-pointer hover:scale-105 transition-all duration-300"
              >
                View My Work
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 group-hover:animate-bounce transition-transform" />
              </Button>
              
              {/* **FIX 1: DOWNLOAD CV BUTTON** Changed Button to an <a> tag and applied button styling. 
              The classes ensure the outline variant and large size styling is maintained.
              */}
              <a
                // CRITICAL: Path must be correct (file in 'public' folder)
                href="/MY_Resume-10.pdf" 
                download="Ali_Haider_FullStack_Developer_Resume.pdf"
                
                // Shadcn/Tailwind classes for Button (outline, lg size, and custom hover effects)
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
                           border border-input h-11 px-8 py-2 text-lg 
                           hover:scale-105 transition-all hover:text-primary/90 duration-300 bg-transparent"
              >
                Download CV
              </a>
            </div>

            {/* Social Links (No changes needed) */}
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
                  alt="Malik - Frontend Developer"
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

    {/* **FIX 2 CONTINUED: WRAP THE PROJECTS COMPONENT WITH THE TARGET ID** This is now a separate section outside the main Hero section, which is cleaner.
    */}
    <section id="projects">
      <Projects/>
    </section>
    
    <Skills/>
    <About/>
    <ContactPage/>
    </>
  )
}