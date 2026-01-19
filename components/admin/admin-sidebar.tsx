"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Calendar, Users, Plus, Settings, LogOut, Menu, X, User, Phone } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { logoutAction } from "@/app/admin/login/actions"

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/events", icon: Calendar, label: "Events" },
  { href: "/admin/contact-inquiries", icon: Phone, label: "Contact Inquiries" },
  { href: "/admin/events/create", icon: Plus, label: "Create Event" },
  { href: "/admin/applicants", icon: Users, label: "Applicants" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

interface AdminSidebarProps {
  user: {
    id: number
    email: string
    name: string
    role: string
  }
}

export function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-primary border-b border-primary-foreground/10 flex items-center justify-between px-4 z-50">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-accent-foreground font-bold text-sm">L</span>
          </div>
          <span className="font-bold text-primary-foreground">Admin</span>
        </Link>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 text-primary-foreground"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-foreground/50 z-40" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 bg-primary z-50 transform transition-transform duration-300 lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-primary-foreground/10">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">L</span>
              </div>
              <div>
                <span className="font-bold text-primary-foreground block">Level Up</span>
                <span className="text-xs text-primary-foreground/60">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 px-4 space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="p-4 border-t border-primary-foreground/10 space-y-3">
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-primary-foreground truncate">{user.name}</p>
                <p className="text-xs text-primary-foreground/60 truncate">{user.email}</p>
              </div>
            </div>

            {/* Logout Button */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-300 hover:bg-red-500/20 hover:text-red-200 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </form>

            {/* Back to Website */}
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground transition-colors"
            >
              <span className="h-5 w-5 text-center">←</span>
              Back to Website
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
