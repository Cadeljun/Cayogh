import { NextRequest, NextResponse } from 'next/server';
import { verifyPaystackSignature } from '@/lib/paystack';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    // Verify webhook authenticity
    const isValid = verifyPaystackSignature(rawBody, signature);
    if (!isValid) {
      console.warn('Invalid Paystack webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const event = JSON.parse(rawBody);

    // Handle Paystack events
    switch (event.event) {
      case 'charge.success': {
        const { reference, amount, currency, channel, customer, metadata } = event.data;
        console.log(`[Paystack Webhook] Successful payment: Reference=${reference}, Amount=${amount / 100} ${currency}, Customer=${customer?.email}`);
        
        // Order metadata is passed during initialization
        const orderId = metadata?.orderId;
        const ownerId = metadata?.ownerId;
        
        // Log transaction success
        console.log(`[Paystack Webhook] Order ${orderId} by owner ${ownerId} paid via ${channel}`);
        break;
      }

      default:
        console.log(`[Paystack Webhook] Unhandled event: ${event.event}`);
    }

    // Always return 200 OK to Paystack
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Paystack webhook handling error:', error);
    return NextResponse.json(
      { error: 'Webhook processing error', details: error.message },
      { status: 500 }
    );
  }
}
