
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-5xl font-headline font-extrabold">Get in <span className="text-primary">Touch</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our drinks or want to collaborate? We'd love to hear from you. Drop us a message or visit us at our main location.
            </p>
            
            <div className="space-y-6">
               <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Our Headquarters</h4>
                  <p className="text-muted-foreground">123 Tropical Way, Accra, Ghana</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Phone</h4>
                  <p className="text-muted-foreground">+233 (0) 555 123 456</p>
                </div>
              </div>
               <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Email</h4>
                  <p className="text-muted-foreground">hello@cayodrinks.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="Jane Doe" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" placeholder="jane@example.com" className="bg-background" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="How can we help you?" className="bg-background min-h-[150px]" />
              </div>
              <Button className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-lg">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
