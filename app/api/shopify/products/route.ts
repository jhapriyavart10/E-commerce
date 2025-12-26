import { NextResponse } from 'next/server';
import { getProduct, getProducts } from '@/services/products.service';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = searchParams.get('handle');

  try {
    if (handle) {
      const product = await getProduct(handle);
      return NextResponse.json(product);
    }
    const products = await getProducts();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}