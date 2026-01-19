import db, { type DbEvent, type DbApplication } from "./db"

// Event CRUD operations
export function getAllEvents(): DbEvent[] {
  const stmt = db.prepare("SELECT * FROM events ORDER BY event_date DESC")
  return stmt.all() as DbEvent[]
}

export function getEventById(id: number): DbEvent | undefined {
  const stmt = db.prepare("SELECT * FROM events WHERE id = ?")
  return stmt.get(id) as DbEvent | undefined
}

export function createEvent(data: {
  title: string
  description: string
  location: string
  event_date: string

  end_date?: string | null
  shift_duration?: string | null
  requirements?: string | null
  what_we_offer?: string | null

  image?: string | null
  slots: number
  category: string
}): DbEvent {
  const stmt = db.prepare(`
    INSERT INTO events (
      title, description, location,
      event_date, end_date, shift_duration,
      requirements, what_we_offer,
      image, slots, category
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    data.title,
    data.description,
    data.location,
    data.event_date,
    data.end_date ?? null,
    data.shift_duration ?? null,
    data.requirements ?? null,
    data.what_we_offer ?? null,
    data.image ?? null,
    data.slots,
    data.category
  )

  return getEventById(result.lastInsertRowid as number)!
}

export function updateEvent(
  id: number,
  data: {
    title?: string
    description?: string
    location?: string
    event_date?: string

    end_date?: string | null
    shift_duration?: string | null
    requirements?: string | null
    what_we_offer?: string | null

    image?: string | null
    slots?: number
    category?: string
  }
): DbEvent | undefined {
  const current = getEventById(id)
  if (!current) return undefined

  const stmt = db.prepare(`
    UPDATE events
    SET
      title = ?,
      description = ?,
      location = ?,
      event_date = ?,
      end_date = ?,
      shift_duration = ?,
      requirements = ?,
      what_we_offer = ?,
      image = ?,
      slots = ?,
      category = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `)

  stmt.run(
    data.title ?? current.title,
    data.description ?? current.description,
    data.location ?? current.location,
    data.event_date ?? current.event_date,

    data.end_date !== undefined ? data.end_date : current.end_date ?? null,
    data.shift_duration !== undefined ? data.shift_duration : current.shift_duration ?? null,
    data.requirements !== undefined ? data.requirements : current.requirements ?? null,
    data.what_we_offer !== undefined ? data.what_we_offer : current.what_we_offer ?? null,

    data.image !== undefined ? data.image : current.image,
    data.slots ?? current.slots,
    data.category ?? current.category,
    id
  )

  return getEventById(id)
}

export function deleteEvent(id: number): boolean {
  const stmt = db.prepare("DELETE FROM events WHERE id = ?")
  const result = stmt.run(id)
  return result.changes > 0
}

// Application operations
export function getAllApplications(): (DbApplication & { event_title?: string })[] {
  const stmt = db.prepare(`
    SELECT a.*, e.title as event_title
    FROM applications a
    LEFT JOIN events e ON a.event_id = e.id
    ORDER BY a.applied_at DESC
  `)
  return stmt.all() as (DbApplication & { event_title?: string })[]
}

export function getApplicationsByEventId(eventId: number): DbApplication[] {
  const stmt = db.prepare("SELECT * FROM applications WHERE event_id = ? ORDER BY applied_at DESC")
  return stmt.all(eventId) as DbApplication[]
}

export function getApplicationById(id: number): (DbApplication & { event_title?: string }) | undefined {
  const stmt = db.prepare(`
    SELECT a.*, e.title as event_title
    FROM applications a
    LEFT JOIN events e ON a.event_id = e.id
    WHERE a.id = ?
  `)
  return stmt.get(id) as (DbApplication & { event_title?: string }) | undefined
}

export function createApplication(data: {
  event_id: number
  full_name: string
  email: string
  phone: string
  cover_letter?: string
  cv_path?: string | null
}): DbApplication {
  const stmt = db.prepare(`
    INSERT INTO applications (event_id, full_name, email, phone, cover_letter, cv_path)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const result = stmt.run(
    data.event_id,
    data.full_name,
    data.email,
    data.phone,
    data.cover_letter || null,
    data.cv_path || null
  )

  return getApplicationById(result.lastInsertRowid as number)!
}

export function updateApplicationStatus(id: number, status: "pending" | "approved" | "rejected"): boolean {
  const stmt = db.prepare("UPDATE applications SET status = ? WHERE id = ?")
  const result = stmt.run(status, id)
  return result.changes > 0
}

// Stats
export function getEventStats(): { totalEvents: number; totalApplications: number; pendingApplications: number } {
  const eventsCount = (db.prepare("SELECT COUNT(*) as count FROM events").get() as { count: number }).count
  const appsCount = (db.prepare("SELECT COUNT(*) as count FROM applications").get() as { count: number }).count
  const pendingCount = (
    db.prepare("SELECT COUNT(*) as count FROM applications WHERE status = 'pending'").get() as { count: number }
  ).count

  return {
    totalEvents: eventsCount,
    totalApplications: appsCount,
    pendingApplications: pendingCount,
  }
}

export function getApplicationCountByEvent(eventId: number): number {
  const result = db.prepare("SELECT COUNT(*) as count FROM applications WHERE event_id = ?").get(eventId) as {
    count: number
  }
  return result.count
}
