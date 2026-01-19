"use server"

import { signIn, signOut } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData): Promise<{ error?: string }> {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const result = await signIn(email, password)

  if (!result.success) {
    return { error: result.error }
  }

  redirect("/admin")
}

export async function logoutAction(): Promise<void> {
  await signOut()
  redirect("/admin/login")
}
