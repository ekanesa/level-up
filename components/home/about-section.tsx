import { Target, Eye, Award } from "lucide-react"

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/professional-bartender-mixing-cocktails-bali.jpg"
                  alt="Professional bartender"
                  className="w-full h-[300px] object-cover"
                />
              </div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/elegant-waitstaff-serving-at-event.jpg"
                  alt="Professional waitstaff"
                  className="w-full h-[200px] object-cover"
                />
              </div>
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden">
                <img src="/corporate-event-setup-luxury-venue.jpg" alt="Event setup" className="w-full h-[200px] object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden bg-accent p-8 flex flex-col justify-center">
                <p className="text-5xl font-bold text-accent-foreground">1st</p>
                <p className="text-accent-foreground/80 mt-2 text-2xl">Support Events In Bali</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-accent font-semibold mb-2">About Level Up</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight text-balance">
                Your Trusted Partner for Event Staffing in Bali
              </h2>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              Founded in 2020, Level Up has become Bali&apos;s go-to talent agency for premium events. We bridge the gap
              between exceptional hospitality professionals and world-class venues, ensuring every event runs flawlessly
              with skilled, reliable staff.
            </p>

            <div className="space-y-6">
              {/* Mission */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Mission</h3>
                  <p className="text-muted-foreground text-sm">
                    To elevate Bali&apos;s event industry by connecting venues with vetted, professional talent while
                    providing meaningful employment opportunities.
                  </p>
                </div>
              </div>

              {/* Vision */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Vision</h3>
                  <p className="text-muted-foreground text-sm">
                    To be Southeast Asia&apos;s leading event staffing platform, known for quality, reliability, and
                    innovation.
                  </p>
                </div>
              </div>

              {/* Values */}
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Our Values</h3>
                  <p className="text-muted-foreground text-sm">
                    Excellence, integrity, and community. We treat every event as our own and every team member as
                    family.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
