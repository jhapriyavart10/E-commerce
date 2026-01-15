// app/api/shopify/checkout/route.ts
import { NextResponse } from 'next/server';
import { shopifyFetch } from '@/lib/shopify'; 

export async function POST(req: Request) {
  try {
    const { cartId, variantId, quantity } = await req.json();

    // 1. Handle "Buy with Shop" (Direct Variant)
    if (!cartId && variantId) {
      const createCartMutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart { id, checkoutUrl }
            userErrors { message }
          }
        }
      `;
      const response: any = await shopifyFetch({
        query: createCartMutation,
        variables: { input: { lines: [{ merchandiseId: variantId, quantity: quantity || 1 }] } },
        cache: 'no-store'
      });
      
      const cart = response.body?.cartCreate?.cart;
      if (cart) return NextResponse.json({ url: cart.checkoutUrl });
      return NextResponse.json({ error: "Could not create cart" }, { status: 400 });
    }

    // 2. Handle Normal Cart Checkout
    const cartQuery = `
      query getCart($id: ID!) {
        cart(id: $id) { checkoutUrl }
      }
    `;
    const data: any = await shopifyFetch({ query: cartQuery, variables: { id: cartId }, cache: 'no-store' });
    const cart = data?.body?.cart;

    // 3. Stale ID Protection: If Shopify returns null, the ID is from the OLD store
    if (!cart) {
      return NextResponse.json({ 
        error: 'STALE_ID', 
        message: 'Your session has expired. Please refresh the page.' 
      }, { status: 404 });
    }

    return NextResponse.json({ url: cart.checkoutUrl });

  } catch (error: any) {
    console.error('Checkout Error:', error.error?.message || error.message || error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}