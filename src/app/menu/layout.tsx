"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const menuNavLinks = [
  { name: 'All Drinks', href: '/menu' },
  { name: 'Fruit Drinks', href: '/menu/fruit-drinks' },
  { name: 'Island Shakes', href: '/menu/shakes' },
  { name: 'Smoothies', href: '/menu/smoothies' },
  { name: 'Elegant Cocktails', href: '/menu/cocktails' },
];

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-12 text-center">
          <div className="space-y-4 mb-10">
            <h1 className="text-5xl md:text-6xl font-headline font-extrabold">
              Our <span className="text-primary">Menu</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated selection of premium tropical beverages, crafted for the ultimate refreshment.
            </p>
          </div>
          
          {/* Navigation integrated into Hero Text */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {menuNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <span className={cn(
                    "px-6 py-2.5 rounded-full border transition-all font-bold text-sm cursor-pointer whitespace-nowrap",
                    isActive 
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20" 
                      : "border-white/10 hover:border-primary/50 hover:bg-white/5 text-muted-foreground hover:text-foreground"
                  )}>
                    {link.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        {children}
      </div>
      <Footer />
    </main>
  );
}