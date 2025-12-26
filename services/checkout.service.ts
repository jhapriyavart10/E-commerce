import { shopifyFetch } from '@/lib/shopify';

export const CheckoutService = {
  async getCheckoutUrl(cartId: string): Promise<string> {
    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          checkoutUrl
        }
      }
    `;
    const res = await shopifyFetch<any>({ query, variables: { id: cartId }, cache: 'no-store' });
    return res.body.data.cart?.checkoutUrl || '';
  }
};