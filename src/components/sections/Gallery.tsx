
"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { UploadCloud, Sparkles } from 'lucide-react';

interface GalleryItem {
  id: string;
  description: string;
  imageUrl: string;
  imageHint?: string;
  resource_type?: string;
}

export function Gallery() {
  const baseGalleryImages = PlaceHolderImages.filter(img => img.id.startsWith('gallery'));
  const [images, setImages] = useState<GalleryItem[]>(baseGalleryImages);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  useEffect(() => {
    // Optionally fetch live assets from Cloudinary
    fetch('/api/cloudinary/media?type=image&folder=cayo&limit=12')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.resources) && data.resources.length > 0) {
          const cloudItems: GalleryItem[] = data.resources.map((r: any) => ({
            id: r.public_id,
            description: r.public_id.split('/').pop()?.replace(/[-_]/g, ' ') || 'Cayo Moment',
            imageUrl: r.secure_url,
            imageHint: 'cayo drinks event',
            resource_type: r.resource_type,
          }));

          // Deduplicate by URL
          const existingUrls = new Set(baseGalleryImages.map(b => b.imageUrl));
          const newCloudItems = cloudItems.filter(c => !existingUrls.has(c.imageUrl));
          setImages([...baseGalleryImages, ...newCloudItems]);
        }
      })
      .catch(() => {
        // Fallback to base images if network offline
      });
  }, []);

  return (
    <section id="gallery" className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-4xl md:text-5xl font-headline font-extrabold">Cayo <span className="text-primary">Moments</span></h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore the vibrant colors, real events, and unforgettable experiences that define the Cayo Drinks brand.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img, i) => (
          <div 
            key={img.id || i} 
            className="relative overflow-hidden rounded-2xl aspect-[4/3] group cursor-pointer shadow-lg border border-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            tabIndex={0}
            role="button"
            aria-label={`View ${img.description}`}
            onClick={() => setSelectedImage(img)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setSelectedImage(img);
              }
            }}
          >
            <Image
              src={img.imageUrl}
              alt={img.description}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
              data-ai-hint={img.imageHint || 'drink'}
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <p className="text-white text-xs font-semibold leading-tight capitalize">{img.description}</p>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none sm:rounded-[2rem] overflow-hidden">
          {selectedImage && (
            <div className="relative w-full aspect-video md:aspect-[16/9] bg-card rounded-[2rem] overflow-hidden border border-white/10">
               <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.description}
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h3 className="text-xl md:text-3xl font-headline font-bold text-white mb-2 capitalize">{selectedImage.description}</h3>
                <p className="text-sm md:text-base text-white/70 italic">#CayoMoments #TropicalRefreshment</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
