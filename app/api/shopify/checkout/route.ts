import { NextResponse } from 'next/server';
import { getCartCheckoutUrl } from '@/services/cart.service';

export async function POST(req: Request) {
  const { cartId } = await req.json();
  
  try {
    const url = await getCartCheckoutUrl(cartId);
    return NextResponse.json({ url });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate checkout' }, { status: 500 });
  }
}