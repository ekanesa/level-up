import Link from "next/link"
import { Mail, Phone, MapPin, Instagram, Linkedin, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-xl">L</span>
              </div>
              <span className="font-bold text-xl">Level Up</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Bali&apos;s premier Event Support & Talent Agency. Connecting quality talent with exceptional events since
              2020.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-background/70 hover:text-accent transition-colors text-sm">
                Home
              </Link>
              <Link href="/events" className="text-background/70 hover:text-accent transition-colors text-sm">
                Find Jobs
              </Link>
              <Link href="/#about" className="text-background/70 hover:text-accent transition-colors text-sm">
                About Us
              </Link>
              <Link href="/#services" className="text-background/70 hover:text-accent transition-colors text-sm">
                Services
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span>Seminyak, Bali, Indonesia</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-center gap-3 text-background/70 text-sm">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <span>hello@levelupbali.com</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-background/50 text-sm">
            &copy; {new Date().getFullYear()} Level Up Bali. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-background/50 hover:text-accent transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-background/50 hover:text-accent transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
