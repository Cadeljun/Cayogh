
"use client";

import { DrinkCard } from './DrinkCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const fruitDrinks = [
  { name: 'Tropical Sunset', price: 25.0, id: 'fruit-drink-1', description: 'A refreshing blend of mango, pineapple, and a touch of passionfruit.' },
  { name: 'Berry Splash', price: 28.0, id: 'fruit-drink-2', description: 'Fresh mixed berries with a hint of citrus and tropical syrup.' },
  { name: 'Island Breeze', price: 22.0, id: 'fruit-drink-3', description: 'Cool coconut water infused with lime and garden mint.' },
  { name: 'Citrus Rush', price: 24.0, id: 'fruit-drink-4', description: 'An energizing mix of orange, lemon, and calamansi.' },
];

const cocktails = [
  { name: 'Royal Sunset', price: 65.0, id: 'cocktail-1', description: 'Our premium house mix with aged rum, gold flakes, and dragonfruit.' },
  { name: 'Velvet Martini', price: 70.0, id: 'cocktail-2', description: 'Smooth vodka base with elderflower liqueur and vanilla notes.' },
  { name: 'Classic Mojito', price: 55.0, id: 'cocktail-3', description: 'The ultimate garden fresh drink with white rum and muddied mint.' },
  { name: 'Midnight Passion', price: 75.0, id: 'cocktail-4', description: 'Dark and mysterious: black vodka with passionfruit and charcoal syrup.' },
];

export function MenuSection() {
  const images = PlaceHolderImages;

  return (
    <div id="menu" className="py-24 space-y-32">
      {/* Signature Fruit Drinks */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Signature Drinks</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold">Fruit Drinks in <span className="text-primary">PET Cans</span></h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Our signature canned series brings you the freshest island flavors in a sleek, convenient PET can. Perfect for beach days and office breaks.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fruitDrinks.map((drink) => {
            const imgData = images.find(img => img.id === drink.id);
            return (
              <DrinkCard
                key={drink.id}
                name={drink.name}
                price={drink.price}
                description={drink.description}
                image={imgData?.imageUrl || ''}
                imageHint={imgData?.imageHint || ''}
              />
            );
          })}
        </div>
      </section>

      {/* Cocktails */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="space-y-4">
            <span className="text-secondary font-bold uppercase tracking-widest text-sm">Crafted Mixology</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold">Elegant <span className="text-secondary">Glass Cocktails</span></h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Sip on luxury with our masterfully crafted cocktails. Served in elegant glassware with artisanal garnishes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cocktails.map((drink) => {
            const imgData = images.find(img => img.id === drink.id);
            return (
              <DrinkCard
                key={drink.id}
                name={drink.name}
                price={drink.price}
                description={drink.description}
                image={imgData?.imageUrl || ''}
                imageHint={imgData?.imageHint || ''}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
