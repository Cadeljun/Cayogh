"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, MessageCircle, Instagram, Facebook, Video, ExternalLink } from 'lucide-react';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h1 className="text-5xl font-headline font-extrabold">Get in <span className="text-primary">Touch</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Have questions about our drinks or want to collaborate? We'd love to hear from you. Drop us a message, chat with us on WhatsApp, or connect with our social community.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Our Location</h4>
                  <p className="text-muted-foreground">Accra, Ghana</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Phone</h4>
                  <a href="tel:+233559412097" className="text-muted-foreground hover:text-primary transition-colors block">
                    +233 (0) 559 412 097
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="text-emerald-400 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">WhatsApp</h4>
                  <a
                    href="https://wa.me/233559412097"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-emerald-400 transition-colors inline-flex items-center gap-1.5"
                  >
                    +233 559 412 097 <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-xl">Email</h4>
                  <a href="mailto:cayodrinks@gmail.com" className="text-muted-foreground hover:text-primary transition-colors block">
                    cayodrinks@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            <div className="pt-6 border-t border-white/5 space-y-4">
              <h4 className="font-headline font-bold text-lg">Follow Our Socials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://www.instagram.com/_cayodrinks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">Instagram</p>
                    <p className="text-muted-foreground">@_cayodrinks</p>
                  </div>
                </a>

                <a
                  href="https://www.tiktok.com/@cayodrinks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">TikTok</p>
                    <p className="text-muted-foreground">@cayodrinks</p>
                  </div>
                </a>

                <a
                  href="https://www.facebook.com/cayodrinks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                    <Facebook className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">Facebook</p>
                    <p className="text-muted-foreground">Cayo Drinks</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/233559412097"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-white/5 hover:border-emerald-500/40 hover:bg-white/5 transition-all group"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <p className="font-bold text-foreground group-hover:text-emerald-400 transition-colors">WhatsApp</p>
                    <p className="text-muted-foreground">+233 559 412 097</p>
                  </div>
                </a>
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
              <Button className="w-full bg-primary text-primary-foreground h-14 rounded-2xl font-bold text-lg shadow-lg">
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
