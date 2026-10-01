# Cayo Drinks — Design System & UI Specifications

## Technology Stack
- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS with CSS custom properties
- **Component Primitives**: Radix UI (shadcn/ui architecture)
- **Icons**: `lucide-react`
- **Animations**: `motion/react` & CSS keyframe animations
- **State Management**: React Context (`CartContext`), Firebase Firestore SDK

## Core Color Tokens
```css
/* Core Tropical Theme */
--background: 0 0% 4%;            /* Deep Noir #0A0A0A */
--foreground: 0 0% 98%;           /* Pure Bright #FAFAFA */
--primary: 18 100% 56%;           /* Cayo Sunset Orange #FF5E1E */
--primary-foreground: 0 0% 100%;
--card: 0 0% 8%;                  /* Elevated Dark Surface #141414 */
--card-foreground: 0 0% 98%;
--muted: 0 0% 15%;
--muted-foreground: 0 0% 65%;
--accent: 18 100% 56%;
--border: 0 0% 15%;               /* Subtle divider */
--emerald: 160 84% 39%;           /* Freshness badge #10B981 */
```

## Typography Hierarchy
- **Headline Display**: `font-headline` (Poppins)
  - `h1`: `text-4xl md:text-6xl font-extrabold tracking-tight`
  - `h2`: `text-3xl md:text-4xl font-bold`
  - `h3`: `text-2xl font-bold`
- **Body Text**: `font-body` (Inter)
  - Default: `text-base text-muted-foreground leading-relaxed`
  - Meta/Detail: `text-xs md:text-sm text-muted-foreground`
- **Badge/Code**: `font-mono text-xs uppercase tracking-wider`

## UI Component Patterns
- **Buttons**:
  - Primary CTA: Pill / Rounded-2xl with `bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]`
  - Secondary/Ghost: `border border-white/10 hover:bg-white/5 text-foreground`
- **Cards**:
  - `bg-card rounded-[2rem] border border-white/5 p-6 hover:border-primary/30 transition-all`
- **Form Inputs**:
  - `h-12 bg-card border-white/10 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary`
