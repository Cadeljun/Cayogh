
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Play } from 'lucide-react';

export function Hero() {
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-drink'));
  const heroBg = PlaceHolderImages.find(img => img.id === 'hero-bg');
  
  const img1 = heroImages[0] || {
    imageUrl: "https://picsum.photos/seed/fallback1/800/1000",
    description: "Tropical beverage",
    imageHint: "tropical drink"
  };
  
  const img2 = heroImages[1] || {
    imageUrl: "https://picsum.photos/seed/fallback2/800/1000",
    description: "Elegant cocktail",
    imageHint: "cocktail glass"
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

      {/* Hero Background Image behind text */}
      {heroBg && (
        <div className="absolute inset-0 w-full lg:w-3/4 h-full opacity-30 pointer-events-none z-0">
          <Image
            src={heroBg.imageUrl}
            alt="Hero background texture"
            fill
            className="object-cover"
            data-ai-hint={heroBg.imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center lg:text-left relative py-12">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium text-primary">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Vibrant & Refreshing
          </div>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold leading-[1.1] tracking-tight">
            Experience <br />
            <span className="text-primary">Premium Drinks</span> <br />
            & Cocktails
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
            Fresh tropical flavors crafted for unforgettable moments. From PET canned refreshments to elegant glassware mixology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link href="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 text-lg font-semibold group">
                View Menu
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/events">
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg font-semibold border-white/20 hover:bg-white/5">
                Book an Event
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative h-[500px] md:h-[700px] flex items-center justify-center">
          <div className="relative z-20 transform -rotate-6 hover:rotate-0 transition-transform duration-500 shadow-2xl rounded-3xl overflow-hidden border-4 border-white/10 w-64 md:w-80 h-96 md:h-[500px]">
             <Image
                src={img1.imageUrl}
                alt={img1.description}
                fill
                className="object-cover"
                data-ai-hint={img1.imageHint}
             />
          </div>
          <div className="absolute z-10 transform translate-x-20 translate-y-20 rotate-12 hover:rotate-6 transition-transform duration-500 shadow-2xl rounded-3xl overflow-hidden border-4 border-white/10 w-64 md:w-80 h-96 md:h-[500px]">
             <Image
                src={img2.imageUrl}
                alt={img2.description}
                fill
                className="object-cover opacity-80"
                data-ai-hint={img2.imageHint}
             />
          </div>

          <div className="absolute -bottom-10 -right-10 bg-card/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hidden md:block z-30 animate-bounce">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Play className="fill-primary text-primary w-5 h-5 ml-1" />
              </div>
              <div>
                <p className="text-sm font-bold">Watch Process</p>
                <p className="text-xs text-muted-foreground">Behind the mixology</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
