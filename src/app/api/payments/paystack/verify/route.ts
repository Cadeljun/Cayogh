import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/paystack';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Payment reference is required' },
        { status: 400 }
      );
    }

    const verification = await verifyPayment(reference);

    return NextResponse.json({
      success: true,
      status: verification.data.status,
      data: verification.data,
    });
  } catch (error: any) {
    console.error('Paystack verification error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Payment verification failed' },
      { status: 500 }
    );
  }
}
