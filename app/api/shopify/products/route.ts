import { NextResponse } from 'next/server';
import { getProducts, getProduct } from '@/services/products.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  try {
    if (handle) {
      const product = await getProduct(handle);
      if (!product) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
      return NextResponse.json(product);
    }

    const products = await getProducts();
    // Verification: ensure we always return an array to the frontend
    return NextResponse.json(Array.isArray(products) ? products : []);
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}