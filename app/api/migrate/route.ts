import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    // Cek kolom existing
    const cols = db.prepare(`PRAGMA table_info(events)`).all() as any[]
    const has = (name: string) => cols.some((c) => c.name === name)

    // Tambah kolom kalau belum ada
    if (!has("end_date")) db.exec(`ALTER TABLE events ADD COLUMN end_date TEXT;`)
    if (!has("shift_duration")) db.exec(`ALTER TABLE events ADD COLUMN shift_duration TEXT;`)
    if (!has("requirements")) db.exec(`ALTER TABLE events ADD COLUMN requirements TEXT;`)
    if (!has("what_we_offer")) db.exec(`ALTER TABLE events ADD COLUMN what_we_offer TEXT;`)

    return NextResponse.json({ success: true, message: "Migration done ✅" })
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message }, { status: 500 })
  }
}
