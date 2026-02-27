import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { EventBooking } from '@/components/sections/EventBooking';
import { Gallery } from '@/components/sections/Gallery';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { QrCode } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Signature QR Section - Explanation */}
      <section className="bg-primary/5 py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
              <QrCode className="w-10 h-10 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-2xl font-headline font-bold">Quick QR Ordering</h3>
              <p className="text-muted-foreground">Scan at your table to view menu & order instantly.</p>
            </div>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-8 h-12 font-bold">
              Learn More
            </Button>
          </Link>
        </div>
      </section>
      
      <WhyChooseUs />
      
      <EventBooking />

      <Gallery />

      <Footer />
    </main>
  );
}
