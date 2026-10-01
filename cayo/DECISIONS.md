# Cayo Drinks — Architectural & Business Decisions (ADR)

## Decision Log

### ADR 001: Clear PET Cans with Aluminum Pull-Tab Lids
- **Context**: Glass bottles are heavy and shatter easily at poolside or beach events. Tetra packs hide the natural beauty of the juice.
- **Decision**: Adopt crystal-clear, shatterproof PET cans with automated aluminum pull-tab lids.
- **Consequences**: Exceptional visual presentation showcasing the raw color of juices; lightweight for courier delivery; acceptable to luxury venues and pool decks.

### ADR 002: Paystack as the Primary Live Payment Gateway
- **Context**: Ghanaian consumers overwhelmingly pay via Mobile Money (MTN MoMo, Telecel Cash, AT Money) with occasional Visa/Mastercard payments.
- **Decision**: Integrate Paystack Live with instant checkout redirection, automated verification API (`/api/payments/paystack/verify`), and webhook handling (`/api/payments/paystack/webhook`).
- **Consequences**: Frictionless 30-second checkout flow on mobile devices; automated order reconciliation in Firestore.

### ADR 003: Dual Category Offering (Cold-Pressed Fruits + Craft Cocktails)
- **Context**: Fruit juices provide steady daytime revenue and corporate wellness recurring orders. Cocktails command higher margins and drive evening/event revenue.
- **Decision**: Maintain both fruit drinks and artisanal cocktails within the Cayo brand umbrella under distinct visual categories.
- **Consequences**: Balanced cash flow across day-parts (10am–3pm hydration vs. 6pm–midnight celebration).

### ADR 004: Direct WhatsApp Channel as Concierge & Fallback
- **Context**: Many high-value event planners and regular customers in Ghana prefer direct conversational communication.
- **Decision**: Prominently feature the WhatsApp concierge (`+233 559 412 097`) across the footer, navigation, and contact views.
- **Consequences**: High-touch customer satisfaction and rapid custom event quote generation.
