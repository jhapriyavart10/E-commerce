import { shopifyFetch } from '@/lib/shopify';

export const CartService = {
  // Updated to accept arguments
  async createCart(variantId: string, quantity: number) {
    const mutation = `
      mutation cartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;
    const variables = {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity: quantity
          }
        ]
      }
    };

    const res = await shopifyFetch<any>({ 
      query: mutation, 
      variables, 
      cache: 'no-store' 
    });
    
    return res.body?.cartCreate?.cart;
  },

  async addToCart(cartId: string, variantId: string) {
    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;
    const variables = { 
      cartId, 
      lines: [{ merchandiseId: variantId, quantity: 1 }] 
    };

    const res = await shopifyFetch<any>({ 
      query: mutation, 
      variables, 
      cache: 'no-store' 
    });

    return res.body?.cartLinesAdd?.cart;
  }
};