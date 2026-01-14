import { createCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

interface ShopifyResponse<T> {
  body: {
    data: T;
  };
}

interface CustomerCreateData {
  customerCreate: {
    customer: { id: string } | null;
    customerUserErrors: Array<{ message: string }>;
  };
}

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    const response = await createCustomer({
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing: true
    });

    // FIX: Access response.body.data.customerCreate
    const responseBody = response.body as { data: CustomerCreateData };
    
    if (!responseBody.data || !responseBody.data.customerCreate) {
       return NextResponse.json(
        { message: 'Invalid response from Shopify' },
        { status: 500 }
      );
    }

    const { customer, customerUserErrors } = responseBody.data.customerCreate;

    if (customerUserErrors && customerUserErrors.length > 0) {
      return NextResponse.json(
        { message: customerUserErrors[0].message },
        { status: 400 }
      );
    }

    if (!customer) {
      return NextResponse.json(
        { message: 'Failed to create customer' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true, customerId: customer.id });
  } catch (error: any) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}