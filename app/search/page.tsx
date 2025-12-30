'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useMemo, Suspense } from 'react'; // Added Suspense
import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

type Product = {
  id: string; title: string; handle: string; price: number;
  category: string; gender: string; material: string; image: string;
};

// 1. Move search logic to a separate component
function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/shopify/products');
        const data = await res.json();
        if (data && Array.isArray(data)) setAllProducts(data);
      } catch (error) {
        console.error("Search fetch failed", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const searchResults = useMemo(() => {
    if (!query) return allProducts;
    return allProducts.filter((p) => {
      return (
        p.title.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) || 
        p.material.toLowerCase().includes(query)
      );
    });
  }, [allProducts, query]);

  if (loading) return <div className="py-20 text-center font-lora">Searching...</div>;

  return (
    <div className="max-w-[1440px] mx-auto">
      <h1 className="font-lora text-4xl mb-2">Search Results</h1>
      <p className="opacity-70 mb-12">
        {searchResults.length} results for &quot;{query}&quot;
      </p>

      {searchResults.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl opacity-50">No products found matching your search.</p>
          <Link href="/product-catalogue" className="underline font-bold mt-4 inline-block">Browse all products</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {searchResults.map((p) => (
            <div key={p.id} className="group cursor-pointer">
              <Link href={`/product/${p.handle}`}>
                <div className="aspect-[4/5] relative bg-[#F2EFEA] mb-4 overflow-hidden">
                  <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
              </Link>
              <h4 className="text-sm font-semibold mb-1 uppercase tracking-tight">{p.title}</h4>
              <div className="flex justify-between items-center">
                <p className="text-sm opacity-70">${p.price.toFixed(2)} AUD</p>
                <button 
                  onClick={() => addToCart({ id: p.id, title: p.title, price: p.price, image: p.image, variant: "Default" })}
                  className="text-xs font-bold uppercase underline hover:text-[#7F3E2F]"
                >
                  + Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// 2. Main Page component providing the Suspense boundary
export default function SearchResultsPage() {
  return (
    <>
      <Header />
      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen pt-40 px-6 lg:px-24">
        <Suspense fallback={<div className="text-center py-20 font-lora">Loading search parameters...</div>}>
          <SearchContent />
        </Suspense>
      </main>
    </>
  );
}