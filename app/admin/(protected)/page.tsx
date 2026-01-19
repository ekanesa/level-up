import { StatsCard } from "@/components/admin/stats-card"
import { getAllEvents, getAllApplications, getEventStats } from "@/lib/events"
import { Calendar, Users, CheckCircle, Clock, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default function AdminDashboardPage() {
  const events = getAllEvents()
  const applications = getAllApplications()
  const stats = getEventStats()

  const totalSlots = events.reduce((acc, event) => acc + event.slots, 0)
  const recentApplications = applications.slice(0, 5)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700">Approved</span>
      case "rejected":
        return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">Rejected</span>
      default:
        return <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-700">Pending</span>
    }
  }

  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with Level Up.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Active Events"
          value={stats.totalEvents}
          description="Currently accepting applications"
          icon={Calendar}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          description="All time"
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard title="Open Positions" value={totalSlots} description="Across all events" icon={CheckCircle} />
        <StatsCard
          title="Pending Review"
          value={stats.pendingApplications}
          description="Awaiting decision"
          icon={TrendingUp}
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="bg-background rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Button className="w-full justify-start" asChild>
              <Link href="/admin/events/create">
                <Calendar className="mr-2 h-4 w-4" />
                Create New Event
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/admin/applicants">
                <Users className="mr-2 h-4 w-4" />
                View All Applicants
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" asChild>
              <Link href="/admin/events">
                <Eye className="mr-2 h-4 w-4" />
                Manage Events
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-background rounded-xl border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Applications</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/applicants">View All</Link>
            </Button>
          </div>

          {recentApplications.length > 0 ? (
            <div className="space-y-4">
              {recentApplications.map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {app.full_name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{app.full_name}</p>
                      <p className="text-sm text-muted-foreground">{app.event_title || "Unknown Event"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(app.applied_at).toLocaleDateString()}
                    </span>
                    {getStatusBadge(app.status)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No applications yet</p>
          )}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="mt-6 bg-background rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Upcoming Events</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/events">View All</Link>
          </Button>
        </div>

        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Event</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Positions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Applications</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => {
                  const eventApps = applications.filter((a) => a.event_id === event.id)
                  return (
                    <tr key={event.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.image || "/placeholder.svg?height=40&width=40&query=event"}
                            alt={event.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="font-medium text-foreground">{event.title}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{event.location}</td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{event.slots}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {eventApps.length} applicants
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">
            No events yet. Create your first event to get started.
          </p>
        )}
      </div>
    </div>
  )
}
