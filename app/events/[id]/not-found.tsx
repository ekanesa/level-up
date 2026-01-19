import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchX } from "lucide-react"

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center pt-16">
        <div className="text-center px-4">
          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
            <SearchX className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Event Not Found</h1>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            The event you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button asChild>
            <Link href="/events">Browse All Events</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
