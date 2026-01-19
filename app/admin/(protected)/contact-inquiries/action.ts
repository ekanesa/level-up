"use server"

import db from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function updateInquiryStatus(formData: FormData) {
  const id = Number(formData.get("id"))
  const status = String(formData.get("status"))

  if (!id || !["new", "read", "followed", "done"].includes(status)) return

  db.prepare(`UPDATE contact_inquiries SET status = ? WHERE id = ?`).run(status, id)
  revalidatePath("/admin/contact-inquiries")
}
