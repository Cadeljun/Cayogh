
"use client";

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Loader2, Package, ChevronRight, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';

export default function TrackingDashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const ordersQuery = useMemoFirebase(() => {
    if (!db || !user) return null;
    return query(
      collection(db, 'users', user.uid, 'orders'),
      orderBy('orderDate', 'desc')
    );
  }, [db, user]);

  const { data: orders, isLoading: isOrdersLoading } = useCollection(ordersQuery);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 max-w-5xl mx-auto px-6 lg:px-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-5xl font-headline font-extrabold">Track <span className="text-primary">Orders</span></h1>
          <p className="text-muted-foreground text-lg">Manage and monitor your tropical refreshments in real-time.</p>
        </div>

        {!user && !isUserLoading ? (
          <div className="bg-card rounded-[3rem] border border-dashed border-white/10 p-20 text-center flex flex-col items-center justify-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">No history found</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                You haven't placed any orders yet, or you're not signed in to your account.
              </p>
            </div>
            <Link href="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground rounded-full px-12 h-14 text-lg font-bold">
                Start Browsing Menu
              </Button>
            </Link>
          </div>
        ) : isOrdersLoading || isUserLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-muted-foreground font-medium">Fetching your orders...</p>
          </div>
        ) : orders && orders.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <Link key={order.id} href={`/track/${order.id}`}>
                <div className="group bg-card p-6 rounded-3xl border border-white/5 hover:border-primary/50 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Package className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold">Order #{order.id.slice(-6).toUpperCase()}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-500' : 
                          order.status === 'Cancelled' ? 'bg-destructive/20 text-destructive' :
                          'bg-primary/20 text-primary'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          {format(new Date(order.orderDate), 'MMM d, h:mm a')}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1 max-w-[150px]">{order.deliveryAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between w-full md:w-auto gap-8">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-xl font-bold text-primary">{order.currency}{order.totalAmount.toFixed(2)}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card rounded-[3rem] border border-dashed border-white/10 p-20 text-center flex flex-col items-center justify-center space-y-8">
            <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground/30" />
            </div>
            <div className="space-y-2">
              <h3 className="text-3xl font-headline font-bold">No orders yet</h3>
              <p className="text-muted-foreground max-w-sm mx-auto">
                Ready to refresh your day? Our tropical bar is open and waiting for your first order.
              </p>
            </div>
            <Link href="/menu">
              <Button size="lg" className="bg-primary text-primary-foreground rounded-full px-12 h-14 text-lg font-bold">
                Order Your First Drink
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
