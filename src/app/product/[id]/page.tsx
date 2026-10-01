
"use client";

import React, { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '@/context/CartContext';
import { getDrinkById } from '@/lib/drinks';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Zap } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const drink = getDrinkById(resolvedParams.id);
  const { toast } = useToast();
  const { addToCart } = useCart();

  if (!drink) {
    notFound();
  }

  const imgData = PlaceHolderImages.find(img => img.id === drink.id);
  const imageUrl = imgData?.imageUrl || 'https://picsum.photos/seed/fallback/800/800';

  const handleAddToCart = () => {
    addToCart({ id: drink.id, name: drink.name, price: drink.price });
    toast({
      title: "Added to cart",
      description: `${drink.name} has been added to your order.`,
      duration: 3000,
    });
  };

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link href="/menu" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Menu
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <div className="relative aspect-square rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
            <Image
              src={imageUrl}
              alt={drink.name}
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
              data-ai-hint={imgData?.imageHint || 'drink'}
            />
            <div className="absolute top-6 left-6">
              <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${drink.type === 'cocktail' ? 'bg-secondary text-white' : 'bg-primary text-primary-foreground'}`}>
                {drink.type.replace('-', ' ')}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-headline font-extrabold">{drink.name}</h1>
              <div className="flex items-center gap-4">
                <div className="flex text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                </div>
                <span className="text-sm text-muted-foreground">(4.9/5 from 120+ reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary">GH₵{drink.price.toFixed(2)}</p>
            </div>

            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {drink.longDescription || drink.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center text-center gap-2">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                  <span className="text-xs font-bold">100% Organic</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center text-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <span className="text-xs font-bold">Cold Pressed</span>
                </div>
                <div className="bg-white/5 p-4 rounded-2xl flex flex-col items-center text-center gap-2">
                  <Star className="w-6 h-6 text-primary" />
                  <span className="text-xs font-bold">Premium Grade</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button 
                onClick={handleAddToCart}
                className="flex-1 h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20"
              >
                <ShoppingCart className="mr-2 w-6 h-6" />
                Add to Cart
              </Button>
              <Link href="/cart" className="flex-1">
                <Button variant="outline" className="w-full h-16 rounded-2xl text-lg font-bold border-white/10 hover:bg-white/5">
                  Go to Checkout
                </Button>
              </Link>
            </div>
            
            <div className="pt-8 border-t border-white/5 space-y-4">
              <h4 className="font-bold">Ingredients:</h4>
              <p className="text-sm text-muted-foreground italic">
                Sourced from local farms in the Volta Region and carefully selected tropical fruit markets. No artificial preservatives or coloring added.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
