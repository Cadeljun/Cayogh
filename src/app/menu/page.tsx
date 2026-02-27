
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MenuSection } from '@/components/sections/MenuSection';
import { DrinkRecommender } from '@/components/sections/DrinkRecommender';

export default function MenuPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 text-center">
          <h1 className="text-5xl font-headline font-extrabold mb-4">Our Full <span className="text-primary">Menu</span></h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover our curated selection of 16 premium tropical beverages, from refreshing fruit blends to artisanal cocktails.</p>
        </div>
        <MenuSection />
        <DrinkRecommender />
      </div>
      <Footer />
    </main>
  );
}
