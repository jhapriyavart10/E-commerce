import { shopifyFetch } from '@/lib/shopify';
import { getProductQuery, getProductsQuery } from '@/lib/shopify/queries';

/**
 * Fetches all products for the Catalogue Page
 */
export async function getProducts() {
  if (process.env.USE_MOCK_DATA === 'true') {
    return [
      {
        id: "gid://shopify/ProductVariant/1",
        title: "Mock Crystal",
        handle: "mock-crystal",
        price: 45.00,
        image: "/assets/images/jewellery1.png"
      }
    ];
  }

  try {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { first: 28}
    });

    // 1. Check if the response body or data is missing
    if (!res?.body?.data?.products?.edges) {
      console.error("Shopify API Error: No product edges found. Check credentials.");
      return []; 
    }

    return res.body.data.products.edges.map((edge: any) => {
      const product = edge.node;
      
      // 2. Safe extraction using Optional Chaining
      const variantNode = product.variants?.edges?.[0]?.node;
      const imageNode = product.images?.edges?.[0]?.node;

      return {
        // Use variant ID if available, otherwise fallback to product ID
        id: variantNode?.id || product.id,
        title: product.title,
        handle: product.handle,
        price: parseFloat(variantNode?.price?.amount || "0"),
        image: imageNode?.url || '/assets/images/necklace-img.png',
        images: product.images?.edges?.map((e: any) => e.node.url) || [],
        // Add default fields for your frontend filters
        category: product.productType || 'Jewellery',
        gender: 'Unisex',
        material: 'Gold'
      };
    });
  } catch (err) {
    console.error("Service Layer Failure (getProducts):", err);
    return []; 
  }
}

/**
 * Fetches a single product by handle
 */
export async function getProduct(handle: string) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return {
      id: "gid://shopify/ProductVariant/1",
      title: "Mock Detail Product",
      price: 45.00,
      image: "/assets/images/jewellery1.png",
      description: "Beautiful mock description"
    };
  }

  try {
    const res = await shopifyFetch<any>({
      query: getProductQuery,
      variables: { handle }
    });

    const product = res?.body?.data?.product;
    if (!product) return null;

    const variantNode = product.variants?.edges?.[0]?.node;

    return {
      id: variantNode?.id || product.id, 
      productId: product.id,                 
      title: product.title,
      price: parseFloat(variantNode?.price?.amount || "0"),
      image: product.images?.edges?.[0]?.node?.url || '/assets/images/necklace-img.png',
      description: product.descriptionHtml,
      variants: (product.variants?.edges || []).map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount
      }))
    };
  } catch (err) {
    console.error("Fetch Product Error (getProduct):", err);
    return null;
  }
}