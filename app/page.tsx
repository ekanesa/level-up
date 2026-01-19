import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/home/hero-section"
import { AboutSection } from "@/components/home/about-section"
import { ValuePropsSection } from "@/components/home/value-props-section"
import { ServicesSection } from "@/components/home/services-section"
import { CTASection } from "@/components/home/cta-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ValuePropsSection />
        <ServicesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
