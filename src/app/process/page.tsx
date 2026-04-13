
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Image from 'next/image';
import { Play, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const mixologyVideos = [
  { id: 1, title: 'The Perfect Pour', duration: '2:30', hint: 'cocktail pouring' },
  { id: 2, title: 'Tropical Infusions', duration: '3:15', hint: 'fruit infusion' },
  { id: 3, title: 'Ice Crafting', duration: '1:45', hint: 'clear ice' },
  { id: 4, title: 'Signature Shakes', duration: '4:00', hint: 'milkshake prep' },
  { id: 5, title: 'Garnish Mastery', duration: '2:50', hint: 'drink garnish' },
  { id: 6, title: 'The Smoke & Mirror', duration: '3:30', hint: 'smoked cocktail' },
];

export default function ProcessPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-4 mb-16 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-headline font-extrabold">
            Behind the <span className="text-primary">Mixology</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Explore the craft and passion that goes into every Cayo Drink. From fresh fruit selection to the final artistic garnish.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mixologyVideos.map((video) => (
            <div key={video.id} className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all hover:border-primary/50">
              <div className="relative aspect-video">
                <Image
                  src={`https://picsum.photos/seed/mixology-${video.id}/800/450`}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={video.hint}
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                    <Play className="fill-primary-foreground text-primary-foreground w-6 h-6 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-widest">
                  {video.duration}
                </div>
              </div>
              <div className="p-8 space-y-2">
                <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{video.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Discover the secrets of our master mixologists as they prepare our most iconic beverages with precision and flair.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
