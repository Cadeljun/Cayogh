import crypto from 'crypto';

export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';
export const PAYSTACK_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';

export interface InitializePaymentParams {
  email: string;
  amount: number; // In GHS (e.g. 75.50)
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, any>;
  channels?: string[];
}

export interface InitializePaymentResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface VerifyPaymentResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'abandoned';
    reference: string;
    amount: number; // in pesewas
    message: string | null;
    gateway_response: string;
    paid_at: string;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: Record<string, any>;
    customer: {
      id: number;
      first_name: string | null;
      last_name: string | null;
      email: string;
      phone: string | null;
    };
  };
}

/**
 * Initialize a Paystack payment session
 */
export async function initializePayment(params: InitializePaymentParams): Promise<InitializePaymentResponse> {
  const reference = params.reference || `cayo_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  // Paystack expects amounts in the currency's lowest subunit (1 GHS = 100 pesewas)
  const amountInPesewas = Math.round(params.amount * 100);

  const payload: Record<string, any> = {
    email: params.email,
    amount: amountInPesewas,
    currency: 'GHS',
    reference,
    channels: params.channels || ['card', 'mobile_money'],
  };

  if (params.callbackUrl) {
    payload.callback_url = params.callbackUrl;
  }

  if (params.metadata) {
    payload.metadata = params.metadata;
  }

  const response = await fetch('https://api.paystack.co/transaction/initialize', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to initialize Paystack transaction');
  }

  return data;
}

/**
 * Verify a Paystack transaction by reference
 */
export async function verifyPayment(reference: string): Promise<VerifyPaymentResponse> {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  const data = await response.json();
  if (!response.ok || !data.status) {
    throw new Error(data.message || 'Failed to verify Paystack transaction');
  }

  return data;
}

/**
 * Validate Paystack Webhook HMAC SHA512 signature
 */
export function verifyPaystackSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !PAYSTACK_SECRET_KEY) return false;
  const hash = crypto.createHmac('sha512', PAYSTACK_SECRET_KEY).update(rawBody).digest('hex');
  return hash === signature;
}
