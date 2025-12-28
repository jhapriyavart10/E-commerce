import { shopifyFetch } from '@/lib/shopify';

export const CheckoutService = {
  /**
   * Generates a secure Shopify-hosted checkout URL for a specific cart.
   * @param cartId - The full Shopify GID (e.g., 'gid://shopify/Cart/...')
   */
  async getCheckoutUrl(cartId: string): Promise<string> {
    const query = `
      query getCart($id: ID!) {
        cart(id: $id) {
          checkoutUrl
        }
      }
    `;

    try {
      const res = await shopifyFetch<any>({ 
        query, 
        variables: { id: cartId }, 
        cache: 'no-store' 
      });

      // Safety check: Ensure the response body and data exist
      const checkoutUrl = res.body?.data?.cart?.checkoutUrl;

      if (!checkoutUrl) {
        console.warn(`No checkout URL found for Cart ID: ${cartId}. The cart may have expired.`);
        return '';
      }

      return checkoutUrl;
    } catch (error) {
      console.error("Error in CheckoutService.getCheckoutUrl:", error);
      // Return empty string to allow the API route to handle the 404/500 response
      return '';
    }
  }
};