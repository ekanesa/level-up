import { Utensils, Music, Heart, Building2, Sparkles, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Utensils,
    title: "Hospitality Staff",
    description: "Professional waiters, bartenders, and catering personnel for any occasion.",
    roles: ["Waitstaff", "Bartenders", "Hosts/Hostesses", "Catering Crew"],
  },
  {
    icon: Music,
    title: "Entertainment Events",
    description: "Experienced crew for concerts, festivals, and live entertainment venues.",
    roles: ["Stage Crew", "Security", "Ticketing", "Guest Services"],
  },
  {
    icon: Heart,
    title: "Wedding Services",
    description: "Dedicated teams to make your special day absolutely perfect.",
    roles: ["Wedding Coordinators", "Setup Crew", "Service Staff", "Cleanup Teams"],
  },
  {
    icon: Building2,
    title: "Corporate Events",
    description: "Professional personnel for conferences, galas, and business functions.",
    roles: ["Event Coordinators", "Registration Staff", "AV Support", "Ushers"],
  },
  {
    icon: Sparkles,
    title: "Beach Clubs & Resorts",
    description: "Top-tier hospitality talent for Bali&apos;s premium venues.",
    roles: ["Pool Attendants", "VIP Servers", "Bar Staff", "Guest Relations"],
  },
  {
    icon: Camera,
    title: "Brand Activations",
    description: "Engaging brand ambassadors and promotional staff.",
    roles: ["Brand Ambassadors", "Promo Models", "Samplers", "Demonstrators"],
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent font-semibold mb-2">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Staffing Solutions for Every Event
          </h2>
          <p className="text-muted-foreground">
            From intimate gatherings to large-scale festivals, we have the right talent for your needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-muted/30 rounded-2xl p-8 hover:bg-primary transition-all duration-300 overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-primary-foreground/10 transition-colors">
                  <service.icon className="h-7 w-7 text-accent group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-foreground mb-3 transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground group-hover:text-primary-foreground/80 text-sm mb-4 transition-colors">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.roles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-3 py-1 rounded-full bg-background/50 text-muted-foreground group-hover:bg-primary-foreground/20 group-hover:text-primary-foreground transition-colors"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link href="/events">View Available Positions</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
