// services/products.service.ts
import { shopifyFetch } from '@/lib/shopify';
import { getProductsQuery, getProductQuery } from '@/lib/shopify/queries';
import { Product } from '@/lib/shopify/types'; // Ensure you have this type or use 'any' if strictly needed

// Helper to reshape Shopify data
const reshapeProduct = (product: any) => {
  if (!product) return undefined;
  const { images, variants, ...rest } = product;
  return {
    ...rest,
    image: images?.edges?.[0]?.node?.url || '',
    price: variants?.edges?.[0]?.node?.price?.amount ? parseFloat(variants.edges[0].node.price.amount) : 0,
    // Extract metadata values for filters
    gender: product.gender?.references?.edges?.map((e: any) => e.node?.field?.value) || [],
    material: product.material?.references?.edges?.map((e: any) => e.node?.field?.value) || [],
    category: product.productType
  };
};

export async function getProducts(cursor?: string) {
  const res = await shopifyFetch<any>({
    query: getProductsQuery,
    variables: { 
      first: 12, // Load 12 items per batch
      after: cursor || null 
    }, 
    cache: 'no-store'
  });

  const shopifyProducts = res.body?.products?.edges || [];
  const pageInfo = res.body?.products?.pageInfo;

  return {
    products: shopifyProducts.map((item: any) => reshapeProduct(item.node)),
    pageInfo
  };
}

export async function getProduct(handle: string) {
  const res = await shopifyFetch<any>({
    query: getProductQuery,
    variables: { handle },
    cache: 'no-store'
  });
  return reshapeProduct(res.body?.product);
}