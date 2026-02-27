
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2, GlassWater, Flame } from 'lucide-react';
import { personalizedDrinkRecommendation, type PersonalizedDrinkRecommendationOutput } from '@/ai/flows/personalized-drink-recommendation';

export function DrinkRecommender() {
  const [mood, setMood] = useState('');
  const [occasion, setOccasion] = useState('');
  const [flavor, setFlavor] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<PersonalizedDrinkRecommendationOutput | null>(null);

  const handleRecommend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await personalizedDrinkRecommendation({
        mood,
        occasion,
        preferredFlavors: flavor
      });
      setRecommendations(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 text-primary font-bold">
            <Sparkles className="w-5 h-5" />
            AI Mixologist
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold leading-tight">
            Find Your <span className="text-primary">Perfect Match</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Not sure what to order? Tell our AI mixologist your current vibe, and we'll suggest the best Cayo Drink for your moment.
          </p>

          <form onSubmit={handleRecommend} className="space-y-6 bg-card/50 p-8 rounded-3xl border border-white/5">
            <div className="space-y-2">
              <Label htmlFor="mood">What's your mood?</Label>
              <Input
                id="mood"
                placeholder="e.g., Chill, Energetic, Adventurous"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="occasion">What's the occasion?</Label>
              <Input
                id="occasion"
                placeholder="e.g., Beach party, Work break, Date night"
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flavor">Preferred Flavors?</Label>
              <Input
                id="flavor"
                placeholder="e.g., Sweet, Tangy, Spicy"
                value={flavor}
                onChange={(e) => setFlavor(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button disabled={loading} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-lg rounded-xl">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Sparkles className="mr-2 h-5 w-5" />}
              {loading ? "Mixing ideas..." : "Get Recommendations"}
            </Button>
          </form>
        </div>

        <div className="relative">
          {recommendations ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500">
              <p className="text-primary font-bold text-center mb-4">{recommendations.message || "Here's what our mixologist suggests:"}</p>
              {recommendations.recommendations.map((drink, i) => (
                <Card key={i} className="bg-card border-white/10 hover:border-primary/50 transition-colors">
                  <CardHeader className="pb-2 flex flex-row items-center justify-between">
                    <CardTitle className="text-xl font-headline text-primary">{drink.name}</CardTitle>
                    {drink.type === 'cocktail' ? <GlassWater className="text-secondary" /> : <Flame className="text-primary" />}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-foreground/90 font-medium">{drink.description}</p>
                    <div className="bg-primary/10 p-4 rounded-xl">
                      <p className="text-xs font-bold text-primary uppercase mb-1">Why it fits:</p>
                      <p className="text-sm italic text-muted-foreground">{drink.reason}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button variant="ghost" className="w-full" onClick={() => setRecommendations(null)}>Try Another Vibe</Button>
            </div>
          ) : (
            <div className="bg-card h-[500px] rounded-3xl border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
              <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Sparkles className="w-12 h-12 text-muted-foreground/30" />
              </div>
              <h3 className="text-xl font-headline font-bold mb-2">Ready to Discover</h3>
              <p className="text-muted-foreground">Submit the form to see your personalized drink recommendations based on your unique taste and mood.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
