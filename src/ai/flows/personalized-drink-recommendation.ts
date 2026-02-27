'use server';
/**
 * @fileOverview A personalized drink recommendation AI agent for Cayo Drinks.
 *
 * - personalizedDrinkRecommendation - A function that handles the personalized drink recommendation process.
 * - PersonalizedDrinkRecommendationInput - The input type for the personalizedDrinkRecommendation function.
 * - PersonalizedDrinkRecommendationOutput - The return type for the personalizedDrinkRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedDrinkRecommendationInputSchema = z.object({
  mood: z
    .string()
    .optional()
    .describe(
      'The current mood of the user (e.g., relaxed, energetic, adventurous).'
    ),
  occasion: z
    .string()
    .optional()
    .describe(
      'The occasion for which the drink is desired (e.g., party, chill evening, celebration, work break).'
    ),
  preferredFlavors: z
    .string()
    .optional()
    .describe(
      'Comma-separated list of preferred flavor profiles (e.g., sweet, tangy, bitter, fruity, spicy).'
    ),
});
export type PersonalizedDrinkRecommendationInput = z.infer<
  typeof PersonalizedDrinkRecommendationInputSchema
>;

const RecommendedDrinkSchema = z.object({
  name: z.string().describe('The name of the recommended drink.'),
  description: z.string().describe('A brief description of the drink.'),
  reason: z
    .string()
    .describe(
      'The reason for the recommendation based on the user\'s input.'
    ),
  type: z
    .enum(['fruit-drink', 'cocktail', 'shake'])
    .describe('The type of drink: fruit-drink, cocktail, or shake.'),
});

const PersonalizedDrinkRecommendationOutputSchema = z.object({
  recommendations: z
    .array(RecommendedDrinkSchema)
    .describe('An array of personalized drink recommendations.'),
  message: z
    .string()
    .optional()
    .describe('An optional message accompanying the recommendations.'),
});
export type PersonalizedDrinkRecommendationOutput = z.infer<
  typeof PersonalizedDrinkRecommendationOutputSchema
>;

export async function personalizedDrinkRecommendation(
  input: PersonalizedDrinkRecommendationInput
): Promise<PersonalizedDrinkRecommendationOutput> {
  return personalizedDrinkRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedDrinkRecommendationPrompt',
  input: {schema: PersonalizedDrinkRecommendationInputSchema},
  output: {schema: PersonalizedDrinkRecommendationOutputSchema},
  prompt: `You are an expert mixologist and brand ambassador for Cayo Drinks, a premium tropical beverage company. Your goal is to provide personalized drink recommendations to customers based on their preferences.

Cayo Drinks offers three main categories:
- Fruit Drinks (served in PET cans): Tropical Sunset, Berry Splash, Island Breeze, Citrus Rush, Mango Tango, Pineapple Punch, Watermelon Wave, Guava Glow.
- Tropical Shakes (served in creamy glass cups): Vanilla Island, Choco-Coco, Strawberry Dream, Mango Cream.
- Cocktails (served in elegant glass cups): Royal Sunset, Velvet Martini, Mojito, Midnight Passion, Island Mule, Cayo Colada, Tropical Gin Fizz, Zesty Margarita.

Consider the following user preferences:
{{#if mood}}Mood: {{{mood}}}
{{/if}}{{#if occasion}}Occasion: {{{occasion}}}
{{/if}}{{#if preferredFlavors}}Preferred Flavors: {{{preferredFlavors}}}
{{/if}}

Based on these preferences, recommend 1-3 Cayo Drinks. For each recommendation, provide the drink's name, a brief description, the type (fruit-drink, cocktail, or shake), and a concise reason why it's a good fit. If no specific preferences are provided, recommend popular and versatile options from all categories.

Make sure to adhere to the output schema.`,
});

const personalizedDrinkRecommendationFlow = ai.defineFlow(
  {
    name: 'personalizedDrinkRecommendationFlow',
    inputSchema: PersonalizedDrinkRecommendationInputSchema,
    outputSchema: PersonalizedDrinkRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
