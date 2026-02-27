
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EventBooking } from '@/components/sections/EventBooking';

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <EventBooking />
      </div>
      <Footer />
    </main>
  );
}
