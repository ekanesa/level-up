import { NextResponse } from "next/server"
import { createUser } from "@/lib/auth"
import db from "@/lib/db"

export async function GET() {
  try {
    const email = "admin@levelup.com"
    const password = "admin123"
    const name = "Super Admin"

    // Cek apakah admin sudah ada
    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email)

    if (!existingUser) {
      await createUser(email, password, name)
      return NextResponse.json({
        success: true,
        message: "Admin user created successfully",
        email,
        password,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user already exists",
      email,
    })

  } catch (error: any) {
    console.error("Seed admin error:", error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    )
  }
}
