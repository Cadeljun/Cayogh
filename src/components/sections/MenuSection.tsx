
"use client";

import { DrinkCard } from './DrinkCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { fruitDrinks, cocktails, shakes, Drink } from '@/lib/drinks';

interface MenuSectionProps {
  category?: 'fruit-drink' | 'cocktail' | 'shake' | 'all';
}

export function MenuSection({ category = 'all' }: MenuSectionProps) {
  const images = PlaceHolderImages;

  const renderSection = (title: string, accent: string, drinks: Drink[], type: string, description: string) => (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-24 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div className="space-y-3">
          <span className={`${accent} font-bold uppercase tracking-widest text-xs`}>{type}</span>
          <h2 className="text-3xl md:text-4xl font-headline font-extrabold">{title}</h2>
        </div>
        <p className="max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 lg:gap-4">
        {drinks.map((drink) => {
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
  );

  return (
    <div id="menu" className="pb-16">
      {(category === 'all' || category === 'fruit-drink') && renderSection(
        "Fruit Drinks",
        "text-primary",
        fruitDrinks,
        "Signature Drinks",
        "Our signature series brings you the freshest island flavors in a sleek, convenient format."
      )}

      {(category === 'all' || category === 'shake') && renderSection(
        "Island Shakes",
        "text-accent",
        shakes,
        "Creamy Indulgence",
        "Experience the smoother side of the tropics with our thick, creamy artisanal shakes."
      )}

      {(category === 'all' || category === 'cocktail') && renderSection(
        "Elegant Cocktails",
        "text-secondary",
        cocktails,
        "Crafted Mixology",
        "Sip on luxury with our masterfully crafted cocktails, served in elegant glassware."
      )}
    </div>
  );
}
