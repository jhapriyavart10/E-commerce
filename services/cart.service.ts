import { shopifyFetch } from '@/lib/shopify';

export const CartService = {
  async createCart() {
    const mutation = `
      mutation cartCreate {
        cartCreate {
          cart {
            id
            checkoutUrl
          }
        }
      }
    `;
    const res = await shopifyFetch<any>({ query: mutation, cache: 'no-store' });
    return res.body.data.cartCreate.cart;
  },

  async addToCart(cartId: string, variantId: string) {
    const mutation = `
      mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 10) {
              edges {
                node {
                  id
                  quantity
                }
              }
            }
          }
        }
      }
    `;
    const variables = { cartId, lines: [{ merchandiseId: variantId, quantity: 1 }] };
    return await shopifyFetch({ query: mutation, variables, cache: 'no-store' });
  }
};