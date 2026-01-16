import { shopifyFetch } from '@/lib/shopify';
import { NextResponse } from 'next/server';

const CART_DISCOUNT_MUTATION = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        discountCodes {
          code
          applicable
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const { checkoutId, discountCode } = await req.json();

    const response = await shopifyFetch<any>({
      query: CART_DISCOUNT_MUTATION,
      variables: { 
        cartId: checkoutId, // This is your shopify_cart_id from context
        discountCodes: [discountCode] 
      },
      cache: 'no-store'
    });

    const mutationResult = response.body.cartDiscountCodesUpdate;
    const errors = mutationResult.userErrors;
    
    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors[0].message });
    }

    // Check if the code was actually applied (Shopify might return no errors but 'applicable: false')
    const appliedCode = mutationResult.cart.discountCodes.find((d: any) => d.code.toUpperCase() === discountCode.toUpperCase());
    
    if (!appliedCode || !appliedCode.applicable) {
      return NextResponse.json({ success: false, error: 'This discount code is not applicable to your cart.' });
    }

    return NextResponse.json({ 
      success: true, 
      newTotal: mutationResult.cart.cost.totalAmount.amount 
    });
  } catch (error: any) {
    console.error("Cart Discount API Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to apply coupon' }, { status: 500 });
  }
}