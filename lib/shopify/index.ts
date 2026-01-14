// lib/shopify/index.ts
export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache'
}: {
  query: string;
  variables?: any;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  const endpoint = process.env.SHOPIFY_STORE_DOMAIN!;
  const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

  try {
    const result = await fetch(`https://${endpoint}/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key
      },
      body: JSON.stringify({ query, variables }),
      cache
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    console.error('Shopify Fetch Error:', e);
    throw {
      error: e,
      query
    };
  }
}
const customerCreateMutation = `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customer { id }
      customerUserErrors { message }
    }
  }
`;

const customerAccessTokenCreateMutation = `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken { accessToken expiresAt }
      customerUserErrors { message }
    }
  }
`;

export async function createCustomer(details: any) {
  return shopifyFetch({
    query: customerCreateMutation,
    variables: { input: details }
  });
}

export async function loginCustomer(email: string, password: string) {
  return shopifyFetch({
    query: customerAccessTokenCreateMutation,
    variables: { input: { email, password } }
  });
}