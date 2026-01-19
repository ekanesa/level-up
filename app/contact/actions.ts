"use server"

import db from "@/lib/db"
import { ensureContactInquiriesTable } from "@/lib/contact-inquiries"
import { redirect } from "next/navigation"

export async function submitContactAction(formData: FormData) {
  ensureContactInquiriesTable()

  const payload = {
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    event_date: String(formData.get("event_date") || "").trim(),
    event_type: String(formData.get("event_type") || "").trim(),
    location: String(formData.get("location") || "").trim(),
    staff_needed: String(formData.get("staff_needed") || "").trim(),
    budget: String(formData.get("budget") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  }

  if (!payload.name || !payload.email || !payload.message) {
    // kalau mau, bisa balikin error object juga
    redirect("/contact")
  }

  const createdAt = new Date().toISOString()

  const stmt = db.prepare(`
    INSERT INTO contact_inquiries
    (name, email, phone, event_date, event_type, location, staff_needed, budget, message, created_at, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')
  `)

  stmt.run(
    payload.name,
    payload.email,
    payload.phone || null,
    payload.event_date || null,
    payload.event_type || null,
    payload.location || null,
    payload.staff_needed || null,
    payload.budget || null,
    payload.message,
    createdAt
  )

  redirect("/contact/success")
}
