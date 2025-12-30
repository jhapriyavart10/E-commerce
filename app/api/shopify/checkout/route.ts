import { NextResponse } from 'next/server';

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const SHOPIFY_STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN!;
const SHOPIFY_API_VERSION = '2024-04';

const SHOPIFY_ENDPOINT = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

async function shopifyFetch(query: string, variables: any) {
  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  // Handle GraphQL errors
  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}

export async function POST(req: Request) {
  try {
    const { cartId } = await req.json();

    if (!cartId) {
      return NextResponse.json({ error: 'cartId is required' }, { status: 400 });
    }

    // Directly query the cart for its pre-generated checkout URL
    const cartQuery = `
      query getCart($id: ID!) {
        cart(id: $id) {
          id
          checkoutUrl
          lines(first: 1) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `;

    const data = await shopifyFetch(cartQuery, { id: cartId });

    if (!data?.cart) {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    // Ensure the cart isn't empty
    if (data.cart.lines.edges.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const checkoutUrl = data.cart.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error('Shopify did not provide a checkout URL for this cart');
    }

    return NextResponse.json({ url: checkoutUrl });

  } catch (error: any) {
    console.error('Checkout API Error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}