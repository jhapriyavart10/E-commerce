import { NextResponse } from 'next/server';
import { CartService } from '@/services/cart.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get('id');

  if (!cartId) {
    return NextResponse.json({ error: 'Cart ID is required' }, { status: 400 });
  }

  try {
    const cart = await CartService.getCart(cartId);
    return NextResponse.json(cart);
  } catch (error) {
    console.error("Shopify Cart Fetch Error:", error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { cartId, variantId, quantity } = await req.json();
    
    if (!variantId) {
      return NextResponse.json({ error: 'Variant ID is required' }, { status: 400 });
    }

    if (!cartId) {
      const newCart = await CartService.createCart(variantId, quantity || 1);
      return NextResponse.json(newCart);
    }

    const updatedCart = await CartService.addToCart(cartId, variantId);
    return NextResponse.json(updatedCart);

  } catch (error) {
    console.error("Shopify Cart API Error:", error);
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}