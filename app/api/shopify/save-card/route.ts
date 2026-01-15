import { updateCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { last4, brand, expiry } = await req.json();
    const accessToken = cookies().get('customerAccessToken')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const cardData = JSON.stringify({ last4, brand, expiry });

    const response = await updateCustomer(accessToken, {
      metafields: [
        {
          namespace: "custom",
          key: "saved_card",
          value: cardData,
          type: "json"
        }
      ]
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}