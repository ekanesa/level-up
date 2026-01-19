import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { EventCard } from "@/components/events/event-card"
import { getAllEvents } from "@/lib/events"
import { Search, Filter } from "lucide-react"

export const metadata = {
  title: "Find Jobs | Level Up Bali",
  description: "Browse available event staffing opportunities in Bali. Join our team of hospitality professionals.",
}

export const dynamic = "force-dynamic"

export default function EventsPage() {
  const events = getAllEvents()

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 text-balance">
                Find Your Next <span className="text-accent">Opportunity</span>
              </h1>
              <p className="text-primary-foreground/80 text-lg mb-8">
                Browse available positions at Bali&apos;s most prestigious events and venues
              </p>

              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events or roles..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-background text-foreground placeholder:text-muted-foreground border-0 focus:ring-2 focus:ring-accent"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-xl hover:bg-accent/90 transition-colors">
                  <Filter className="h-5 w-5" />
                  <span>Filters</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Events Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Available Positions</h2>
                <p className="text-muted-foreground">{events.length} opportunities found</p>
              </div>
              <select className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:ring-2 focus:ring-accent focus:border-accent">
                <option value="date">Sort by Date</option>
                <option value="slots">Sort by Slots</option>
                <option value="location">Sort by Location</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={{
                    id: String(event.id),
                    title: event.title,
                    description: event.description,
                    location: event.location,
                    date: event.event_date,
                    image: event.image || "/community-event.png",
                    slots: event.slots,
                    category: event.category,
                  }}
                />
              ))}
            </div>

            {/* Empty State */}
            {events.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <Search className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground">Check back later for new opportunities</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
