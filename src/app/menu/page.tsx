
"use client";

import { MenuSection } from '@/components/sections/MenuSection';
import { DrinkRecommender } from '@/components/sections/DrinkRecommender';

export default function MenuPage() {
  return (
    <>
      <MenuSection category="all" />
      <div className="bg-primary/5 border-y border-white/5">
        <DrinkRecommender />
      </div>
    </>
  );
}
