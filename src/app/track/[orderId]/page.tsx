
"use client";

import React, { use } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { doc, collection } from 'firebase/firestore';
import { Loader2, ArrowLeft, Clock, MapPin, User, Package, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Separator } from '@/components/ui/separator';

const STATUS_STEPS = [
  { name: 'Processing', description: 'Expert mixologists preparing your drink' },
  { name: 'On the Way', description: 'Freshness en route to your location' },
  { name: 'Delivered', description: 'Enjoy your Cayo refreshment!' }
];

export default function OrderTrackingPage({ params }: { params: Promise<{ orderId: string }> }) {
  const resolvedParams = use(params);
  const { user } = useUser();
  const db = useFirestore();

  const orderRef = useMemoFirebase(() => {
    if (!db || !user || !resolvedParams.orderId) return null;
    return doc(db, 'users', user.uid, 'orders', resolvedParams.orderId);
  }, [db, user, resolvedParams.orderId]);

  const itemsQuery = useMemoFirebase(() => {
    if (!db || !user || !resolvedParams.orderId) return null;
    return collection(db, 'users', user.uid, 'orders', resolvedParams.orderId, 'orderItems');
  }, [db, user, resolvedParams.orderId]);

  const { data: order, isLoading: isOrderLoading } = useDoc(orderRef);
  const { data: items, isLoading: isItemsLoading } = useCollection(itemsQuery);

  const getStatusProgress = (status: string) => {
    switch (status) {
      case 'Processing': return 33;
      case 'On the Way': return 66;
      case 'Delivered': return 100;
      default: return 0;
    }
  };

  if (isOrderLoading) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="text-muted-foreground font-medium">Tracking your refreshments...</p>
        </div>
        <Footer />
      </main>
    );
  }

  if (!order) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center space-y-8">
           <h1 className="text-4xl font-headline font-extrabold">Order Not <span className="text-primary">Found</span></h1>
           <p className="text-muted-foreground">We couldn't locate this order. It might belong to a different account or has been removed.</p>
           <Link href="/track">
             <Button size="lg" className="rounded-full px-12 h-14 text-lg font-bold">View My Orders</Button>
           </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(step => step.name === order.status);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6 lg:px-12">
        <Link href="/track" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Main Tracking View */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card p-8 md:p-12 rounded-[3rem] border border-white/5 shadow-2xl space-y-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-2">
                  <h2 className="text-3xl font-headline font-bold">Track Order <span className="text-primary">#{order.id.slice(-6).toUpperCase()}</span></h2>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Placed {format(new Date(order.orderDate), 'MMM d, h:mm a')}</span>
                  </div>
                </div>
                <div className="bg-primary/10 px-6 py-3 rounded-2xl border border-primary/20">
                  <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">Current Status</p>
                  <p className="text-2xl font-bold">{order.status}</p>
                </div>
              </div>

              {/* Status Progress Bar */}
              <div className="space-y-8">
                <Progress value={getStatusProgress(order.status)} className="h-4 bg-white/5" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = getStatusProgress(order.status) >= getStatusProgress(step.name);
                    const isCurrent = order.status === step.name;
                    
                    return (
                      <div key={step.name} className={`space-y-2 transition-opacity ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-muted-foreground'}`}>
                            {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-xs font-bold">{idx + 1}</span>}
                          </div>
                          <h4 className={`font-bold ${isCurrent ? 'text-primary' : ''}`}>{step.name}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed pl-11">{step.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 shadow-xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <User className="text-primary" /> Delivery Info
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Customer</p>
                    <p className="font-medium text-lg">{order.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold mb-1">Address</p>
                    <p className="font-medium flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      {order.deliveryAddress}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 shadow-xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-3">
                  <Clock className="text-primary" /> Estimated Time
                </h3>
                <div className="space-y-4">
                  <div className="bg-primary/5 p-4 rounded-2xl border border-primary/10">
                    <p className="text-4xl font-extrabold text-primary">30-45</p>
                    <p className="font-bold uppercase tracking-widest text-xs text-muted-foreground">Minutes until arrival</p>
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    Our team is working fast to get your refreshments to you at their peak freshness.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Summary */}
          <div className="space-y-8">
            <div className="bg-card p-8 rounded-[2.5rem] border border-white/5 shadow-2xl space-y-6">
              <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
                <Package className="text-primary" /> Order Items
              </h3>
              
              <div className="space-y-6">
                {isItemsLoading ? (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading items...</span>
                  </div>
                ) : items && items.length > 0 ? (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center gap-4">
                        <div className="flex-1">
                          <p className="font-bold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-primary">{order.currency}{(item.unitPrice * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                ) : null}

                <Separator className="bg-white/5" />

                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{order.currency}{order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span className="text-primary font-medium">FREE</span>
                  </div>
                  <Separator className="bg-white/5" />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">{order.currency}{order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <Link href="/menu" className="block">
              <Button variant="outline" className="w-full h-14 rounded-2xl font-bold text-lg border-white/10 hover:bg-white/5">
                Need more? Order Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
