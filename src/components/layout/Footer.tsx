
"use client";

import Link from 'next/link';
import { Instagram, Facebook, MessageCircle, Mail, MapPin, Phone, Video } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-headline font-extrabold tracking-tighter text-primary">
                CAYO <span className="text-foreground">DRINKS</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Premium tropical beverages crafted for unforgettable moments. We bring the island to you, one sip at a time.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/_cayodrinks/"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram: @_cayodrinks"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@cayodrinks"
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok: @cayodrinks"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Video className="w-5 h-5" />
              </a>
              <a
                href="https://www.facebook.com/cayodrinks"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook: Cayo Drinks"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/233559412097"
                target="_blank"
                rel="noopener noreferrer"
                title="WhatsApp: +233 559 412 097"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 hover:text-emerald-400 transition-all"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors">Menu</Link></li>
              <li><Link href="/events" className="text-muted-foreground hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/process" className="text-muted-foreground hover:text-primary transition-colors">Behind the Mixology</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">Contact Info</h4>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:+233559412097" className="hover:text-primary transition-colors">+233 (0) 559 412 097</a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href="https://wa.me/233559412097" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  WhatsApp: +233 559 412 097
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:cayodrinks@gmail.com" className="hover:text-primary transition-colors">cayodrinks@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-xl font-bold">Newsletter</h4>
            <p className="text-muted-foreground text-sm">Join our mailing list for exclusive recipes and event updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full text-sm focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-primary-foreground rounded-xl px-4 py-2 font-bold hover:bg-primary/90 transition-all">Go</button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
          <p>© 2024 Cayo Drinks. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
