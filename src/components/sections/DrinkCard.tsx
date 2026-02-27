
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
    <Card className="group bg-card border-none overflow-hidden transition-all duration-300 hover:translate-y-[-8px]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          data-ai-hint={imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
        <div className="absolute bottom-4 right-4">
          <Button size="icon" className="rounded-full bg-primary text-primary-foreground shadow-xl scale-90 group-hover:scale-100 transition-transform">
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-headline font-bold">{name}</h3>
          <span className="text-primary font-bold">GH₵{price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardContent>
    </Card>
  );
}
