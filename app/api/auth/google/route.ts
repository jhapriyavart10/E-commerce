import { createCustomer, loginCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // This route would normally be the 'callback' from Google OAuth
  // Assuming you've received: { email, firstName, lastName }
  const mockGoogleData = {
    email: "user@gmail.com",
    firstName: "Google",
    lastName: "User"
  };

  try {
    // 1. Try to create the user (if they don't exist)
    const registerResponse = await createCustomer({
      email: mockGoogleData.email,
      firstName: mockGoogleData.firstName,
      lastName: mockGoogleData.lastName,
      password: "GoogleAuthUser123!", // Secure placeholder
      acceptsMarketing: true
    });

    // 2. Log them in to get a Shopify Access Token
    const loginResponse = await loginCustomer(mockGoogleData.email, "GoogleAuthUser123!");
    const accessToken = (loginResponse.body as any)?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

    if (accessToken) {
      cookies().set('customerAccessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
      return NextResponse.redirect(new URL('/product-analogue', req.url));
    }

    return NextResponse.redirect(new URL('/signin?error=auth_failed', req.url));
  } catch (error) {
    console.error('Google Auth Error:', error);
    return NextResponse.redirect(new URL('/signup?error=server_error', req.url));
  }
}