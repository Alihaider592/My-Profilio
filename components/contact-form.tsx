"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, MessageSquare, Github, Linkedin } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string>("")

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
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

      if (data.success) {
        setIsSubmitted(true)
        setFormData({ name: "", email: "", message: "" })
      } else {
        setError("Failed to send message. Please try again later.")
      }
    } catch (err) {
      console.error("Error:", err)
      setError("Failed to send message. Please try again later.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      <Card className="shadow-2xl border-0 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
        <CardHeader className="text-center pb-6 sm:pb-8 px-6 sm:px-8 pt-8 sm:pt-10">
          <CardTitle className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold">
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            Get In Touch
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
            Send me a message — I’ll respond as soon as possible.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-10">
              <Mail className="w-10 h-10 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
              <p className="text-muted-foreground">Thank you for reaching out. I’ll get back to you soon!</p>
              <Button onClick={() => setIsSubmitted(false)} className="mt-6">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {error && <p className="text-destructive text-sm">{error}</p>}

              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  required
                  disabled={isSubmitting}
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>

      <SocialMediaLinks />
    </div>
  )
}

function SocialMediaLinks() {
  const socials = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/Alihaider592",
      color: "hover:text-gray-900 dark:hover:text-gray-100",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/ali-haider-719451378/",
      color: "hover:text-blue-600 dark:hover:text-blue-400",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:alicoder592@gmail.com",
      color: "hover:text-green-600 dark:hover:text-green-400",
    },
  ]

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-background via-background to-muted/10">
      <CardContent className="py-6">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-semibold mb-4 text-muted-foreground">Let's Connect</h3>
          <div className="flex justify-center gap-6">
            {socials.map(({ name, icon: Icon, href, color }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-all duration-300 ${color}`}
              >
                <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </a>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
