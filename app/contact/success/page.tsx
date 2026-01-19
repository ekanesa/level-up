import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight } from "lucide-react"

export default function ContactSuccessPage() {
  return (
    <section className="min-h-screen bg-primary flex items-center justify-center py-24">
      <div className="max-w-2xl w-full mx-auto px-6">
        <div className="bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-accent-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Inquiry Sent Successfully
          </h1>

          <p className="text-primary-foreground/80 leading-relaxed mb-8">
            Thank you! Your message has been received. Our team will contact you soon with the next steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link href="/">
                Back to Home <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button variant="secondary" className="bg-white/10 text-primary-foreground hover:bg-white/15" asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
