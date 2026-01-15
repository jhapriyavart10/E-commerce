import { createCustomer, loginCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

/**
 * Helper function to exchange the Google Auth Code for real user profile data.
 */
async function getGoogleUser(code: string) {
  const rootUrl = 'https://oauth2.googleapis.com/token';
  
  // These must be defined in your .env file
  const options = {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirect_uri: process.env.REDIRECT_URI || '',
    grant_type: 'authorization_code',
  };

  const res = await fetch(rootUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(options),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.error('Google Token Exchange Error:', errorData);
    throw new Error('Failed to exchange Google auth code');
  }

  const { id_token, access_token } = await res.json();

  // Fetch the user's profile using the access_token
  const userRes = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?alt=json&access_token=${access_token}`,
    {
      headers: { Authorization: `Bearer ${id_token}` },
    }
  );

  if (!userRes.ok) {
    throw new Error('Failed to fetch user profile from Google');
  }

  const profile = await userRes.json();

  return {
    email: profile.email,
    firstName: profile.given_name || 'Google', 
    lastName: profile.family_name || 'User',
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/signin?error=no_code', req.url));
  }

  try {
    const googleUser = await getGoogleUser(code); 
    try {
      await createCustomer({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        password: "GoogleAuthUser123!", // Consistent placeholder for OAuth
        acceptsMarketing: true
      });
    } catch (e) {
      // Ignore "Email has already been taken" errors to allow returning users to log in
      console.log('User may already exist, attempting login...');
    }

    // 3. Log into Shopify to get a Customer Access Token
    const loginResponse = await loginCustomer(googleUser.email, "GoogleAuthUser123!");
    const accessToken = (loginResponse.body as any)?.customerAccessTokenCreate?.customerAccessToken?.accessToken;

    if (accessToken) {
      cookies().set('customerAccessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
        sameSite: 'lax'
      });
      return NextResponse.redirect(new URL('/product-analogue', req.url));
    }

    return NextResponse.redirect(new URL('/signin?error=auth_failed', req.url));
  } catch (error) {
    console.error('Google Auth Error:', error);
    return NextResponse.redirect(new URL('/signup?error=server_error', req.url));
  }
}