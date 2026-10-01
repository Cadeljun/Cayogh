import { NextRequest, NextResponse } from 'next/server';
import { initializePayment } from '@/lib/paystack';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, amount, metadata, callbackUrl, reference } = body;

    if (!email || !amount) {
      return NextResponse.json(
        { success: false, error: 'Email and amount are required' },
        { status: 400 }
      );
    }

    // Determine the base URL for callback redirect if not provided
    const host = req.headers.get('host') || 'localhost:3000';
    const protocol = host.includes('localhost') ? 'http' : 'https';
    const defaultCallback = `${protocol}://${host}/checkout/verify`;

    const result = await initializePayment({
      email,
      amount: Number(amount),
      reference,
      callbackUrl: callbackUrl || defaultCallback,
      metadata: metadata || {},
      channels: ['card', 'mobile_money'],
    });

    return NextResponse.json({
      success: true,
      authorizationUrl: result.data.authorization_url,
      accessCode: result.data.access_code,
      reference: result.data.reference,
    });
  } catch (error: any) {
    console.error('Paystack initialization error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
