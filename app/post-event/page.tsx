import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CalendarPlus } from "lucide-react"

export default function PostEventPage() {
  return (
    <section className="min-h-screen bg-primary flex items-center justify-center py-24">
      <div className="max-w-3xl w-full mx-auto px-6">
        <div className="bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center">
            <CalendarPlus className="h-8 w-8 text-accent-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Post Your Event
          </h1>

          <p className="text-primary-foreground/80 mb-8 leading-relaxed">
            Need professional staff for your event?  
            We help you connect with verified talents in hospitality, events, and production.
            Tell us about your event and our team will assist you personally.
          </p>

          <div className="flex justify-center">
            <Button
              variant="secondary"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-6 py-6"
              asChild
            >
              <Link href="/contact">
                Continue to Contact Us
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
