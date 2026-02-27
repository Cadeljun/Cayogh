
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
        <div className="absolute bottom-3 right-3">
          <Button size="icon" className="h-8 w-8 rounded-full bg-primary text-primary-foreground shadow-lg scale-90 group-hover:scale-100 transition-transform">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-base font-headline font-bold leading-tight line-clamp-1">{name}</h3>
          <span className="text-primary font-bold text-sm whitespace-nowrap">GH₵{price.toFixed(0)}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
