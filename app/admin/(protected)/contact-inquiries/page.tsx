import db from "@/lib/db"
import { ensureContactInquiriesTable } from "@/lib/contact-inquiries"
import { requireAuth } from "@/lib/auth"
import { updateInquiryStatus } from "./action"
import StatusDropdown from "./StatusDropdown"

type Inquiry = {
  id: number
  name: string
  email: string
  phone: string | null
  event_date: string | null
  event_type: string | null
  location: string | null
  staff_needed: string | null
  budget: string | null
  message: string
  created_at: string
  status: string
}

export default async function ContactInquiriesAdminPage() {
  await requireAuth()

  ensureContactInquiriesTable()

  const rows = db
    .prepare(`SELECT * FROM contact_inquiries ORDER BY datetime(created_at) DESC`)
    .all() as Inquiry[]

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contact Inquiries</h1>
        <p className="text-sm text-muted-foreground">
          Semua pesan masuk dari halaman Contact Us / Post an Event.
        </p>
      </div>

      <div className="rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="p-3">Date</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Event</th>
                <th className="p-3">Location</th>
                <th className="p-3">Staff</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td className="p-4 text-muted-foreground" colSpan={10}>
                    Belum ada inquiry masuk.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr key={r.id} className="border-t align-top">
                    <td className="p-3 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="p-3 whitespace-nowrap">{r.name}</td>
                    <td className="p-3 whitespace-nowrap">{r.email}</td>
                    <td className="p-3 whitespace-nowrap">{r.phone || "-"}</td>
                    <td className="p-3 whitespace-nowrap">
                      {r.event_type || "-"}
                      {r.event_date ? ` • ${r.event_date}` : ""}
                    </td>
                    <td className="p-3 whitespace-nowrap">{r.location || "-"}</td>
                    <td className="p-3">{r.staff_needed || "-"}</td>
                    <td className="p-3 min-w-[320px]">{r.message}</td>
                    <td className="p-3 whitespace-nowrap">
                        <span
                            className={
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium " +
                            (r.status === "new"
                                ? "bg-yellow-100 text-yellow-800"
                                : r.status === "read"
                                ? "bg-blue-100 text-blue-800"
                                : r.status === "followed"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-green-100 text-green-800")
                            }
                        >
                            {r.status === "new"
                            ? "New"
                            : r.status === "read"
                            ? "Read"
                            : r.status === "followed"
                            ? "Followed Up"
                            : "Done"}
                        </span>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                        <StatusDropdown id={r.id} status={r.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
