import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassWater, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col justify-between">
      <Navbar />
      <div className="pt-40 pb-24 max-w-xl mx-auto px-6 text-center space-y-8 flex-1 flex flex-col justify-center">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 border border-primary/20">
          <GlassWater className="w-12 h-12 text-primary" />
        </div>
        <div className="space-y-4">
          <h1 className="text-6xl font-headline font-extrabold text-foreground">404</h1>
          <h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-muted-foreground leading-relaxed">
            The tropical refresher or page you are looking for has been moved or doesn't exist.
          </p>
        </div>
        <div>
          <Link href="/">
            <Button size="lg" className="rounded-full px-8 h-12 bg-primary text-primary-foreground font-bold gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Button>
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
