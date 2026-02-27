export interface Drink {
  id: string;
  name: string;
  price: number;
  description: string;
  type: 'fruit-drink' | 'cocktail' | 'shake';
  longDescription?: string;
}

export const fruitDrinks: Drink[] = [
  { id: 'fruit-drink-1', name: 'Tropical Sunset', price: 25.0, type: 'fruit-drink', description: 'A refreshing blend of mango, pineapple, and a touch of passionfruit.', longDescription: 'Experience the vibrant essence of the islands with our Tropical Sunset. We hand-pick the ripest mangoes and golden pineapples, blending them with exotic passionfruit for a tart yet sweet finish that lingers like a perfect beach evening.' },
  { id: 'fruit-drink-2', name: 'Berry Splash', price: 28.0, type: 'fruit-drink', description: 'Fresh mixed berries with a hint of citrus and tropical syrup.', longDescription: 'A burst of forest freshness in every sip. Berry Splash combines local strawberries, blueberries, and raspberries with a proprietary tropical syrup and a splash of lime for an antioxidant-rich, thirst-quenching delight.' },
  { id: 'fruit-drink-3', name: 'Island Breeze', price: 22.0, type: 'fruit-drink', description: 'Cool coconut water infused with lime and garden mint.', longDescription: 'Hydration meets luxury. Our Island Breeze uses pure, organic coconut water infused with cold-pressed lime and fresh garden mint leaves. It is the ultimate recovery drink for a hot day under the sun.' },
  { id: 'fruit-drink-4', name: 'Citrus Rush', price: 24.0, type: 'fruit-drink', description: 'An energizing mix of orange, lemon, and calamansi.', longDescription: 'Waken your senses with a zesty explosion. Citrus Rush is a high-vitamin blend of locally sourced oranges and lemons, balanced with the unique, floral notes of calamansi. It is crisp, clean, and incredibly refreshing.' },
  { id: 'fruit-drink-5', name: 'Mango Tango', price: 26.0, type: 'fruit-drink', description: 'Pure mango puree with a spicy ginger kick.', longDescription: 'Smooth meets sharp in this bold creation. We use thick, velvety mango puree and add a surprising twist of fresh, spicy ginger juice. It is a sophisticated flavor profile that dances on the palate.' },
  { id: 'fruit-drink-6', name: 'Pineapple Punch', price: 23.0, type: 'fruit-drink', description: 'Sweet pineapple juice balanced with tart hibiscus.', longDescription: 'A floral take on a tropical classic. Sweet, sun-ripened pineapple juice is steep with dried hibiscus petals, giving it a beautiful crimson hue and a complex, tart undertone that balances the natural sugars.' },
  { id: 'fruit-drink-7', name: 'Watermelon Wave', price: 20.0, type: 'fruit-drink', description: 'Cold-pressed watermelon with a dash of sea salt.', longDescription: 'Simplicity at its finest. Fresh watermelon is cold-pressed to retain all nutrients and flavor, then finished with a tiny pinch of Atlantic sea salt to enhance the natural sweetness and mineral profile.' },
  { id: 'fruit-drink-8', name: 'Guava Glow', price: 27.0, type: 'fruit-drink', description: 'Pink guava nectar with vitamin-rich tropical extracts.', longDescription: 'Radiate health with every sip. Our Guava Glow uses premium pink guava nectar, known for its high lycopene content, and blends it with a selection of tropical fruit extracts for a dense, nutritious, and incredibly flavorful drink.' },
];

export const cocktails: Drink[] = [
  { id: 'cocktail-1', name: 'Royal Sunset', price: 65.0, type: 'cocktail', description: 'Our premium house mix with aged rum, gold flakes, and dragonfruit.', longDescription: 'Indulge in pure luxury. The Royal Sunset features a base of 12-year aged dark rum, muddled with fresh pink dragonfruit and topped with edible 24k gold flakes. It is a visual and sensory masterpiece served in our finest crystal.' },
  { id: 'cocktail-2', name: 'Velvet Martini', price: 70.0, type: 'cocktail', description: 'Smooth vodka base with elderflower liqueur and vanilla notes.', longDescription: 'Elegance in a glass. This martini uses premium, five-times distilled vodka shaken with artisanal elderflower liqueur and a hint of organic Madagascar vanilla. It is silky smooth with a delicate, floral finish.' },
  { id: 'cocktail-3', name: 'Classic Mojito', price: 55.0, type: 'cocktail', description: 'The ultimate garden fresh drink with white rum and muddied mint.', longDescription: 'A timeless classic perfected. We use crisp white rum, muddled with generous amounts of fresh spearmint and lime wedges, finished with a splash of sparkling water and a touch of pure cane sugar.' },
  { id: 'cocktail-4', name: 'Midnight Passion', price: 75.0, type: 'cocktail', description: 'Dark and mysterious: black vodka with passionfruit and charcoal syrup.', longDescription: 'Embrace the night. Midnight Passion is a striking cocktail featuring black vodka layered with bright passionfruit juice and a unique activated charcoal agave syrup. It is bold, beautiful, and slightly smoky.' },
  { id: 'cocktail-5', name: 'Island Mule', price: 60.0, type: 'cocktail', description: 'Spiced rum, spicy ginger beer, and fresh lime.', longDescription: 'A tropical twist on the Moscow Mule. We swap vodka for a rich, aromatic spiced rum, paired with extra-spicy craft ginger beer and plenty of fresh lime juice, served in a traditional copper mug.' },
  { id: 'cocktail-6', name: 'Cayo Colada', price: 68.0, type: 'cocktail', description: 'Creamy coconut cream with white rum and fresh pineapple.', longDescription: 'The soul of Cayo Drinks. Our Cayo Colada is blended to a perfect slushy consistency using real coconut cream, white rum, and frozen pineapple chunks. It is a vacation in a glass, rich and creamy.' },
  { id: 'cocktail-7', name: 'Tropical Gin Fizz', price: 62.0, type: 'cocktail', description: 'Gin infused with botanicals and topped with passionfruit foam.', longDescription: 'Light, airy, and botanical. Premium gin is shaken with fresh tropical juices and topped with a luxurious, hand-whipped passionfruit foam that provides a creamy contrast to the effervescent base.' },
  { id: 'cocktail-8', name: 'Zesty Margarita', price: 64.0, type: 'cocktail', description: 'Premium tequila with triple sec and a spicy tajin rim.', longDescription: 'A classic with a kick. We use 100% blue agave tequila, fresh-squeezed lime, and a hint of agave nectar, served in a glass rimmed with spicy tajin salt for a perfect balance of sweet, sour, and heat.' },
];

export const shakes: Drink[] = [
  { id: 'shake-1', name: 'Vanilla Island', price: 45.0, type: 'shake', description: 'Creamy vanilla bean shake with a hint of toasted coconut.', longDescription: 'A classic favorite with a tropical soul. We blend premium vanilla bean ice cream with organic coconut milk and topped with golden toasted coconut flakes for a smooth, indulgent finish.' },
  { id: 'shake-2', name: 'Choco-Coco', price: 48.0, type: 'shake', description: 'Dark chocolate richness blended with fresh coconut cream.', longDescription: 'For the ultimate chocolate lover. This shake combines 70% dark Ghanaian cocoa with velvety coconut cream and a swirl of house-made chocolate ganache.' },
  { id: 'shake-3', name: 'Strawberry Dream', price: 42.0, type: 'shake', description: 'Fresh local strawberries blended into a thick, creamy delight.', longDescription: 'Pure berry bliss. We use a double portion of fresh, sun-ripened strawberries from the Volta region, blended until perfectly thick and creamy.' },
  { id: 'shake-4', name: 'Mango Cream', price: 46.0, type: 'shake', description: 'Velvety mango puree meets premium vanilla cream.', longDescription: 'The ultimate tropical treat. A thick, lush blend of our signature mango puree and high-quality vanilla cream, creating a sunshine-colored shake that is as rich as it is refreshing.' },
];

export const allDrinks = [...fruitDrinks, ...cocktails, ...shakes];

export function getDrinkById(id: string): Drink | undefined {
  return allDrinks.find(d => d.id === id);
}