"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createEvent, updateEvent, deleteEvent } from "@/lib/events"
import path from "path"
import fs from "fs"

// Ensure upload directories exist
const uploadsDir = path.join(process.cwd(), "public", "uploads")
const eventsDir = path.join(uploadsDir, "events")

function ensureUploadDirs() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  if (!fs.existsSync(eventsDir)) fs.mkdirSync(eventsDir, { recursive: true })
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "_")
}

async function saveFile(file: File, subDir: string): Promise<string> {
  ensureUploadDirs()

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const ext = path.extname(file.name || "").toLowerCase() || ".jpg"
  const base = sanitizeFilename(path.basename(file.name || "image", ext))
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}-${base}${ext}`

  const targetDir = path.join(uploadsDir, subDir)
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true })

  const filePath = path.join(targetDir, filename)
  fs.writeFileSync(filePath, buffer)

  return `/uploads/${subDir}/${filename}`
}

// textarea "1 baris 1 item" -> JSON array string (atau null)
function linesToJsonArray(value: FormDataEntryValue | null): string | null {
  const text = typeof value === "string" ? value : ""
  const items = text
    .split("\n")
    .map((s) => s.trim().replace(/^-+\s*/, "")) // buang "- "
    .filter(Boolean)

  return items.length ? JSON.stringify(items) : null
}

export async function createEventAction(formData: FormData) {
  const title = ((formData.get("title") as string) || "").trim()
  const description = ((formData.get("description") as string) || "").trim()
  const location = ((formData.get("location") as string) || "").trim()
  const slots = Number.parseInt(((formData.get("slots") as string) || "1").trim()) || 1
  const category = ((formData.get("category") as string) || "").trim()

  // ✅ pakai start_date, fallback date (biar aman)
  const startDate =
    ((formData.get("start_date") as string) || "").trim() ||
    ((formData.get("date") as string) || "").trim()

  const endDate = (formData.get("end_date") as string) || null
  const shiftDuration = (formData.get("shift_duration") as string) || null
  const requirements = linesToJsonArray(formData.get("requirements"))
  const whatWeOffer = linesToJsonArray(formData.get("what_we_offer"))

  const imageFile = formData.get("image") as File | null

  // Validation
  if (!title || title.length < 5) return { error: "Title must be at least 5 characters" }
  if (!description || description.length < 20) return { error: "Description must be at least 20 characters" }
  if (!location) return { error: "Location is required" }
  if (!startDate) return { error: "Start date is required" }
  if (!category) return { error: "Category is required" }

  let imagePath: string | null = null

  // Handle image upload
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) return { error: "Image must be less than 5MB" }
    imagePath = await saveFile(imageFile, "events")
  }

  try {
    createEvent({
      title,
      description,
      location,
      event_date: startDate, // ✅ start_date disimpan ke event_date
      end_date: endDate && endDate.trim() ? endDate : null,
      shift_duration: shiftDuration && shiftDuration.trim() ? shiftDuration : null,
      requirements,
      what_we_offer: whatWeOffer,
      image: imagePath,
      slots,
      category,
    })

    revalidatePath("/admin/events")
    revalidatePath("/events")
  } catch (error) {
    console.error(error)
    return { error: "Failed to create event" }
  }

  redirect("/admin/events")
}

export async function updateEventAction(id: number, formData: FormData) {
  const title = ((formData.get("title") as string) || "").trim()
  const description = ((formData.get("description") as string) || "").trim()
  const location = ((formData.get("location") as string) || "").trim()
  const slots = Number.parseInt(((formData.get("slots") as string) || "1").trim()) || 1
  const category = ((formData.get("category") as string) || "").trim()

  const startDate =
    ((formData.get("start_date") as string) || "").trim() ||
    ((formData.get("date") as string) || "").trim()

  const endDate = (formData.get("end_date") as string) || null
  const shiftDuration = (formData.get("shift_duration") as string) || null
  const requirements = linesToJsonArray(formData.get("requirements"))
  const whatWeOffer = linesToJsonArray(formData.get("what_we_offer"))

  const imageFile = formData.get("image") as File | null
  const keepExistingImage = formData.get("keepExistingImage") === "true"

  // Validation
  if (!title || title.length < 5) return { error: "Title must be at least 5 characters" }
  if (!description || description.length < 20) return { error: "Description must be at least 20 characters" }
  if (!location) return { error: "Location is required" }
  if (!startDate) return { error: "Start date is required" }
  if (!category) return { error: "Category is required" }

  let imagePath: string | null | undefined = undefined

  // Handle image upload / remove
  if (imageFile && imageFile.size > 0) {
    if (imageFile.size > 5 * 1024 * 1024) return { error: "Image must be less than 5MB" }
    imagePath = await saveFile(imageFile, "events")
  } else if (!keepExistingImage) {
    imagePath = null
  }

  try {
    updateEvent(id, {
      title,
      description,
      location,
      event_date: startDate,
      end_date: endDate && endDate.trim() ? endDate : null,
      shift_duration: shiftDuration && shiftDuration.trim() ? shiftDuration : null,
      requirements,
      what_we_offer: whatWeOffer,
      image: imagePath,
      slots,
      category,
    })

    revalidatePath("/admin/events")
    revalidatePath(`/admin/events/${id}/edit`)
    revalidatePath("/events")
    revalidatePath(`/events/${id}`)
  } catch (error) {
    console.error(error)
    return { error: "Failed to update event" }
  }

  redirect("/admin/events")
}

export async function deleteEventAction(id: number) {
  try {
    const success = deleteEvent(id)
    if (!success) return { error: "Event not found" }

    revalidatePath("/admin/events")
    revalidatePath("/events")
    return { success: true }
  } catch (error) {
    console.error(error)
    return { error: "Failed to delete event" }
  }
}
