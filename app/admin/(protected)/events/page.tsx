import Link from "next/link"
import { getAllEvents, getApplicationCountByEvent } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, MapPin, Users, MoreVertical, Eye, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DeleteEventButton } from "@/components/admin/delete-event-button"

export const metadata = {
  title: "Manage Events | Level Up Admin",
}

export const dynamic = "force-dynamic"

export default function AdminEventsPage() {
  const events = getAllEvents()

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground">Manage your event listings</p>
        </div>
        <Button asChild>
          <Link href="/admin/events/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Event
          </Link>
        </Button>
      </div>

      {/* Events Grid */}
      {events.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {events.map((event) => {
            const appCount = getApplicationCountByEvent(event.id)
            return (
              <div key={event.id} className="bg-background rounded-xl border border-border overflow-hidden">
                <div className="relative h-40">
                  <img
                    src={event.image || "/placeholder.svg?height=160&width=320&query=event"}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-accent text-accent-foreground">{event.category}</Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-8 h-8 rounded-full bg-background/90 flex items-center justify-center hover:bg-background transition-colors">
                          <MoreVertical className="h-4 w-4 text-foreground" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/events/${event.id}`} className="cursor-pointer">
                            <Eye className="mr-2 h-4 w-4" />
                            View Public Page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/events/${event.id}/edit`} className="cursor-pointer">
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Event
                          </Link>
                        </DropdownMenuItem>
                        <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <h3 className="font-semibold text-foreground line-clamp-1">{event.title}</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.slots} positions</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-muted-foreground">{appCount} applicants</span>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/applicants?event=${event.id}`}>View Applicants</Link>
                    </Button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-16 bg-background rounded-xl border border-border">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No events yet</h3>
          <p className="text-muted-foreground mb-4">Create your first event to start receiving applications</p>
          <Button asChild>
            <Link href="/admin/events/create">
              <Plus className="mr-2 h-4 w-4" />
              Create Event
            </Link>
          </Button>
        </div>
      )}
    </div>
  )
}
