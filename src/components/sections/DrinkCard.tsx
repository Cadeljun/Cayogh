
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';

interface DrinkCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  imageHint: string;
  description: string;
}

export function DrinkCard({ id, name, price, image, imageHint, description }: DrinkCardProps) {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price });
    toast({
      title: "Added to cart",
      description: `${name} has been added to your order.`,
      duration: 3000,
    });
  };

  return (
    <Link href={`/product/${id}`}>
      <Card className="group bg-card border-none overflow-hidden transition-all duration-300 hover:translate-y-[-4px] shadow-sm cursor-pointer h-full">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
            data-ai-hint={imageHint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-40" />
        </div>
        <CardContent className="p-3">
          <div className="flex justify-between items-start mb-0.5 gap-2">
            <h3 className="text-sm font-headline font-bold leading-tight line-clamp-1">{name}</h3>
            <span className="text-primary font-bold text-xs whitespace-nowrap">GH₵{price.toFixed(0)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground line-clamp-1 leading-relaxed mb-3">{description}</p>
          <Button 
            onClick={handleAddToCart}
            className="w-full h-8 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 border border-primary/20"
          >
            <ShoppingCart className="w-3 h-3" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
