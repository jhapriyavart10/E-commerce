import { createCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

/**
 * Define the GraphQL response shape based on the logged Shopify output.
 * Your logs show the payload is directly in 'response.body'.
 */
interface CustomerCreateData {
  customerCreate: {
    customer: { id: string } | null;
    customerUserErrors: Array<{ message: string }>;
  };
}

export async function POST(req: Request) {
  try {
    const { email, password, firstName, lastName } = await req.json();

    // Call the shopify library function
    const response = await createCustomer({
      email,
      password,
      firstName,
      lastName,
      acceptsMarketing: true
    });

    const responseBody = response.body as CustomerCreateData;
    
    // Safety check to ensure the payload exists before destructuring
    if (!responseBody || !responseBody.customerCreate) {
      console.error('Unexpected Shopify structure or empty response:', responseBody);
      return NextResponse.json(
        { message: 'Invalid response from Shopify service' },
        { status: 500 }
      );
    }

    const { customer, customerUserErrors } = responseBody.customerCreate;

    // Handle Shopify-specific validation errors (e.g., email already taken)
    if (customerUserErrors && customerUserErrors.length > 0) {
      return NextResponse.json(
        { message: customerUserErrors[0].message },
        { status: 400 }
      );
    }

    // Handle cases where no customer object is returned despite no errors
    if (!customer) {
      return NextResponse.json(
        { message: 'Customer creation succeeded but no data was returned.' },
        { status: 400 }
      );
    }

    // Success response
    return NextResponse.json({ 
      success: true, 
      customerId: customer.id 
    });

  } catch (error: any) {
    // Log the full exception to your server terminal for debugging
    console.error('Registration Route Exception:', error);
    
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}