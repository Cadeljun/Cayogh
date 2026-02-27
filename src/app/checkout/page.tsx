
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, cartCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsOrdering(false);
      setIsSuccess(true);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Your tropical refreshers are on their way.",
      });
    }, 2000);
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-primary animate-in zoom-in duration-500" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-headline font-extrabold">Order <span className="text-primary">Confirmed!</span></h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thank you for choosing Cayo Drinks. Your order has been received and is being prepared by our expert mixologists.
            </p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-white/5 text-left space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Status:</span>
              <span className="text-primary font-bold">Processing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-bold">30-45 Minutes</span>
            </div>
          </div>
          <Link href="/menu" className="block">
            <Button size="lg" className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-lg font-bold">
              Back to Menu
            </Button>
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  if (cartCount === 0) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center space-y-8">
           <h1 className="text-4xl font-headline font-extrabold">Your Cart is <span className="text-primary">Empty</span></h1>
           <p className="text-muted-foreground">You can't checkout with an empty basket. Let's find some drinks!</p>
           <Link href="/menu">
             <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold">Explore Menu</Button>
           </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Basket
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Checkout Form */}
          <div className="space-y-12">
            <div className="space-y-2">
              <h1 className="text-5xl font-headline font-extrabold">Checkout</h1>
              <p className="text-muted-foreground text-lg">Complete your order details below.</p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Truck className="text-primary" /> Delivery Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required className="bg-card border-white/5 h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required className="bg-card border-white/5 h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="bg-card border-white/5 h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" placeholder="+233 555 000 000" required className="bg-card border-white/5 h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea id="address" placeholder="e.g. 123 Tropical Way, East Legon, Accra" required className="bg-card border-white/5 min-h-[100px]" />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <CreditCard className="text-primary" /> Payment Method
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-primary/10 border-2 border-primary p-4 rounded-2xl flex items-center gap-4 cursor-pointer">
                    <div className="w-4 h-4 rounded-full border-4 border-primary bg-background" />
                    <span className="font-bold">Pay on Delivery</span>
                  </div>
                  <div className="bg-card border border-white/5 p-4 rounded-2xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                    <div className="w-4 h-4 rounded-full border border-white/20 bg-transparent" />
                    <span className="font-bold">Mobile Money (Coming Soon)</span>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isOrdering}
                className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 mt-8"
              >
                {isOrdering ? "Processing Order..." : `Place Order - GH₵${totalPrice.toFixed(2)}`}
              </Button>
            </form>
          </div>

          {/* Order Summary Sticky */}
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
              <h3 className="text-2xl font-headline font-bold">Your Order</h3>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center gap-4">
                    <div className="flex-1">
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-primary">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>

              <Separator className="bg-white/5" />

              <div className="space-y-3">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>GH₵{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span className="text-primary font-medium">FREE</span>
                </div>
                <Separator className="bg-white/5" />
                <div className="flex justify-between text-2xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">GH₵{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-white/5 p-4 rounded-xl flex items-center gap-3 text-xs text-muted-foreground">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <p>Your delivery is protected by Cayo Drinks 100% freshness guarantee. If you're not happy, we'll replace it instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
