import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID; // Add your List ID to .env
    const privateKey = process.env.KLAVIYO_PRIVATE_KEY;

    if (!listId || !privateKey) {
      return NextResponse.json({ error: 'Configuration missing' }, { status: 500 });
    }

    // Modern Klaviyo Lists API
    const response = await fetch(
      `https://a.klaviyo.com/api/lists/${listId}/`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Klaviyo-API-Key ${privateKey}`,
          'Accept': 'application/json',
          'Revision': '2024-10-15'
        }
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'Klaviyo fetch failed' }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      name: data.data.attributes.name,
      // Note: Full profile count often requires a separate 'relationships' call
      // but list name and basic metadata are returned here.
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}