// Run this script to create the initial admin user
// Execute with: npx tsx scripts/seed-admin.ts

import { createUser, userExists } from "../lib/auth"
import fs from "fs"
import path from "path"

async function seedAdmin() {
  // Ensure data directory exists
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }

  const adminEmail = "admin@levelup.com"
  const adminPassword = "admin123"
  const adminName = "Admin User"

  if (userExists(adminEmail)) {
    console.log("Admin user already exists!")
    return
  }

  const user = await createUser(adminEmail, adminPassword, adminName)

  if (user) {
    console.log("Admin user created successfully!")
    console.log("Email:", adminEmail)
    console.log("Password:", adminPassword)
  } else {
    console.error("Failed to create admin user")
  }
}

seedAdmin()
