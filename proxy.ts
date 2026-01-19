// proxy.ts (root)
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("session_id")?.value
  const { pathname } = request.nextUrl

  const isAdminRoute = pathname.startsWith("/admin")
  const isLoginPage = pathname === "/admin/login"

  // ✅ protect /admin/*
  if (isAdminRoute && !isLoginPage && !sessionId) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = "/admin/login"
    loginUrl.searchParams.set("next", pathname) // optional: balik setelah login
    return NextResponse.redirect(loginUrl)
  }

  // ✅ block /admin/login kalau sudah login
  if (isLoginPage && sessionId) {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = "/admin"
    adminUrl.search = ""
    return NextResponse.redirect(adminUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}
