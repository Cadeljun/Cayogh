
"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Gallery } from '@/components/sections/Gallery';

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Gallery />
      </div>
      <Footer />
    </main>
  );
}
