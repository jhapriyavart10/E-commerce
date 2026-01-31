// app/api/shopify/products/route.ts
import { NextResponse } from 'next/server';
import { getProducts, getProduct } from '@/services/products.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');
  const cursor = searchParams.get('cursor'); // 1. Read cursor

  try {
    if (handle) {
      const product = await getProduct(handle);
      if (!product) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
      return NextResponse.json(product);
    }

    // 2. Fetch with cursor
    const data = await getProducts(cursor || undefined);
    
    // 3. Return object with products AND pageInfo
    return NextResponse.json(data); 

  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}