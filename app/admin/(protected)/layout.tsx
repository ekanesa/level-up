import type React from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { requireAuth } from "@/lib/auth"

export const metadata = {
  title: "Admin Dashboard | Level Up Bali",
  description: "Manage events and applicants for Level Up Bali",
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminSidebar user={user} />
      <div className="lg:pl-64">
        <main className="pt-16 lg:pt-0 min-h-screen">{children}</main>
      </div>
    </div>
  )
}
