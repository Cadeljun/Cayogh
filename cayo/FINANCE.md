# Cayo Drinks — Financial Model & Unit Economics

## Unit Economics (Per 330ml Can — Average)

| Line Item | Amount (GHS) | % of Selling Price |
|---|---|---|
| **Raw Ingredients (Fresh Fruit, Herbs, Botanicals)** | GH₵ 6.50 | 26.0% |
| **Packaging (PET Can, Lid, Label, Seal)** | GH₵ 3.00 | 12.0% |
| **Direct Labor (Washing, Pressing, Seaming)** | GH₵ 2.00 | 8.0% |
| **Cold Storage & Utilities** | GH₵ 1.00 | 4.0% |
| **Total Cost of Goods Sold (COGS)** | **GH₵ 12.50** | **50.0%** |
| **Average Retail Selling Price (Fruit Cans)** | **GH₵ 25.00** | **100.0%** |
| **Gross Margin Per Unit** | **GH₵ 12.50** | **50.0%** |

## Cocktail Unit Economics (Glass / Premium 500ml Can)
- Average Selling Price: **GH₵ 70.00**
- Average Ingredient & Spirit Cost: **GH₵ 22.00**
- Packaging & Garnishes: **GH₵ 6.00**
- Labor & Mixology: **GH₵ 5.00**
- **Cocktail Gross Margin**: **GH₵ 37.00 (~53%)**

## Payment Processing & Transaction Costs
- **Paystack Fee Structure**:
  - Ghana Cards: ~1.95% per transaction.
  - Ghana Mobile Money (MTN MoMo, Telecel Cash, AT Money): ~1.95% capped appropriately.
  - Live public key: Set via `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` in environment
  - Live secret key: Set via `PAYSTACK_SECRET_KEY` in environment
  - Webhook URL: `https://cayogh.netlify.app/api/payments/paystack/webhook`

## Monthly Operating Expenses (OPEX Budget — Estimated Year 1)
- Facility Rent & Kitchen Licensing (FDA Ghana / GSA): GH₵ 12,000 / mo
- Production & Operations Staff: GH₵ 18,000 / mo
- Marketing, Content Creation, & Ad Spend: GH₵ 8,000 / mo
- Software, Hosting, Dispatch & Connectivity: GH₵ 3,000 / mo
- Logistics & Courier Retainers: GH₵ 5,000 / mo
- **Monthly Fixed OPEX**: ~GH₵ 46,000 (~$3,800 USD)
- **Monthly Break-Even Volume**: ~3,680 fruit cans / 1,250 event cocktails.
