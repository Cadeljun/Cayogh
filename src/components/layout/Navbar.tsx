
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Menu', href: '/menu' },
  { name: 'Track', href: '/track' },
  { name: 'Events', href: '/events' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Threshold to avoid jitter
      if (Math.abs(currentScrollY - lastScrollY) < 5) return;

      // Scrolled state for glass effect
      setScrolled(currentScrollY > 20);

      // Visibility state for auto-hide
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setVisible(false);
      } else {
        // Scrolling up
        setVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-6 lg:px-12 py-4",
      scrolled ? "py-3" : "py-6",
      visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      scrolled ? "bg-background/40 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-headline font-extrabold tracking-tighter text-primary group-hover:scale-105 transition-transform">
            CAYO <span className="text-foreground">DRINKS</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/track">
            <Button variant="ghost" size="icon" className="hover:text-primary relative group" title="My Orders">
              <Package className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="hover:text-primary relative group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-secondary text-white border-none shadow-lg">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <Link href="/menu">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all">
              Order Now
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="hover:text-primary relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-[10px] bg-secondary text-white border-none">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
          <button
            className="text-foreground p-2 rounded-xl hover:bg-white/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/90 backdrop-blur-3xl border-b border-white/5 p-8 flex flex-col gap-4 animate-in slide-in-from-top duration-500 md:hidden shadow-2xl rounded-b-[2rem]">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-xl font-bold py-3 border-b border-white/5 hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link href="/menu" onClick={() => setIsOpen(false)} className="mt-4">
            <Button className="bg-primary text-primary-foreground w-full h-14 rounded-2xl font-bold text-lg shadow-xl shadow-primary/20">
              Order Now
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
