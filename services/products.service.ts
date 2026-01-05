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
export function resolveGender(product: any): string[] {
  const nodes = product.gender?.references?.edges?.map((edge: any) => edge.node) || [];

  // If truly no data, return a single 'Unisex' entry
  if (nodes.length === 0) return ['Unisex'];

  const genders = nodes.map((node: any) => {
    return node.field?.value || 'Unisex';
  });

  // FIX: Use Set to remove duplicates like ['Unisex', 'Unisex']
  return Array.from(new Set(genders)); 
}
export function resolveMaterial(product: any): string[] {
  // 1. Extract all nodes from the references list
  const nodes = product.material?.references?.edges?.map((edge: any) => edge.node) || [];

  // 2. Fallback if no materials are assigned
  if (nodes.length === 0) return ['Uncategorized'];

  // 3. Map nodes to their labels and remove duplicates using a Set
  const materials = nodes.map((node: any) => {
    return node.field?.value || 'Uncategorized';
  });

  return Array.from(new Set(materials));
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
    console.log('RAW SHOPIFY DATA:', JSON.stringify(res.body.data.product, null, 2));

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
        price: Number(v.node.price.amount),
        image: v.node.image?.url || null, 
        selectedOptions: v.node.selectedOptions.reduce((acc: any, opt: any) => {
      acc[opt.name] = opt.value;
      return acc;
    }, {})
      })) || [],
      rating: product.rating?.value ? parseFloat(product.rating.value) : 0,
      reviewCount: product.reviewCount?.value ? parseInt(product.reviewCount.value) : 0,
      reviews: product.reviewList?.value ? JSON.parse(product.reviewList.value) : []
    };
  } catch (err) {
    console.error('Fetch Product Error (getProduct):', err);
    return null;
  }
}