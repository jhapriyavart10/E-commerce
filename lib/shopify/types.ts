export type ShopifyProduct = {
  id: string;
  title: string;
  handle: string;
  descriptionHtml: string;
  images: {
    edges: Array<{ node: { url: string } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
      };
    }>;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalTaxAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: Array<{
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { title: string };
          image?: { url: string; altText: string };
          price: { amount: string; currencyCode: string };
        };
      };
    }>;
  };
};