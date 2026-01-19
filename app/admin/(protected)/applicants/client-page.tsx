"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, Phone, FileText, Eye, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ApplicantStatusDropdown } from "@/components/admin/applicant-status-dropdown"
import { useState, useEffect } from "react"

interface Event {
  id: number
  title: string
}

interface Application {
  id: number
  full_name: string
  email: string
  phone: string
  cover_letter: string | null
  cv_path: string | null
  applied_at: string
  status: string
  event_id: number
  event_title?: string
}

interface AdminApplicantsClientPageProps {
  events: Event[]
}

export default function AdminApplicantsClientPage({ events }: AdminApplicantsClientPageProps) {
  const [eventFilter, setEventFilter] = useState<string>("")
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true)
      const url = eventFilter
        ? `/api/applications?event=${eventFilter}`
        : `/api/applications`

      const res = await fetch(url)
      const data = await res.json()
      setApplications(data.applications || [])
      setLoading(false)
    }

    fetchApplications()
  }, [eventFilter])

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Applicants</h1>
          <p className="text-muted-foreground">Review and manage job applications</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="h-10 px-3 rounded-md border border-input bg-background text-sm"
            value={eventFilter}
            onChange={(e) => setEventFilter(e.target.value)}
          >
            <option value="">All Events</option>
            {events.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-background rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-4 px-6 text-left">Applicant</th>
                <th className="py-4 px-6 text-left">Event</th>
                <th className="py-4 px-6 text-left">Contact</th>
                <th className="py-4 px-6 text-left">CV</th>
                <th className="py-4 px-6 text-left">Applied</th>
                <th className="py-4 px-6 text-left">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-b hover:bg-muted/30">
                  <td className="py-4 px-6">
                    <p className="font-medium">{app.full_name}</p>
                    <p className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {app.cover_letter || "No note"}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="outline">{app.event_title || "Unknown"}</Badge>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <div className="flex items-center gap-2"><Mail className="h-3 w-3" />{app.email}</div>
                    <div className="flex items-center gap-2"><Phone className="h-3 w-3" />{app.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    {app.cv_path ? (
                      <a href={app.cv_path} target="_blank" className="text-primary flex items-center gap-1">
                        <Download className="h-3 w-3" /> Download
                      </a>
                    ) : "No CV"}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {new Date(app.applied_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">{getStatusBadge(app.status)}</td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <ApplicantStatusDropdown applicationId={app.id} currentStatus={app.status} />
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/applicants/${app.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!loading && applications.length === 0 && (
          <div className="text-center py-16">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold">No applications yet</h3>
            <p className="text-muted-foreground">Applications will appear here once candidates apply</p>
          </div>
        )}
      </div>
    </div>
  )
}
