"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, Loader2, Upload, X, FileText } from "lucide-react"

interface ApplicationFormProps {
  eventId: string
  eventTitle: string
}

export function ApplicationForm({ eventId, eventTitle }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedCV, setSelectedCV] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, cv: "CV must be less than 5MB" })
        return
      }
      setSelectedCV(file)
      setErrors({ ...errors, cv: "" })
    }
  }

  const removeCV = () => {
    setSelectedCV(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {}

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const coverLetter = formData.get("coverLetter") as string

    if (!fullName || fullName.trim().length < 2) {
      newErrors.fullName = "Full name is required (minimum 2 characters)"
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!phone || phone.trim().length < 10) {
      newErrors.phone = "Please enter a valid phone number"
    }

    if (!coverLetter || coverLetter.trim().length < 50) {
      newErrors.coverLetter = "Cover letter must be at least 50 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    if (!validateForm(formData)) {
      return
    }

    setIsSubmitting(true)

    // Add CV file if selected
    if (selectedCV) {
      formData.set("cv", selectedCV)
    }

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        setErrors({ form: result.error || "Failed to submit application" })
        setIsSubmitting(false)
        return
      }

      setIsSubmitting(false)
      setIsSubmitted(true)
    } catch (error) {
      setErrors({ form: "Failed to submit application. Please try again." })
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="bg-background rounded-2xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Application Submitted!</h3>
        <p className="text-muted-foreground mb-4">
          Thank you for applying to &quot;{eventTitle}&quot;. We&apos;ll review your application and get back to you
          soon.
        </p>
        <Button variant="outline" onClick={() => setIsSubmitted(false)}>
          Submit Another Application
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-2xl border border-border p-8 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Apply for this Position</h3>
        <p className="text-muted-foreground text-sm">Fill out the form below to submit your application</p>
      </div>

      {errors.form && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">{errors.form}</div>
      )}

      <input type="hidden" name="eventId" value={eventId} />

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">
            Full Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            className={errors.fullName ? "border-destructive" : ""}
          />
          {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email Address <span className="text-destructive">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-destructive">*</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+62 812 3456 7890"
            className={errors.phone ? "border-destructive" : ""}
          />
          {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cv">Resume / CV (Optional)</Label>
          {selectedCV ? (
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedCV.name}</p>
                  <p className="text-xs text-muted-foreground">{(selectedCV.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeCV}
                className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-accent/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                id="cv"
                name="cv"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleCVChange}
              />
              <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop
                <br />
                <span className="text-xs">PDF, DOC, or DOCX (max 5MB)</span>
              </p>
            </div>
          )}
          {errors.cv && <p className="text-destructive text-sm">{errors.cv}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverLetter">
            Cover Letter <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="coverLetter"
            name="coverLetter"
            placeholder="Tell us about your experience and why you'd be a great fit for this position..."
            rows={5}
            className={errors.coverLetter ? "border-destructive" : ""}
          />
          {errors.coverLetter && <p className="text-destructive text-sm">{errors.coverLetter}</p>}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
