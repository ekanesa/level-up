import { Users, Shield, Clock, Award, CheckCircle2, Zap } from "lucide-react"

const valueProps = [
  {
    icon: Users,
    title: "High Quality Talent",
    description: "Every team member is thoroughly vetted, trained, and experienced in premium hospitality settings.",
    benefits: ["Background checked", "Skill verified", "Professionally trained"],
  },
  {
    icon: Shield,
    title: "Payment Security",
    description: "Secure payment processing for both clients and talent. On-time payments guaranteed, every time.",
    benefits: ["Escrow protection", "Transparent pricing", "Timely disbursement"],
  },
  {
    icon: Clock,
    title: "Reliability & Punctuality",
    description:
      "Our talent arrives prepared and on time. We maintain strict attendance standards and backup protocols.",
    benefits: ["Backup staff ready", "Real-time tracking", "24/7 support"],
  },
  {
    icon: Award,
    title: "Premium Service",
    description: "From planning to execution, we deliver white-glove service that exceeds expectations.",
    benefits: ["Dedicated coordinator", "Quality assurance", "Post-event feedback"],
  },
  {
    icon: CheckCircle2,
    title: "Compliance & Insurance",
    description: "Full legal compliance with local regulations and comprehensive insurance coverage for peace of mind.",
    benefits: ["Fully insured", "Tax compliant", "Legal contracts"],
  },
  {
    icon: Zap,
    title: "Fast Matching",
    description: "Our smart matching system connects you with the right talent within hours, not days.",
    benefits: ["AI-powered matching", "Instant quotes", "Same-day booking"],
  },
]

export function ValuePropsSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-accent font-semibold mb-2">Why Choose Us</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">The Level Up Advantage</h2>
          <p className="text-muted-foreground">
            We&apos;ve built our reputation on delivering exceptional value to both event organizers and talent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="bg-background p-8 rounded-2xl border border-border hover:border-accent/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <prop.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{prop.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{prop.description}</p>
              <ul className="space-y-2">
                {prop.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
