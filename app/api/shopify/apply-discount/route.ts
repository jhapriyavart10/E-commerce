import { shopifyFetch } from '@/lib/shopify';
import { NextResponse } from 'next/server';

const DISCOUNT_MUTATION = `
  mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
    checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
      checkout { id totalPrice { amount } }
      checkoutUserErrors { message }
    }
  }
`;

export async function POST(req: Request) {
  try {
    const { checkoutId, discountCode } = await req.json();

    const response = await shopifyFetch<any>({
      query: DISCOUNT_MUTATION,
      variables: { checkoutId, discountCode },
      cache: 'no-store'
    });

    const errors = response.body.data.checkoutDiscountCodeApplyV2.checkoutUserErrors;
    
    if (errors.length > 0) {
      return NextResponse.json({ success: false, error: errors[0].message });
    }

    return NextResponse.json({ 
      success: true, 
      newTotal: response.body.data.checkoutDiscountCodeApplyV2.checkout.totalPrice.amount 
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to apply coupon' }, { status: 500 });
  }
}