import { notFound } from "next/navigation"
import Link from "next/link"
import { getEventById } from "@/lib/events"
import { EditEventForm } from "@/components/admin/edit-event-form"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EditEventPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: EditEventPageProps) {
  const { id } = await params
  const event = getEventById(Number.parseInt(id))

  if (!event) {
    return { title: "Event Not Found | Level Up Admin" }
  }

  return {
    title: `Edit ${event.title} | Level Up Admin`,
  }
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params
  const event = getEventById(Number.parseInt(id))

  if (!event) {
    notFound()
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className="mb-4" asChild>
          <Link href="/admin/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Edit Event</h1>
        <p className="text-muted-foreground">Update event details</p>
      </div>

      <EditEventForm event={event} />
    </div>
  )
}
