import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { submitContactAction } from "./actions"

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-primary py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3">Contact Us</h1>
          <p className="text-primary-foreground/80 leading-relaxed">
            Tell us about your event and what kind of support you need. We’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-3xl p-8 md:p-10 border border-primary-foreground/20">
              <h2 className="text-xl font-semibold text-primary-foreground mb-6">Event Inquiry Form</h2>

              <form action={submitContactAction} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="name">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="email">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@email.com"
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="phone">
                      Phone / WhatsApp
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      placeholder="+62..."
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="event_date">
                      Event Date
                    </label>
                    <input
                      id="event_date"
                      name="event_date"
                      type="date"
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="event_type">
                      Event Type
                    </label>
                    <input
                      id="event_type"
                      name="event_type"
                      placeholder="Wedding, Corporate, Festival..."
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="location">
                      Location
                    </label>
                    <input
                      id="location"
                      name="location"
                      placeholder="Seminyak, Ubud, Canggu..."
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="staff_needed">
                      Staff Needed
                    </label>
                    <input
                      id="staff_needed"
                      name="staff_needed"
                      placeholder="e.g. 6 waiters, 2 bartenders..."
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="budget">
                      Estimated Budget (optional)
                    </label>
                    <input
                      id="budget"
                      name="budget"
                      placeholder="IDR ..."
                      className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-primary-foreground/80 mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us the details: schedule, roles, dresscode, requirements, etc."
                    className="w-full rounded-xl bg-white/10 border border-primary-foreground/20 px-4 py-3 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Send Inquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>

          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-primary-foreground/10 backdrop-blur rounded-3xl p-8 border border-primary-foreground/20">
              <h3 className="text-lg font-semibold text-primary-foreground mb-4">Get in touch</h3>

              <div className="space-y-4 text-primary-foreground/80">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 mt-0.5 text-accent" />
                  <div>
                    <div className="text-sm font-medium text-primary-foreground">Address</div>
                    <div className="text-sm">Seminyak, Bali, Indonesia</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 mt-0.5 text-accent" />
                  <div>
                    <div className="text-sm font-medium text-primary-foreground">Phone / WhatsApp</div>
                    <div className="text-sm">+62 812 3456 7890</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 mt-0.5 text-accent" />
                  <div>
                    <div className="text-sm font-medium text-primary-foreground">Email</div>
                    <div className="text-sm">hello@levelupbali.com</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-foreground/10 backdrop-blur rounded-3xl p-8 border border-primary-foreground/20">
              <h3 className="text-lg font-semibold text-primary-foreground mb-3">What happens next?</h3>
              <p className="text-sm text-primary-foreground/80 leading-relaxed">
                After you submit, our team will review your needs and contact you with the next steps—availability,
                recommended staffing, and timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
