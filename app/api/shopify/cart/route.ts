import { NextResponse } from 'next/server';
import { CartService } from '@/services/cart.service';

export async function POST(req: Request) {
  try {
    const { cartId, variantId, quantity } = await req.json();
    
    if (!cartId) {
      const newCart = await CartService.createCart(variantId, quantity);
      return NextResponse.json(newCart);
    }

    const updatedCart = await CartService.addToCart(cartId, variantId);
    return NextResponse.json(updatedCart);
  } catch (error) {
    return NextResponse.json({ error: 'Cart operation failed' }, { status: 500 });
  }
}