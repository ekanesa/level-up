import Link from "next/link"
import { MapPin, Calendar, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { DbEvent } from "@/lib/db"

interface EventCardProps {
  event: DbEvent
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr // fallback kalau format bukan ISO
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function formatDateRange(start?: string | null, end?: string | null) {
  const s = formatDate(start)
  const e = formatDate(end)
  if (s && e) return `${s} — ${e}`
  return s || e || "TBA"
}

export function EventCard({ event }: EventCardProps) {
  const dateLabel = formatDateRange(event.event_date, event.end_date)

  return (
    <div className="group bg-background rounded-2xl border border-border overflow-hidden hover:border-accent/50 hover:shadow-xl transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
        <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
          {event.category}
        </Badge>
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {event.title}
        </h3>

        <p className="text-muted-foreground text-sm line-clamp-2">{event.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-accent flex-shrink-0" />
            <span>{dateLabel}</span>
          </div>

          {event.shift_duration ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4 text-accent flex-shrink-0" />
              <span>{event.shift_duration}</span>
            </div>
          ) : null}

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4 text-accent flex-shrink-0" />
            <span>{event.slots} positions available</span>
          </div>
        </div>

        <Button className="w-full" asChild>
          <Link href={`/events/${event.id}`}>View Details & Apply</Link>
        </Button>
      </div>
    </div>
  )
}
