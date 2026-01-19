import { getCurrentUser } from "@/lib/auth"
import { redirect } from "next/navigation"
import { LoginForm } from "@/components/admin/login-form"

export const metadata = {
  title: "Admin Login | Level Up Bali",
  description: "Sign in to the admin dashboard",
}

export default async function AdminLoginPage() {
  // Redirect if already logged in
  const user = await getCurrentUser()
  if (user) {
    redirect("/admin")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-navy/95 to-navy/90 p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Level Up</h1>
          <p className="text-white/60 mt-2">Admin Dashboard</p>
        </div>

        {/* Login Card */}
        <LoginForm />

        {/* Demo credentials hint */}
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <p className="text-white/80 text-sm text-center">
            <strong className="text-gold">Demo credentials:</strong>
            <br />
            Email: admin@levelup.com
            <br />
            Password: admin123
          </p>
        </div>
      </div>
    </div>
  )
}
