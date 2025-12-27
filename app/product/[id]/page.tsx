'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Desktop_pro from './desktop_pro';
import Header from '@/components/Header';

export default function ProductPage() {
  const params = useParams();
  const handle = params.id as string; // The URL contains the shopify handle
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setLoading(true);
        // We call our internal API with the handle from the URL
        const res = await fetch(`/api/shopify/products?handle=${handle}`);
        
        if (!res.ok) throw new Error('Product not found');
        
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error("Error loading product:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (handle) {
      fetchProductDetails();
    }
  }, [handle]);

  if (loading) {
    return (
      <div className="bg-[#F6D8AB] min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[60vh] font-lora text-2xl text-[#280F0B]">
          Loading Product Details...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-[#F6D8AB] min-h-screen">
        <Header />
        <div className="flex flex-col items-center justify-center h-[60vh] text-[#280F0B]">
          <h2 className="font-lora text-3xl mb-4">Product Not Found</h2>
          <p className="opacity-70">We couldn't find the crystal you're looking for.</p>
        </div>
      </div>
    );
  }

  // Pass the real Shopify data into your existing UI component
  return <Desktop_pro product={product} />;
}