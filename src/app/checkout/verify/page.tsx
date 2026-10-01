"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useCart();

  const reference = searchParams.get('reference') || searchParams.get('trxref');
  const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!reference) {
      setStatus('failed');
      setErrorMessage('No payment reference found in redirect URL.');
      return;
    }

    const verifyTransaction = async () => {
      try {
        const res = await fetch(`/api/payments/paystack/verify?reference=${encodeURIComponent(reference)}`);
        const data = await res.json();

        if (data.success && data.status === 'success') {
          setStatus('success');
          setPaymentData(data.data);
          clearCart();
        } else {
          setStatus('failed');
          setErrorMessage(data.error || 'Payment was not confirmed. Please contact support or try again.');
        }
      } catch (err: any) {
        setStatus('failed');
        setErrorMessage(err.message || 'Error communicating with payment gateway.');
      }
    };

    verifyTransaction();
  }, [reference, clearCart]);

  return (
    <div className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center space-y-8">
      {status === 'verifying' && (
        <div className="space-y-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <RefreshCw className="w-10 h-10 text-primary animate-spin" />
          </div>
          <h1 className="text-3xl font-headline font-bold">Verifying Payment...</h1>
          <p className="text-muted-foreground text-sm">
            Please wait while we confirm your payment with Paystack.
          </p>
        </div>
      )}

      {status === 'success' && (
        <div className="space-y-6">
          <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 animate-in zoom-in duration-500" />
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-headline font-extrabold">
              Payment <span className="text-primary">Successful!</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Thank you for ordering with Cayo Drinks! Your payment has been secured and our mixologists are preparing your fresh tropical drinks.
            </p>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-white/5 text-left space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount Paid:</span>
              <span className="font-bold text-foreground">
                GH₵{paymentData?.amount ? (paymentData.amount / 100).toFixed(2) : '--'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method:</span>
              <span className="font-bold capitalize text-foreground">{paymentData?.channel || 'Mobile Money / Card'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Ref:</span>
              <span className="font-mono text-xs text-muted-foreground">{reference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Delivery:</span>
              <span className="font-bold text-primary">30-45 Minutes</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Link href="/menu" className="block">
              <Button size="lg" className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-base font-bold shadow-xl shadow-primary/20 gap-2">
                Order More Drinks <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl text-base font-bold border-white/10">
                Back to Homepage
              </Button>
            </Link>
          </div>
        </div>
      )}

      {status === 'failed' && (
        <div className="space-y-6">
          <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Payment Unconfirmed</h1>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {errorMessage || 'Your transaction could not be verified or was cancelled.'}
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Link href="/checkout" className="block">
              <Button size="lg" className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-base font-bold">
                Return to Checkout
              </Button>
            </Link>
            <Link href="/contact" className="block">
              <Button variant="outline" size="lg" className="w-full h-14 rounded-2xl text-base font-bold border-white/10">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyPaymentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Suspense fallback={
        <div className="pt-40 pb-24 text-center font-mono text-sm text-muted-foreground">
          Loading verification...
        </div>
      }>
        <VerifyPaymentContent />
      </Suspense>
      <Footer />
    </main>
  );
}
