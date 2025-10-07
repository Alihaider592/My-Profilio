"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Mail, MessageSquare } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  // Animation states
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Trigger animation manually
  const triggerAnimation = () => {
    setIsVisible(true)
  }

  // Reset animation
  const resetAnimation = () => {
    setIsVisible(false)
  }

  useEffect(() => {
    // Intersection Observer for scroll-based animation
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
      { threshold: 0.5 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  // Trigger animation when navbar link is clicked
  useEffect(() => {
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLAnchorElement
      if (target && target.getAttribute("href") === "#contact") {
        setTimeout(() => {
          triggerAnimation()
        }, 100) // Small delay to allow scroll
      }
    }

    document.querySelectorAll("a[href='#contact']").forEach((link) => {
      link.addEventListener("click", handleNavClick)
    })

    return () => {
      document.querySelectorAll("a[href='#contact']").forEach((link) => {
        link.removeEventListener("click", handleNavClick)
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (res.ok) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError(data.error || "Failed to send message")
      }
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    }

    setIsSubmitting(false)
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-20 px-6 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">

        {/* Left Section - Animated Text */}
        <div
          className={`lg:w-1/2 space-y-6 transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"}`}
        >
          <h2 className="text-4xl font-bold text-balance flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-primary animate-bounce" />
            Get In Touch
          </h2>
          <div
            className={`h-1 bg-primary rounded-full w-16 transition-all duration-1000 delay-300 ${isVisible ? "w-16" : "w-0"}`}
          ></div>

          <p className={`text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            I’m always excited to collaborate on new projects or help bring ideas to life. Whether you have a project in mind, 
            want to discuss potential opportunities, or simply want to connect and exchange ideas, I would love to hear from you.
          </p>

          <p className={`text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            I specialize in full-stack web development, building modern, responsive, and scalable applications. 
            If you’re looking for someone to help turn your concepts into functional, high-quality projects, 
            whether it’s a personal website, a startup MVP, or a complex application, I’m here to help.
          </p>

          <div className="border-t border-muted-foreground/30 my-4"></div>

          <p className={`text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-900 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
            I am also available for freelance work, consulting, and collaborations. I enjoy exploring creative solutions, 
            staying up-to-date with the latest technologies, and delivering work that not only meets but exceeds expectations.
          </p>
        </div>

        {/* Right Section - Animated Form */}
        <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"}`}>
          <Card className="shadow-2xl border-0 rounded-2xl bg-gradient-to-br from-background/50 via-background/30 to-muted/10 backdrop-blur-md">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold flex items-center justify-center gap-2">
                <Mail className="w-5 h-5 text-primary animate-bounce" />
                Contact Me
              </CardTitle>
              <CardDescription className="text-sm sm:text-base mt-2 text-muted-foreground">
                Send me a message and I’ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-10">
                  <h3 className="text-xl font-semibold text-green-500 mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-4">Thank you for reaching out. I’ll respond soon!</p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && <p className="text-destructive text-sm">{error}</p>}

                  <div className={`space-y-2 transition-all duration-700 delay-500 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={`space-y-2 transition-all duration-700 delay-700 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={`space-y-2 transition-all duration-700 delay-900 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project or idea..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className={`transition-all duration-700 delay-1100 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
                    <Button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-center">
                      {isSubmitting ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></span>
                      ) : (
                        <Send className="w-4 h-4 mr-2" />
                      )}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
