// Mock data for events and applications
export interface Event {
  id: string
  title: string
  description: string
  location: string
  date: string
  image: string
  slots: number
  category: string
}

export interface Application {
  id: string
  eventId: string
  fullName: string
  email: string
  phone: string
  coverLetter: string
  resumeUrl?: string
  appliedAt: string
}

export const events: Event[] = [
  {
    id: "1",
    title: "Beach Club Grand Opening",
    description:
      "Premium beach club seeking experienced bartenders and servers for exclusive grand opening event. Must have cocktail experience and excellent English communication skills.",
    location: "Seminyak, Bali",
    date: "2026-02-15",
    image: "/luxury-beach-club-event-bali-sunset.jpg",
    slots: 12,
    category: "Hospitality",
  },
  {
    id: "2",
    title: "Corporate Gala Dinner",
    description:
      "High-end corporate event requiring professional waitstaff and event coordinators. Black tie service experience preferred.",
    location: "Nusa Dua, Bali",
    date: "2026-02-20",
    image: "/elegant-corporate-gala-dinner-event.jpg",
    slots: 20,
    category: "Events",
  },
  {
    id: "3",
    title: "Music Festival Staff",
    description:
      "Multi-day music festival needs energetic crew for various roles including security, ticketing, and guest services.",
    location: "Canggu, Bali",
    date: "2026-03-01",
    image: "/outdoor-music-festival-bali-tropical.jpg",
    slots: 50,
    category: "Entertainment",
  },
  {
    id: "4",
    title: "Resort Wedding Event",
    description:
      "Luxury resort wedding requiring experienced catering staff, photographers assistants, and event setup crew.",
    location: "Ubud, Bali",
    date: "2026-03-10",
    image: "/luxury-bali-resort-wedding-venue.jpg",
    slots: 15,
    category: "Weddings",
  },
]

export const applications: Application[] = [
  {
    id: "1",
    eventId: "1",
    fullName: "Made Surya",
    email: "made.surya@email.com",
    phone: "+62 812 3456 7890",
    coverLetter: "I have 3 years of bartending experience at top Bali venues...",
    appliedAt: "2026-01-10",
  },
  {
    id: "2",
    eventId: "1",
    fullName: "Nyoman Dewi",
    email: "nyoman.dewi@email.com",
    phone: "+62 813 9876 5432",
    coverLetter: "Experienced server with fluent English and Japanese...",
    appliedAt: "2026-01-11",
  },
  {
    id: "3",
    eventId: "2",
    fullName: "Ketut Ari",
    email: "ketut.ari@email.com",
    phone: "+62 857 1234 5678",
    coverLetter: "Former event coordinator at 5-star hotels...",
    appliedAt: "2026-01-12",
  },
]
