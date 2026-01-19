import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Briefcase, Building } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* For Talent */}
          <div className="bg-primary-foreground/10 backdrop-blur rounded-2xl p-10 border border-primary-foreground/20">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-6">
              <Briefcase className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-primary-foreground mb-4">Looking for Work?</h3>
            <p className="text-primary-foreground/80 mb-6 leading-relaxed">
              Join Bali&apos;s top event professionals. Get access to premium gigs, secure payments, and build your
              career in hospitality.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Flexible scheduling
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Competitive pay rates
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                Professional development
              </li>
            </ul>
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/events">
                Browse Jobs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* For Organizers */}
          <div className="bg-accent rounded-2xl p-10">
            <div className="w-14 h-14 rounded-xl bg-accent-foreground/10 flex items-center justify-center mb-6">
              <Building className="h-7 w-7 text-accent-foreground" />
            </div>
            <h3 className="text-2xl font-bold text-accent-foreground mb-4">Need Event Staff?</h3>
            <p className="text-accent-foreground/80 mb-6 leading-relaxed">
              Access our network of verified professionals. Post your event and get matched with qualified talent
              instantly.
            </p>
            <ul className="space-y-2 mb-8">
              <li className="flex items-center gap-2 text-accent-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                Vetted professionals
              </li>
              <li className="flex items-center gap-2 text-accent-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                Quick turnaround
              </li>
              <li className="flex items-center gap-2 text-accent-foreground/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-foreground" />
                Dedicated support
              </li>
            </ul>
            <Button
              variant="secondary"
              className="bg-accent-foreground text-accent hover:bg-accent-foreground/90"
              asChild
            >
              <Link href="/post-event">
                Post an Event
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
