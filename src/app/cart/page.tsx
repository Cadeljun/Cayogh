
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, cartCount } = useCart();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-2">
            <h1 className="text-5xl font-headline font-extrabold">Your <span className="text-primary">Order</span></h1>
            <p className="text-muted-foreground">You have {cartCount} items in your basket.</p>
          </div>
          <Link href="/menu">
            <Button variant="outline" className="rounded-full border-white/10">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => {
                const imgData = PlaceHolderImages.find(img => img.id === item.id);
                const imageUrl = imgData?.imageUrl || 'https://picsum.photos/seed/fallback/200/200';
                
                return (
                  <div key={item.id} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-card rounded-[2rem] border border-white/5">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                      <Image
                        src={imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                      <p className="text-primary font-bold">GH₵{item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center gap-4 bg-background p-2 rounded-xl">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-white/5"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-bold">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 hover:bg-white/5"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right w-full sm:w-auto">
                      <p className="text-lg font-bold mb-2">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="space-y-8">
              <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
                <h3 className="text-2xl font-headline font-bold">Summary</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>GH₵{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-primary font-medium">Free</span>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">GH₵{totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <Link href="/checkout" className="block w-full">
                  <Button className="w-full h-14 bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-bold">
                  Secure Payment Guaranteed
                </p>
              </div>

              <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex items-center gap-4">
                <ShoppingBag className="w-6 h-6 text-primary" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Orders usually arrive within <span className="text-primary font-bold">30-45 minutes</span> for local delivery.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card rounded-[3rem] border border-dashed border-white/10 p-20 text-center flex flex-col items-center justify-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">Your cart is empty</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Looks like you haven't added any of our delicious tropical drinks to your order yet.
              </p>
            </div>
            <Link href="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground rounded-full px-12 h-14 text-lg font-bold">
                Start Ordering
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
