'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Desktop_pro from './desktop_pro';

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch(`/api/shopify/products?handle=${id}`);
      const data = await res.json();
      setProduct(data);
    }
    if (id) load();
  }, [id]);

  if (!product) return <div className="p-20 text-center">Loading...</div>;

  // @ts-ignore: Desktop_pro props are untyped here; passing product prop intentionally
  return <Desktop_pro product={product} />;

}