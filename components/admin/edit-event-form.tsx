"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, X, ImageIcon } from "lucide-react"
import { updateEventAction } from "@/app/admin/(protected)/events/actions"
import type { DbEvent } from "@/lib/db"

interface EditEventFormProps {
  event: DbEvent
}

function safeJsonArrayToLines(value: string | null | undefined) {
  if (!value) return ""
  try {
    const arr = JSON.parse(value)
    if (Array.isArray(arr)) return arr.join("\n")
  } catch {}
  return String(value)
}

export function EditEventForm({ event }: EditEventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [imagePreview, setImagePreview] = useState<string | null>(event.image ?? null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [keepExistingImage, setKeepExistingImage] = useState(!!event.image)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({ ...p, image: "Image must be less than 5MB" }))
      return
    }

    setSelectedFile(file)
    setKeepExistingImage(false)

    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result as string)
    reader.readAsDataURL(file)

    setErrors((p) => ({ ...p, image: "" }))
  }

  const removeImage = () => {
    setImagePreview(null)
    setSelectedFile(null)
    setKeepExistingImage(false)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrors({})

    const formData = new FormData(e.currentTarget)

    if (selectedFile) formData.set("image", selectedFile)
    formData.set("keepExistingImage", keepExistingImage.toString())

    const result = await updateEventAction(event.id, formData)

    if (result?.error) {
      setErrors({ form: result.error })
      setIsSubmitting(false)
    }
    // redirect di-handle server action
  }

  return (
    <form onSubmit={handleSubmit} className="bg-background rounded-xl border border-border p-8 space-y-6 max-w-2xl">
      {errors.form && (
        <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-lg text-sm">{errors.form}</div>
      )}

      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Event Title <span className="text-destructive">*</span>
        </Label>
        <Input id="title" name="title" defaultValue={event.title} required minLength={5} />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea id="description" name="description" defaultValue={event.description} rows={4} required minLength={20} />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">
          Location <span className="text-destructive">*</span>
        </Label>
        <Input id="location" name="location" defaultValue={event.location} required />
      </div>

      {/* Start/End Date */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="start_date">
            Start Date <span className="text-destructive">*</span>
          </Label>
          <Input id="start_date" name="start_date" type="date" defaultValue={event.event_date} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="end_date">End Date (Optional)</Label>
          <Input id="end_date" name="end_date" type="date" defaultValue={event.end_date ?? ""} />
        </div>
      </div>

      {/* Shift Duration */}
      <div className="space-y-2">
        <Label htmlFor="shift_duration">Shift Duration (Optional)</Label>
        <Input id="shift_duration" name="shift_duration" defaultValue={event.shift_duration ?? ""} />
      </div>

      {/* Slots + Category */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="slots">
            Positions Available <span className="text-destructive">*</span>
          </Label>
          <Input id="slots" name="slots" type="number" min="1" defaultValue={String(event.slots ?? 1)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <select
            id="category"
            name="category"
            defaultValue={event.category}
            required
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:ring-2 focus:ring-ring"
          >
            <option value="">Select a category</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Events">Events</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Weddings">Weddings</option>
            <option value="Corporate">Corporate</option>
            <option value="Brand Activation">Brand Activation</option>
          </select>
        </div>
      </div>

      {/* Requirements */}
      <div className="space-y-2">
        <Label htmlFor="requirements">Requirements (Optional)</Label>
        <Textarea
          id="requirements"
          name="requirements"
          defaultValue={safeJsonArrayToLines(event.requirements)}
          rows={5}
        />
        <p className="text-xs text-muted-foreground">Tip: 1 baris = 1 requirement</p>
      </div>

      {/* What we offer */}
      <div className="space-y-2">
        <Label htmlFor="what_we_offer">What We Offer (Optional)</Label>
        <Textarea
          id="what_we_offer"
          name="what_we_offer"
          defaultValue={safeJsonArrayToLines(event.what_we_offer)}
          rows={5}
        />
        <p className="text-xs text-muted-foreground">Tip: 1 baris = 1 benefit</p>
      </div>

      {/* Image */}
      <div className="space-y-2">
        <Label htmlFor="image">Event Image</Label>

        {imagePreview ? (
          <div className="relative rounded-lg overflow-hidden">
            <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-48 object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors"
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
              id="image"
              name="image"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <ImageIcon className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to upload event image
              <br />
              <span className="text-xs">PNG, JPG, or WEBP (max 5MB)</span>
            </p>
          </div>
        )}

        {errors.image && <p className="text-destructive text-sm">{errors.image}</p>}

        {/* Keep Existing Image (kalau ada image lama & user tidak remove) */}
        <input type="hidden" name="keepExistingImage" value={keepExistingImage ? "true" : "false"} />
      </div>

      <div className="flex items-center gap-4 pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving Changes...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
