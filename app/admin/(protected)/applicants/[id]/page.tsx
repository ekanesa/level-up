import { notFound } from "next/navigation"
import Link from "next/link"
import { getApplicationById, getEventById } from "@/lib/events"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, Calendar, FileText, Download, User } from "lucide-react"
import { ApplicantStatusDropdown } from "@/components/admin/applicant-status-dropdown"

interface ApplicantDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: ApplicantDetailPageProps) {
  const { id } = await params
  const application = getApplicationById(Number.parseInt(id))

  if (!application) {
    return { title: "Applicant Not Found | Level Up Admin" }
  }

  return {
    title: `${application.full_name} | Level Up Admin`,
  }
}

export default async function ApplicantDetailPage({ params }: ApplicantDetailPageProps) {
  const { id } = await params
  const application = getApplicationById(Number.parseInt(id))

  if (!application) {
    notFound()
  }

  const event = getEventById(application.event_id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Approved</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Rejected</Badge>
      default:
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Pending</Badge>
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/admin/applicants">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applicants
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{application.full_name}</h1>
            <p className="text-muted-foreground">Application for {application.event_title}</p>
          </div>
          <div className="flex items-center gap-3">
            {getStatusBadge(application.status)}
            <ApplicantStatusDropdown applicationId={application.id} currentStatus={application.status} />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Contact Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground">{application.full_name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href={`mailto:${application.email}`} className="font-medium text-primary hover:underline">
                    {application.email}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href={`tel:${application.phone}`} className="font-medium text-primary hover:underline">
                    {application.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied On</p>
                  <p className="font-medium text-foreground">
                    {new Date(application.applied_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Cover Letter</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground">
              {application.cover_letter ? (
                <p className="whitespace-pre-wrap">{application.cover_letter}</p>
              ) : (
                <p className="italic">No cover letter provided</p>
              )}
            </div>
          </div>

          {/* CV Section */}
          <div className="bg-background rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Resume / CV</h2>
            {application.cv_path ? (
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Uploaded CV</p>
                    <p className="text-sm text-muted-foreground">Click to download or view</p>
                  </div>
                </div>
                <Button asChild>
                  <a href={application.cv_path} target="_blank" rel="noopener noreferrer" download>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </a>
                </Button>
              </div>
            ) : (
              <div className="text-center py-8 bg-muted/30 rounded-lg">
                <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">No CV uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Event Info */}
        <div className="lg:col-span-1">
          <div className="bg-background rounded-xl border border-border p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-foreground mb-4">Event Details</h2>
            {event ? (
              <div className="space-y-4">
                {event.image && (
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                )}
                <div>
                  <p className="font-medium text-foreground">{event.title}</p>
                  <Badge variant="outline" className="mt-1">
                    {event.category}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>Location: {event.location}</p>
                  <p>
                    Date:{" "}
                    {new Date(event.event_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p>Positions: {event.slots}</p>
                </div>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href={`/events/${event.id}`}>View Event Page</Link>
                </Button>
              </div>
            ) : (
              <p className="text-muted-foreground">Event not found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
