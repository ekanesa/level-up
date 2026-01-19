import AdminApplicantsClientPage from "./client-page"
import { getAllEvents } from "@/lib/events"

export const metadata = {
  title: "Applicants | Level Up Admin",
}

export const dynamic = "force-dynamic"

export default async function AdminApplicantsPage() {
  const events = getAllEvents()
  return <AdminApplicantsClientPage events={events} />
}
