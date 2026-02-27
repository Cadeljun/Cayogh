"use client";

import { DrinkCard } from './DrinkCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { fruitDrinks, cocktails, shakes } from '@/lib/drinks';

export function MenuSection() {
  const images = PlaceHolderImages;

  return (
    <div id="menu" className="py-16 space-y-24">
      {/* Signature Fruit Drinks */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="space-y-3">
            <span className="text-primary font-bold uppercase tracking-widest text-xs">Signature Drinks</span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold">Fruit Drinks in <span className="text-primary">PET Cans</span></h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Our signature canned series brings you the freshest island flavors in a sleek, convenient PET can.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
          {fruitDrinks.map((drink) => {
            const imgData = images.find(img => img.id === drink.id);
            return (
              <DrinkCard
                key={drink.id}
                id={drink.id}
                name={drink.name}
                price={drink.price}
                description={drink.description}
                image={imgData?.imageUrl || 'https://picsum.photos/seed/fallback/600/800'}
                imageHint={imgData?.imageHint || 'drink'}
              />
            );
          })}
        </div>
      </section>

      {/* Tropical Shakes */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="space-y-3">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">Creamy Indulgence</span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold">Island <span className="text-primary">Shakes</span></h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Experience the smoother side of the tropics with our thick, creamy artisanal shakes.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
          {shakes.map((drink) => {
            const imgData = images.find(img => img.id === drink.id);
            return (
              <DrinkCard
                key={drink.id}
                id={drink.id}
                name={drink.name}
                price={drink.price}
                description={drink.description}
                image={imgData?.imageUrl || 'https://picsum.photos/seed/fallback/600/800'}
                imageHint={imgData?.imageHint || 'shake'}
              />
            );
          })}
        </div>
      </section>

      {/* Cocktails */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div className="space-y-3">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs">Crafted Mixology</span>
            <h2 className="text-3xl md:text-4xl font-headline font-extrabold">Elegant <span className="text-secondary">Glass Cocktails</span></h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Sip on luxury with our masterfully crafted cocktails, served in elegant glassware.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
          {cocktails.map((drink) => {
            const imgData = images.find(img => img.id === drink.id);
            return (
              <DrinkCard
                key={drink.id}
                id={drink.id}
                name={drink.name}
                price={drink.price}
                description={drink.description}
                image={imgData?.imageUrl || 'https://picsum.photos/seed/fallback/600/800'}
                imageHint={imgData?.imageHint || 'drink'}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}