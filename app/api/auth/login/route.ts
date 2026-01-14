import { loginCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface CustomerAccessTokenCreateData {
  customerAccessTokenCreate: {
    customerAccessToken: { accessToken: string; expiresAt: string } | null;
    customerUserErrors: Array<{ message: string }>;
  };
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // 1. Call your shopify library function
    const response = await loginCustomer(email, password);
    const responseBody = response.body as CustomerAccessTokenCreateData;

    // Safety check to ensure the payload exists
    if (!responseBody || !responseBody.customerAccessTokenCreate) {
      console.error('Unexpected Shopify login response structure:', responseBody);
      return NextResponse.json(
        { message: 'Invalid response from login service' },
        { status: 500 }
      );
    }

    const { customerAccessToken, customerUserErrors } = responseBody.customerAccessTokenCreate;

    // 2. Handle Shopify-specific errors (e.g., wrong password)
    if (customerUserErrors && customerUserErrors.length > 0) {
      return NextResponse.json(
        { message: customerUserErrors[0].message }, 
        { status: 401 }
      );
    }

    if (!customerAccessToken?.accessToken) {
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    // 3. Set the cookie securely
    cookies().set('customerAccessToken', customerAccessToken.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Login Route Exception:', error);
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}