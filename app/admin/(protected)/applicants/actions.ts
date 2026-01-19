"use server"

import { revalidatePath } from "next/cache"
import { updateApplicationStatus } from "@/lib/events"

export async function updateStatusAction(id: number, status: "pending" | "approved" | "rejected") {
  try {
    const success = updateApplicationStatus(id, status)
    if (!success) {
      return { error: "Application not found" }
    }

    revalidatePath("/admin/applicants")
    revalidatePath("/admin")
    return { success: true }
  } catch (error) {
    return { error: "Failed to update status" }
  }
}
