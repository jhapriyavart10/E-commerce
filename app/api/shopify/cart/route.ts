import { NextResponse } from 'next/server';
import { CartService } from '@/services/cart.service';

export async function POST(req: Request) {
  try {
    const { cartId, variantId, quantity } = await req.json();
    
    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    // 1. If no cartId exists, create a new one with the item
    if (!cartId) {
      // Pass the actual variantId and quantity (default to 1)
      const newCart = await CartService.createCart(variantId, quantity || 1);
      return NextResponse.json(newCart);
    }

    // 2. If cartId exists, add the item to the existing cart
    const updatedCart = await CartService.addToCart(cartId, variantId);
    return NextResponse.json(updatedCart);

  } catch (error) {
    console.error("Shopify Cart API Error:", error);
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}