"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Play, ArrowLeft, Maximize2, Sparkles, Volume2, VolumeX } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface VideoProcessItem {
  id: string;
  title: string;
  videoUrl: string;
  description: string;
  duration?: string;
  aspect?: string;
}

// Authentic Cloudinary videos uploaded under cayodrinks/Videos
const defaultCayoVideos: VideoProcessItem[] = [
  {
    id: 'gmfymrcagozozny2xsyk',
    title: 'Master Mixology & Tropical Pour',
    videoUrl: 'https://res.cloudinary.com/dmd5bq3va/video/upload/v1790817995/gmfymrcagozozny2xsyk.mp4',
    description: 'Precision measuring and handcrafted pouring technique showcasing our signature tropical drink blends.',
    duration: '0:15',
  },
  {
    id: 'gyt8qrkotfig6nxdkzkd',
    title: 'Artisan Blending & Fresh Extracts',
    videoUrl: 'https://res.cloudinary.com/dmd5bq3va/video/upload/v1790817997/gyt8qrkotfig6nxdkzkd.mp4',
    description: 'Real island fruits, pure purees, and zesty citrus harmonized into every handcrafted recipe.',
    duration: '0:18',
  },
  {
    id: 'dmo9glykmjj1rdydumzi',
    title: 'Precision Can Sealing & Presentation',
    videoUrl: 'https://res.cloudinary.com/dmd5bq3va/video/upload/v1790817999/dmo9glykmjj1rdydumzi.mp4',
    description: 'Fresh on-the-spot can seaming and vibrant garnishes preserving optimal chill and fizz.',
    duration: '0:14',
  },
  {
    id: 'uyo7amtupj0udz6dw0pg',
    title: 'Live Event Bar & The Cayo Experience',
    videoUrl: 'https://res.cloudinary.com/dmd5bq3va/video/upload/v1790818001/uyo7amtupj0udz6dw0pg.mp4',
    description: 'High-energy mobile mixology setups creating refreshing moments for events and celebrations.',
    duration: '0:20',
  },
];

export default function ProcessPage() {
  const [videos, setVideos] = useState<VideoProcessItem[]>(defaultCayoVideos);
  const [activeModalVideo, setActiveModalVideo] = useState<VideoProcessItem | null>(null);

  useEffect(() => {
    // Dynamically fetch any additional videos from Cloudinary cayodrinks folder
    fetch('/api/cloudinary/media?type=video&cayoOnly=true')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.resources) && data.resources.length > 0) {
          const fetchedItems: VideoProcessItem[] = data.resources.map((r: any, idx: number) => {
            const matchedDefault = defaultCayoVideos.find(v => v.id === r.public_id || r.secure_url.includes(v.id));
            return {
              id: r.public_id,
              title: matchedDefault ? matchedDefault.title : `Cayo Mixology Craft #${idx + 1}`,
              videoUrl: r.secure_url,
              description: matchedDefault ? matchedDefault.description : 'Authentic behind-the-scenes drink preparation by Cayo Drinks.',
              duration: r.duration ? `${Math.round(r.duration)}s` : matchedDefault?.duration || '0:15',
            };
          });

          // Ensure our default authentic videos are at the front
          const customIds = new Set(fetchedItems.map(f => f.id));
          const missingDefaults = defaultCayoVideos.filter(d => !customIds.has(d.id));
          setVideos([...fetchedItems, ...missingDefaults]);
        }
      })
      .catch(() => {
        // Fallback to default authentic videos
      });
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Section Header */}
        <div className="space-y-4 mb-16 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold">
            Behind the <span className="text-primary">Mixology</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Step behind the bar with Cayo Drinks. Watch our master mixologists craft, infuse, and seal every premium beverage from fresh fruit selection to the final garnish.
          </p>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
          {videos.map((video, index) => (
            <div
              key={video.id || index}
              className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-all hover:border-primary/40 flex flex-col"
            >
              {/* Video Player Card Screen */}
              <div
                className="relative aspect-[9/16] sm:aspect-video w-full bg-black overflow-hidden flex items-center justify-center cursor-pointer"
                onClick={() => setActiveModalVideo(video)}
              >
                <video
                  src={video.videoUrl}
                  className="w-full h-full object-cover sm:object-contain group-hover:scale-105 transition-transform duration-500"
                  muted
                  playsInline
                  loop
                  onMouseEnter={(e) => {
                    const v = e.currentTarget;
                    v.play().catch(() => {});
                  }}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />

                {/* Ambient Overlay & Play Indicator */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 flex items-center justify-center transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary/90 text-primary-foreground flex items-center justify-center shadow-2xl scale-95 group-hover:scale-110 transition-transform">
                    <Play className="fill-current w-6 h-6 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                  {video.duration || 'Video'}
                </div>

                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Step 0{index + 1}
                </div>
              </div>

              {/* Video Text Content */}
              <div className="p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {video.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary hover:bg-primary/10 rounded-xl p-0 h-auto font-bold text-xs gap-1.5"
                    onClick={() => setActiveModalVideo(video)}
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Watch Fullscreen
                  </Button>
                  <span className="text-[11px] font-mono text-muted-foreground">
                    Cayo Mixology
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cinema Video Modal */}
      <Dialog open={!!activeModalVideo} onOpenChange={(open) => !open && setActiveModalVideo(null)}>
        <DialogContent className="max-w-4xl bg-card/95 backdrop-blur-2xl border-white/10 p-6 md:p-8 rounded-[2rem] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-xl font-headline font-bold">
              {activeModalVideo?.title}
            </DialogTitle>
          </DialogHeader>

          {activeModalVideo && (
            <div className="space-y-4">
              <div className="relative aspect-[9/16] sm:aspect-video max-h-[70vh] w-full bg-black rounded-2xl overflow-hidden flex items-center justify-center">
                <video
                  src={activeModalVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {activeModalVideo.description}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
