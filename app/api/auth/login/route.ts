import { loginCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface LoginResponse {
  data: {
    customerAccessTokenCreate: {
      customerAccessToken: {
        accessToken: string;
        expiresAt: string;
      } | null;
      customerUserErrors: Array<{ message: string }>;
    };
  };
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const response = await loginCustomer(email, password);
    const body = response.body as LoginResponse;
    const { customerAccessToken, customerUserErrors } = body.data.customerAccessTokenCreate;
    if (customerUserErrors && customerUserErrors.length > 0) {
      return NextResponse.json(
        { message: customerUserErrors[0].message }, 
        { status: 401 }
      );
    }

    if (!customerAccessToken) {
      return NextResponse.json(
        { message: 'Failed to create access token.' }, 
        { status: 401 }
      );
    }

    cookies().set('customerAccessToken', customerAccessToken.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Login Route Error:', error);
    
    return NextResponse.json(
      { message: error.message || 'Internal Server Error' }, 
      { status: 500 }
    );
  }
}