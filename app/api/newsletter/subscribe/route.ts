import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    const listId = process.env.KLAVIYO_NEWSLETTER_LIST_ID;
    const privateKey = process.env.KLAVIYO_PRIVATE_KEY;

    // 1. Create or Update the Profile
    const response = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
      method: 'POST',
      headers: {
        'Authorization': `Klaviyo-API-Key ${privateKey}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Revision': '2024-10-15'
      },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            profiles: {
              data: [{
                type: 'profile',
                attributes: {
                  email: email,
                  subscriptions: {
                    email: { marketing: { consent: 'SUBSCRIBED' } }
                  }
                }
              }]
            }
          },
          relationships: {
            list: { data: { type: 'list', id: listId } }
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}