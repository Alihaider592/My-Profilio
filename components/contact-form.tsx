"use client"

import type React from "react"

import { useState } from "react"
import emailjs from "emailjs-com"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Send, User, MessageSquare, Github, Linkedin, ExternalLink } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  message: string
}

interface ContactFormProps {
  title?: string
  description?: string
  className?: string
  onSubmit?: (data: ContactFormData) => Promise<void>
}

export function ContactForm({
  title = "Get In Touch",
  description = "Send me a message and I'll get back to you as soon as possible.",
  className = "",
  onSubmit,
}: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters"
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitError("") // Clear any previous errors

    try {
      if (onSubmit) {
        await onSubmit(formData)
      } else {
        console.log("Sending email with EmailJS:", formData)

        // EmailJS configuration - replace with your actual service ID, template ID, and public key
        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_xxxxxxx"
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_xxxxxxx"
        const userId = process.env.NEXT_PUBLIC_EMAILJS_USER_ID || "user_xxxxxxxxxxxxxxxxxx"

        // Send email using EmailJS
        const result = await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Your Name", // Replace with your name
            reply_to: formData.email,
          },
          userId,
        )

        console.log("EmailJS result:", result)

        if (result.status !== 200) {
          throw new Error("Failed to send email")
        }
      }

      // Clear form and show success message
      setFormData({ name: "", email: "", message: "" })
      setIsSubmitted(true)
    } catch (error) {
      console.error("Email sending error:", error)
      setSubmitError(
        error instanceof Error
          ? `Failed to send message: ${error.message}`
          : "Failed to send message. Please check your connection and try again.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <Card
          className={`shadow-2xl border-0 bg-gradient-to-br from-background via-background to-muted/30 backdrop-blur-sm ${className}`}
        >
          <CardContent className="text-center py-12 sm:py-16 px-6 sm:px-8">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 rounded-full flex items-center justify-center shadow-lg ring-4 ring-green-100/50 dark:ring-green-900/20">
                <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Message Sent!
            </h3>
            <p className="text-muted-foreground mb-8 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              variant="outline"
              className="h-11 px-6 hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg border-2"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
        <SocialMediaLinks />
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
      <Card
        className={`shadow-2xl border-0 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm hover:shadow-3xl transition-shadow duration-500 ${className}`}
      >
        <CardHeader className="text-center pb-6 sm:pb-8 px-6 sm:px-8 pt-8 sm:pt-10">
          <CardTitle className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-bold">
            <div className="p-2 sm:p-2.5 rounded-full bg-primary/10 ring-2 ring-primary/20">
              <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            {title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base mt-3 max-w-md mx-auto leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 sm:px-8 pb-8 sm:pb-10">
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {submitError && (
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 animate-in slide-in-from-top-2 duration-300">
                <p className="text-sm text-destructive font-medium flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  {submitError}
                </p>
              </div>
            )}

            {/* Name Field */}
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                <User className="w-4 h-4 text-muted-foreground" />
                Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                aria-invalid={!!errors.name}
                disabled={isSubmitting}
                className={`h-11 sm:h-12 transition-all duration-300 hover:border-primary/60 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.name ? "border-destructive focus:border-destructive focus:ring-destructive/10" : ""
                }`}
              />
              {errors.name && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1 duration-200">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                aria-invalid={!!errors.email}
                disabled={isSubmitting}
                className={`h-11 sm:h-12 transition-all duration-300 hover:border-primary/60 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.email ? "border-destructive focus:border-destructive focus:ring-destructive/10" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1 duration-200">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-foreground/90">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project or just say hello..."
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                aria-invalid={!!errors.message}
                disabled={isSubmitting}
                className={`min-h-28 sm:min-h-32 resize-none transition-all duration-300 hover:border-primary/60 focus:border-primary focus:ring-4 focus:ring-primary/10 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.message ? "border-destructive focus:border-destructive focus:ring-destructive/10" : ""
                }`}
              />
              {errors.message && (
                <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1 duration-200">
                  {errors.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-sm sm:text-base font-medium bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary hover:to-primary hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:hover:scale-100 disabled:opacity-75"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Sending Message...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SocialMediaLinks />
    </div>
  )
}

function SocialMediaLinks() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/yourusername", // Replace with actual GitHub URL
      color: "hover:text-gray-900 dark:hover:text-gray-100",
      bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/in/yourusername", // Replace with actual LinkedIn URL
      color: "hover:text-blue-600 dark:hover:text-blue-400",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
    },
    {
      name: "Email",
      icon: Mail,
      href: "mailto:your.email@example.com", // Replace with actual email
      color: "hover:text-green-600 dark:hover:text-green-400",
      bgColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
    },
  ]

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-sm">
      <CardContent className="py-6 sm:py-8 px-6 sm:px-8">
        <div className="text-center">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-muted-foreground">Let's Connect</h3>
          <div className="flex justify-center items-center gap-4 sm:gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-muted/50 transition-all duration-300 ${link.bgColor} hover:scale-110 hover:shadow-lg ${link.color} ring-2 ring-transparent hover:ring-current/20`}
                  aria-label={`Visit my ${link.name} profile`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:scale-110" />
                  <ExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 absolute translate-x-2 -translate-y-2 group-hover:translate-x-2.5 group-hover:-translate-y-2.5" />
                </a>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
