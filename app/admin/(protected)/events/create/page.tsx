import { CreateEventForm } from "@/components/admin/create-event-form"

export const metadata = {
  title: "Create Event | Level Up Admin",
}

export default function CreateEventPage() {
  return (
    <div className="p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create New Event</h1>
        <p className="text-muted-foreground">Fill in the details to publish a new event listing</p>
      </div>

      <CreateEventForm />
    </div>
  )
}
