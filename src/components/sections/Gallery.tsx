
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Gallery() {
  const galleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery'));

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold">Cayo <span className="text-primary">Moments</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the vibrant colors, fresh ingredients, and unforgettable experiences that define the Cayo Drinks brand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {galleryImages.map((img, i) => (
          <div key={i} className={`relative overflow-hidden rounded-3xl h-80 group cursor-pointer ${i % 3 === 0 ? 'lg:col-span-2' : ''}`}>
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              data-ai-hint={img.imageHint}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <p className="text-white font-medium">{img.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
