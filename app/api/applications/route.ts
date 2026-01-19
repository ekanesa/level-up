import { type NextRequest, NextResponse } from "next/server"
import { createApplication } from "@/lib/events"
import path from "path"
import fs from "fs"
import db from "@/lib/db"

const uploadsDir = path.join(process.cwd(), "public", "uploads")
const cvsDir = path.join(uploadsDir, "cvs")

function ensureUploadDirs() {
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
  if (!fs.existsSync(cvsDir)) fs.mkdirSync(cvsDir, { recursive: true })
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const eventId = Number.parseInt(formData.get("eventId") as string)
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const coverLetter = formData.get("coverLetter") as string
    const cvFile = formData.get("cv") as File | null

    // Validation
    if (!eventId || isNaN(eventId)) {
      return NextResponse.json({ error: "Invalid event ID" }, { status: 400 })
    }
    if (!fullName || fullName.length < 2) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 })
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    if (!phone || phone.length < 10) {
      return NextResponse.json({ error: "Valid phone number is required" }, { status: 400 })
    }

    let cvPath: string | null = null

    // Handle CV upload
    if (cvFile && cvFile.size > 0) {
      if (cvFile.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: "CV must be less than 5MB" }, { status: 400 })
      }

      ensureUploadDirs()
      const bytes = await cvFile.arrayBuffer()
      const buffer = Buffer.from(bytes)

      const ext = path.extname(cvFile.name)
      const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${ext}`
      const filePath = path.join(cvsDir, filename)

      fs.writeFileSync(filePath, buffer)
      cvPath = `/uploads/cvs/${filename}`
    }

    const application = createApplication({
      event_id: eventId,
      full_name: fullName,
      email,
      phone,
      cover_letter: coverLetter,
      cv_path: cvPath,
    })

    return NextResponse.json({ success: true, application })
  } catch (error) {
    console.error("Application error:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  } 
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const event = searchParams.get("event")
  const eventId = event ? Number(event) : null

  const rows = eventId
    ? db.prepare(`
        SELECT applications.*, events.title as event_title
        FROM applications
        LEFT JOIN events ON applications.event_id = events.id
        WHERE applications.event_id = ?
        ORDER BY applications.applied_at DESC
      `).all(eventId)
    : db.prepare(`
        SELECT applications.*, events.title as event_title
        FROM applications
        LEFT JOIN events ON applications.event_id = events.id
        ORDER BY applications.applied_at DESC
      `).all()

  return NextResponse.json({ applications: rows })
}