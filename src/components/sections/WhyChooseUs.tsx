
"use client";

import { Leaf, QrCode, PartyPopper } from 'lucide-react';

const features = [
  {
    icon: Leaf,
    title: 'Premium Ingredients',
    description: 'We source only the ripest organic tropical fruits from local farmers to ensure every sip is packed with authentic flavor.',
    color: 'text-green-500'
  },
  {
    icon: QrCode,
    title: 'Fast QR Ordering',
    description: 'Skip the wait. Scan the QR code at your table or event to view our live menu and place orders directly to our mixologists.',
    color: 'text-primary'
  },
  {
    icon: PartyPopper,
    title: 'Perfect for Events',
    description: 'Elevate your weddings, festivals, and corporate parties with our mobile bar and custom branded cocktail menus.',
    color: 'text-secondary'
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-card py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold">Why Choose <span className="text-primary">Cayo Drinks</span>?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine tradition with modern convenience to bring you a beverage experience that is as premium as it is refreshing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 rounded-2xl bg-background flex items-center justify-center border border-white/5 transition-all duration-300 group-hover:rotate-6 group-hover:bg-primary/10">
                <feature.icon className={`w-10 h-10 ${feature.color}`} />
              </div>
              <h3 className="text-2xl font-headline font-bold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
