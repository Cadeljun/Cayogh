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
import { CheckCircle2, ArrowLeft, CreditCard, Truck, ShieldCheck, Smartphone, Lock, Sparkles } from 'lucide-react';
import { useFirestore, useUser, useAuth } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart, cartCount } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  
  const [paymentMethod, setPaymentMethod] = useState<'paystack' | 'delivery'>('paystack');
  const [isOrdering, setIsOrdering] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!db) return;

    setIsOrdering(true);

    // Ensure user is signed in (at least anonymously) to record order
    let currentUserId = user?.uid;
    if (!currentUserId && auth) {
      try {
        initiateAnonymousSignIn(auth);
      } catch (err) {
        console.warn('Anonymous signin notice:', err);
      }
    }
    // Fallback ID if auth is still settling
    currentUserId = currentUserId || `guest_${Date.now()}`;

    try {
      const orderData = {
        ownerId: currentUserId,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhoneNumber: formData.phone,
        deliveryAddress: formData.address,
        totalAmount: totalPrice,
        currency: 'GHS',
        paymentMethod: paymentMethod === 'paystack' ? 'Paystack (Mobile Money / Card)' : 'Cash on Delivery',
        paymentStatus: paymentMethod === 'paystack' ? 'Pending' : 'Unpaid',
        status: 'Processing',
        orderDate: new Date().toISOString(),
        createdAt: serverTimestamp(),
      };

      // Create order document in Firestore
      const ordersRef = collection(db, 'users', currentUserId, 'orders');
      const orderRef = await addDocumentNonBlocking(ordersRef, orderData);
      const createdOrderId = orderRef?.id || `order_${Date.now()}`;
      setOrderId(createdOrderId);

      // Add order items
      if (orderRef) {
        const itemsRef = collection(db, 'users', currentUserId, 'orders', orderRef.id, 'orderItems');
        cart.forEach(item => {
          addDocumentNonBlocking(itemsRef, {
            ownerId: currentUserId,
            orderId: orderRef.id,
            productId: item.id,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.price
          });
        });
      }

      // If user selected Paystack, initialize transaction and redirect to Paystack
      if (paymentMethod === 'paystack') {
        const callbackUrl = `${window.location.origin}/checkout/verify`;

        const initRes = await fetch('/api/payments/paystack/initialize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            amount: totalPrice,
            callbackUrl,
            metadata: {
              orderId: createdOrderId,
              ownerId: currentUserId,
              customerName: `${formData.firstName} ${formData.lastName}`,
              phone: formData.phone,
              address: formData.address,
              itemsCount: cart.length,
            },
          }),
        });

        const initData = await initRes.json();

        if (initData.success && initData.authorizationUrl) {
          // Redirect to Paystack secure checkout
          window.location.href = initData.authorizationUrl;
          return;
        } else {
          throw new Error(initData.error || 'Failed to initialize Paystack payment');
        }
      }

      // If Cash on Delivery, mark success immediately
      setIsSuccess(true);
      clearCart();
      toast({
        title: "Order Placed Successfully!",
        description: "Your tropical refreshers are being prepared.",
      });
    } catch (error: any) {
      console.error("Error placing order:", error);
      toast({
        variant: "destructive",
        title: "Order Failed",
        description: error.message || "There was a problem processing your request. Please try again.",
      });
      setIsOrdering(false);
    }
  };

  if (isSuccess) {
    return (
      <main className="min-h-screen bg-background">
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
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-bold">Pay on Delivery</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-bold">30-45 Minutes</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Link href={`/track/${orderId}`} className="block">
              <Button size="lg" className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-lg font-bold">
                Track Your Order
              </Button>
            </Link>
            <Link href="/menu" className="block">
              <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl text-lg font-bold border-white/10">
                Back to Menu
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (cartCount === 0) {
    return (
      <main className="min-h-screen bg-background">
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
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Basket
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-2">
              <h1 className="text-5xl font-headline font-extrabold">Checkout</h1>
              <p className="text-muted-foreground text-lg">Complete your order and payment details below.</p>
            </div>

            <form onSubmit={handlePlaceOrder} className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <Truck className="text-primary" /> Delivery Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="John" required className="bg-card border-white/5 h-12" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" required className="bg-card border-white/5 h-12" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required className="bg-card border-white/5 h-12" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (MTN / Telecel / AT)</Label>
                  <Input id="phone" type="tel" placeholder="+233 55 941 2097" required className="bg-card border-white/5 h-12" value={formData.phone} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Textarea id="address" placeholder="e.g. East Legon, Accra, Ghana" required className="bg-card border-white/5 min-h-[100px]" value={formData.address} onChange={handleInputChange} />
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-3">
                  <CreditCard className="text-primary" /> Payment Method
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Paystack Option */}
                  <div
                    onClick={() => setPaymentMethod('paystack')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                      paymentMethod === 'paystack'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5'
                        : 'border-white/5 bg-card hover:border-white/10'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'paystack' ? 'border-primary' : 'border-white/20'
                      }`}>
                        {paymentMethod === 'paystack' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span className="font-bold text-base flex items-center gap-2">
                          Paystack Live <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">Instant</span>
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <Lock className="w-3.5 h-3.5 text-primary" /> 256-bit Secure
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Pay with <strong>MTN Mobile Money</strong>, <strong>Telecel Cash</strong>, <strong>AT Money</strong>, or <strong>Visa / Mastercard</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div
                    onClick={() => setPaymentMethod('delivery')}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 ${
                      paymentMethod === 'delivery'
                        ? 'border-primary bg-primary/10 shadow-lg shadow-primary/5'
                        : 'border-white/5 bg-card hover:border-white/10'
                    }`}
                  >
                    <div className="mt-1">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'delivery' ? 'border-primary' : 'border-white/20'
                      }`}>
                        {paymentMethod === 'delivery' && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <span className="font-bold text-base block">Pay on Delivery</span>
                      <p className="text-xs text-muted-foreground">
                        Pay cash or mobile money transfer to the courier upon delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isOrdering}
                className="w-full h-16 bg-primary text-primary-foreground hover:bg-primary/90 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 mt-8 gap-2"
              >
                {isOrdering ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    Connecting to Paystack...
                  </>
                ) : paymentMethod === 'paystack' ? (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pay GH₵{totalPrice.toFixed(2)} with Paystack
                  </>
                ) : (
                  `Place Order - GH₵${totalPrice.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>

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
                <p>Your payment and delivery are protected by Cayo Drinks 100% satisfaction guarantee.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
