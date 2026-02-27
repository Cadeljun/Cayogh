
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from 'lucide-react';

export function EventBooking() {
  return (
    <section id="events" className="bg-tropical-gradient py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 text-secondary font-bold">
            <Calendar className="w-5 h-5" />
            Events & Catering
          </div>
          <h2 className="text-4xl md:text-6xl font-headline font-extrabold leading-tight">
            Elevate Your <span className="text-secondary">Celebration</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Hire Cayo Drinks for your weddings, festivals, corporate events, and parties. We bring our premium mobile bar and expert mixologists to you, ensuring an unforgettable beverage experience for your guests.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="text-xl font-bold">Custom Menu</h4>
              <p className="text-sm text-muted-foreground">Personalized drink lists matching your event theme.</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold">Expert Mixology</h4>
              <p className="text-sm text-muted-foreground">Professional bartenders dedicated to craft.</p>
            </div>
          </div>
        </div>

        <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <h3 className="text-2xl font-headline font-bold mb-8 text-center">Book Your Event</h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your Name</Label>
                <Input placeholder="John Doe" className="bg-background h-12" />
              </div>
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input type="email" placeholder="john@example.com" className="bg-background h-12" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Event Type</Label>
              <Input placeholder="e.g., Wedding, Corporate Gala" className="bg-background h-12" />
            </div>
            <div className="space-y-2">
              <Label>How can we help?</Label>
              <Textarea placeholder="Tell us more about your event..." className="bg-background min-h-[120px]" />
            </div>
            <Button className="w-full bg-secondary text-white hover:bg-secondary/90 h-14 text-lg font-bold rounded-2xl shadow-xl shadow-secondary/20">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
