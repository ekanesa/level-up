import db from "./db"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export interface User {
  id: number
  email: string
  name: string
  role: string
}

// Generate a random session ID
function generateSessionId(): string {
  return crypto.randomUUID()
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Create a new user (for seeding)
export async function createUser(email: string, password: string, name: string): Promise<User | null> {
  try {
    const hashedPassword = await hashPassword(password)
    const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)")
    const result = stmt.run(email, hashedPassword, name)

    return {
      id: result.lastInsertRowid as number,
      email,
      name,
      role: "admin",
    }
  } catch (error) {
    // User might already exist
    console.error("Error creating user:", error)
    return null
  }
}

// Sign in user
export async function signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?")
    const user = stmt.get(email) as
      | { id: number; email: string; password: string; name: string; role: string }
      | undefined

    if (!user) {
      return { success: false, error: "Invalid email or password" }
    }

    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return { success: false, error: "Invalid email or password" }
    }

    // Create session
    const sessionId = generateSessionId()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
    const sessionStmt = db.prepare("INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)")
    sessionStmt.run(sessionId, user.id, expiresAt.toISOString())

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    })

    return { success: true }
  } catch (error) {
    console.error("Sign in error:", error)
    return { success: false, error: "An error occurred during sign in" }
  }
}

// Sign out user
export async function signOut(): Promise<void> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session_id")?.value

  if (sessionId) {
    const stmt = db.prepare("DELETE FROM sessions WHERE id = ?")
    stmt.run(sessionId)
  }

  cookieStore.delete("session_id")
}

// Get current user from session
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies()
    const sessionId = cookieStore.get("session_id")?.value

    if (!sessionId) {
      return null
    }

    const stmt = db.prepare(`
      SELECT users.id, users.email, users.name, users.role 
      FROM sessions 
      JOIN users ON sessions.user_id = users.id 
      WHERE sessions.id = ? AND sessions.expires_at > datetime('now')
    `)
    const user = stmt.get(sessionId) as User | undefined

    return user || null
  } catch (error) {
    console.error("Get current user error:", error)
    return null
  }
}

// Require authentication (redirect if not authenticated)
export async function requireAuth(): Promise<User> {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/admin/login")
  }
  return user
}

// Check if user exists (for seed check)
export function userExists(email: string): boolean {
  const stmt = db.prepare("SELECT id FROM users WHERE email = ?")
  return !!stmt.get(email)
}
