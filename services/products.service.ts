import { shopifyFetch } from '@/lib/shopify';
import { getProductQuery, getProductsQuery } from '@/lib/shopify/queries';

/**
 * Helper to extract display values from Metaobject fields
 */
function resolveMetaobjectValue(metafield: any, fallback: string): string {
  const fields = metafield?.reference?.fields;
  if (!fields || !Array.isArray(fields)) return fallback;

  // Search for common keys used by Shopify to store the display name
  const displayField = fields.find((f: any) => 
    f.key === 'name' || f.key === 'label' || f.key === 'value' || f.key === 'display_name'
  );

  return displayField?.value || fallback;
}

/**
 * Resolves gender and maps it to the frontend sidebar labels
 */
function resolveGender(product: any): string {
  // Access the first node in the references list
  const genderNode = product.gender?.references?.edges?.[0]?.node;
  
  if (!genderNode) return 'Unisex';

  // 1. Try to get the Display Name (Label) directly: "For Him"
  const label = genderNode.field?.value;
  if (label) return label;

  // 2. Fallback: Map the handle if the label field query failed
  const handle = genderNode.handle?.toLowerCase();
  const genderMap: Record<string, string> = {
    male: 'For Him',
    female: 'For Her',
    unisex: 'Unisex',
  };

  return genderMap[handle] || 'Unisex';
}

function resolveMaterial(product: any): string {
  const node = product.material?.references?.edges?.[0]?.node;
  
  if (!node) return 'Missing Material'; // DON'T default to 'Pink Shell'

  // Standard Shopify fields usually use 'label' for the display name
  const displayValue = node.field?.value; 
  
  return displayValue || 'Missing Material';
}

export async function getProducts() {
  if (process.env.USE_MOCK_DATA === 'true') {
    return [
      {
        id: 'gid://shopify/ProductVariant/1',
        title: 'Mock Crystal',
        handle: 'mock-crystal',
        price: 45,
        image: '/assets/images/jewellery1.png',
        category: 'Bracelets',
        gender: 'Unisex',
        material: 'Pink Shell',
      },
    ];
  }

  try {
    const res = await shopifyFetch<any>({
      query: getProductsQuery,
      variables: { first: 28 },
    });

    const edges = res?.body?.data?.products?.edges;
    if (!edges) return [];

    return edges.map((edge: any) => {
      const product = edge.node;
      const variantNode = product.variants?.edges?.[0]?.node;
      const imageNode = product.images?.edges?.[0]?.node;
      if (product.handle === 'spiral-crystal-pendants') {
        console.log('--- DEBUGGING METAFIELDS ---');
        console.log(JSON.stringify(product.debugMetafields, null, 2));
      }

      return {
        id: variantNode?.id || product.id,
        title: product.title,
        handle: product.handle,
        price: Number(variantNode?.price?.amount || 0),
        image: imageNode?.url || '/assets/images/necklace-img.png',
        images: product.images?.edges?.map((e: any) => e.node.url) || [],
        category: product.productType || 'Jewellery',
        gender: resolveGender(product),
        material: resolveMaterial(product),
      };
    });
  } catch (err) {
    console.error('Service Layer Failure (getProducts):', err);
    return [];
  }
}

export async function getProduct(handle: string) {
  if (process.env.USE_MOCK_DATA === 'true') {
    return {
      id: 'gid://shopify/ProductVariant/1',
      title: 'Mock Detail Product',
      price: 45,
      image: '/assets/images/jewellery1.png',
      description: 'Beautiful mock description',
      category: 'Bracelets',
      gender: 'Unisex',
      material: 'Pink Shell',
    };
  }

  try {
    const res = await shopifyFetch<any>({
      query: getProductQuery,
      variables: { handle },
    });

    const product = res?.body?.data?.product;
    if (!product) return null;

    const variantNode = product.variants?.edges?.[0]?.node;

    return {
      id: variantNode?.id || product.id,
      productId: product.id,
      title: product.title,
      handle: product.handle,
      price: Number(variantNode?.price?.amount || 0),
      image: product.images?.edges?.[0]?.node?.url || '/assets/images/necklace-img.png',
      description: product.descriptionHtml,
      category: product.productType || 'Jewellery',
      gender: resolveGender(product),
      material: resolveMaterial(product),
      variants: product.variants?.edges?.map((v: any) => ({
        id: v.node.id,
        title: v.node.title,
        price: v.node.price.amount,
      })) || [],
    };
  } catch (err) {
    console.error('Fetch Product Error (getProduct):', err);
    return null;
  }
}