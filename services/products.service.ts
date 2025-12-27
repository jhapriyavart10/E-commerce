import { shopifyFetch } from '@/lib/shopify';
import { getProductQuery, getProductsQuery } from '@/lib/shopify/queries';

export async function getProducts() {
  // 1. Mock Data logic (Safe development)
  if (process.env.USE_MOCK_DATA === 'true') {
    return [
      {
        id: "gid://shopify/ProductVariant/1",
        name: "Mock Crystal",
        handle: "mock-crystal",
        price: 45.00,
        image: "/assets/images/jewellery1.png"
      }
    ];
  }

  try {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { first: 20 }
    });

    // CRITICAL FIX: Handle cases where Shopify credentials are wrong or API is down
    if (!res?.body?.data?.products) {
      console.error("Shopify API Error: No product data received. Check your .env credentials.");
      return []; // Return empty array so .filter() doesn't crash the frontend
    }

    return res.body.data.products.edges.map((edge: any) => {
      const product = edge.node;
      return {
        id: product.variants.edges[0]?.node?.id || product.id,
        name: product.title,
        handle: product.handle,
        price: parseFloat(product.variants.edges[0]?.node?.price?.amount || "0"),
        image: product.images.edges[0]?.node?.url || ''
      };
    });
  } catch (err) {
    console.error("Service Layer Failure:", err);
    return []; // Return empty array to prevent frontend crash
  }
}

export async function getProduct(handle: string) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return {
      id: "gid://shopify/ProductVariant/1",
      name: "Mock Detail Product",
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

    return {
      id: product.variants.edges[0]?.node?.id, 
      productId: product.id,                 
      name: product.title,
      price: parseFloat(product.variants.edges[0]?.node?.price?.amount || "0"),
      image: product.images.edges[0]?.node?.url || '',
      description: product.descriptionHtml,
      variants: product.variants.edges.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount
      }))
    };
  } catch (err) {
    console.error("Fetch Product Error:", err);
    return null;
  }
}