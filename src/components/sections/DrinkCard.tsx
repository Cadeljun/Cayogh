
"use client";

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DrinkCardProps {
  name: string;
  price: number;
  image: string;
  imageHint: string;
  description: string;
}

export function DrinkCard({ name, price, image, imageHint, description }: DrinkCardProps) {
  return (
    <Card className="group bg-card border-none overflow-hidden transition-all duration-300 hover:translate-y-[-4px] shadow-sm">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40" />
        <div className="absolute bottom-2 right-2">
          <Button size="icon" className="h-7 w-7 rounded-full bg-primary text-primary-foreground shadow-lg scale-90 group-hover:scale-100 transition-transform">
            <Plus className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-start mb-0.5 gap-2">
          <h3 className="text-sm font-headline font-bold leading-tight line-clamp-1">{name}</h3>
          <span className="text-primary font-bold text-xs whitespace-nowrap">GH₵{price.toFixed(0)}</span>
        </div>
        <p className="text-[10px] text-muted-foreground line-clamp-1 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
