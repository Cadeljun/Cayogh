
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventBooking } from '@/components/sections/EventBooking';

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Event Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-background">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-bold text-primary uppercase tracking-widest">
            Coming Soon
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter leading-none">
            CAYO <span className="text-primary text-gradient">Prom Night</span> <br />
            <span className="text-white">2026</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            The most anticipated tropical gala of the year. Join us for a night of premium cocktails, vibrant beats, and unforgettable island vibes.
          </p>
        </div>
      </section>

      <div className="pt-0">
        <EventBooking />
      </div>
      <Footer />
    </main>
  );
}
