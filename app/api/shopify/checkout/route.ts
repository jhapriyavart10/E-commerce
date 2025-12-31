// app/api/shopify/checkout/route.ts
import { NextResponse } from 'next/server';

// Use your existing library for cleaner code
import { shopifyFetch } from '@/lib/shopify'; 

export async function POST(req: Request) {
  try {
    const { cartId, customerDetails } = await req.json();

    if (!cartId) {
      return NextResponse.json({ error: 'cartId is required' }, { status: 400 });
    }

    // 1. If customer details exist (from Step 2 Checkout), update the cart first
    if (customerDetails) {
      const updateBuyerMutation = `
        mutation cartBuyerIdentityUpdate($cartId: ID!, $buyerIdentity: CartBuyerIdentityInput!) {
          cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentity) {
            cart { id }
            userErrors { field message }
          }
        }
      `;

      await shopifyFetch({
        query: updateBuyerMutation,
        variables: {
          cartId,
          buyerIdentity: {
            email: customerDetails.email,
            deliveryAddressPreferences: [
              {
                deliveryAddress: {
                  address1: customerDetails.streetAddress,
                  city: customerDetails.townCity,
                  country: customerDetails.country,
                  firstName: customerDetails.firstName,
                  lastName: customerDetails.lastName,
                  province: customerDetails.state,
                  zip: customerDetails.pincode
                }
              }
            ]
          }
        }
      });
    }

    // 2. Fetch the checkoutUrl
    const cartQuery = `
      query getCart($id: ID!) {
        cart(id: $id) {
          checkoutUrl
          lines(first: 1) {
            edges { node { id } }
          }
        }
      }
    `;

    const data: any = await shopifyFetch({ query: cartQuery, variables: { id: cartId } });

    if (!data?.body?.data?.cart?.checkoutUrl) {
      throw new Error('Checkout URL not found');
    }

    return NextResponse.json({ url: data.body.data.cart.checkoutUrl });

  } catch (error: any) {
    console.error('Checkout Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}