// services/products.service.ts
import { shopifyFetch } from '@/lib/shopify';
import { getProductQuery } from '@/lib/shopify/queries';

export async function getProduct(handle: string) {
  // Check if Mock Mode is enabled
  if (process.env.USE_MOCK_DATA === 'true') {
    return { id: '1', title: 'Mock Crystal Necklace', price: 45.00 }; // Standardized mock
  }

  const res = await shopifyFetch<any>({
    query: getProductQuery,
    variables: { handle }
  });

  const product = res.body.data.product;
  
  // Transform Shopify Variant/Image structure to match your UI's expected 'CartItem' or 'Product' interface
  return {
    id: product.id,
    name: product.title,
    price: parseFloat(product.variants.edges[0].node.price.amount),
    image: product.images.edges[0]?.node.url,
    description: product.descriptionHtml,
    variants: product.variants.edges.map((v: any) => v.node)
  };
}