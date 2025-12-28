import { NextResponse } from 'next/server';
import { CheckoutService } from '@/services/checkout.service';

export async function POST(req: Request) {
  try {
    const { cartId } = await req.json();

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }
    
    // Attempt to get the secure Shopify checkout URL
    const url = await CheckoutService.getCheckoutUrl(cartId);
    
    if (!url) {
      return NextResponse.json(
        { error: 'Could not generate checkout URL from Shopify' }, 
        { status: 404 }
      );
    }

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Checkout API Error:", error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate checkout' }, 
      { status: 500 }
    );
  }
}