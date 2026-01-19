import { notFound } from "next/navigation"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ApplicationForm } from "@/components/events/application-form"
import { getEventById } from "@/lib/events"
import { MapPin, Calendar, Users, ArrowLeft, Clock, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface EventDetailPageProps {
  params: Promise<{ id: string }>
}

export const dynamic = "force-dynamic"

function formatDate(dateStr?: string | null) {
  if (!dateStr) return ""
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
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

function parseJsonList(value?: string | null): string[] {
  if (!value) return []
  try {
    const arr = JSON.parse(value)
    return Array.isArray(arr) ? arr.map(String).filter(Boolean) : []
  } catch {
    // fallback: kalau ternyata tersimpan plain text, coba pecah per baris
    return String(value)
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
  }
}

export async function generateMetadata({ params }: EventDetailPageProps) {
  const { id } = await params
  const event = getEventById(Number.parseInt(id))

  if (!event) {
    return { title: "Event Not Found | Level Up Bali" }
  }

  return {
    title: `${event.title} | Level Up Bali`,
    description: event.description,
  }
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params
  const event = getEventById(Number.parseInt(id))

  if (!event) notFound()

  // ✅ Ambil dari DB
  const requirements = parseJsonList(event.requirements)
  const benefits = parseJsonList(event.what_we_offer)

  const dateLabel = formatDateRange(event.event_date, event.end_date)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Image */}
        <div className="relative h-[300px] sm:h-[400px]">
          <img
            src={event.image || "/placeholder.svg?height=400&width=800&query=event"}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="max-w-7xl mx-auto">
              <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-white/20 mb-4" asChild>
                <Link href="/events">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Link>
              </Button>

              <Badge className="bg-accent text-accent-foreground mb-3">{event.category}</Badge>
              <h1 className="text-2xl sm:text-4xl font-bold text-white mb-2">{event.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{dateLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{event.slots} positions</span>
                </div>
                {event.shift_duration ? (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.shift_duration}</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div className="bg-background rounded-2xl border border-border p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About This Event</h2>
                  <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                </div>

                {/* Requirements (Dynamic) */}
                {requirements.length > 0 && (
                  <div className="bg-background rounded-2xl border border-border p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">Requirements</h2>
                    <ul className="space-y-3">
                      {requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits / What We Offer (Dynamic) */}
                {benefits.length > 0 && (
                  <div className="bg-background rounded-2xl border border-border p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">What We Offer</h2>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Event Details */}
                <div className="bg-muted/30 rounded-2xl p-8">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Event Details</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Event Date</p>
                        <p className="font-medium text-foreground">{dateLabel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Shift Duration</p>
                        <p className="font-medium text-foreground">{event.shift_duration || "TBA"}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium text-foreground">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Positions Available</p>
                        <p className="font-medium text-foreground">{event.slots} openings</p>
                       </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar - Application Form */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <ApplicationForm eventId={String(event.id)} eventTitle={event.title} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
