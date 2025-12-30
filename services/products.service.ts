import { shopifyFetch } from '@/lib/shopify';
import { getProductQuery, getProductsQuery } from '@/lib/shopify/queries';

/**
 * Utility: Resolve gender from metaobject reference
 */
function resolveGender(product: any): string {
  const genderRef = product.gender?.reference;
  const handle = genderRef?.handle;

  if (handle === 'male') return 'For Him';
  if (handle === 'female') return 'For Her';

  return 'Unisex';
}

/**
 * Utility: Resolve jewelry material from metaobject reference
 */
function resolveMaterial(product: any): string {
  const materialRef = product.material?.reference;

  if (!materialRef) return 'Unknown';

  // Prefer label field if client configured it
  const labelField = materialRef.fields?.find(
    (f: any) => f.key === 'label'
  );

  return labelField?.value || materialRef.handle || 'Unknown';
}

/**
 * Fetch all products for Catalogue
 */
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

/**
 * Fetch single product by handle
 */
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
      image:
        product.images?.edges?.[0]?.node?.url ||
        '/assets/images/necklace-img.png',
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
