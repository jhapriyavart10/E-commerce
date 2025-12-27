import { NextResponse } from 'next/server';
import { CheckoutService } from '@/services/checkout.service'; // Fixed Import

export async function POST(req: Request) {
  try {
    const { cartId } = await req.json();

    if (!cartId) {
      return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
    }
    
    // Use the method from the checkout service
    const url = await CheckoutService.getCheckoutUrl(cartId);
    
    if (!url) {
      return NextResponse.json({ error: 'Could not generate checkout URL' }, { status: 404 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: 'Failed to generate checkout' }, { status: 500 });
  }
}