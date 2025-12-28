'use client';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';

/* ---------------- TYPES ---------------- */
type Product = {
  id: string; 
  title: string;
  handle: string; 
  price: number;
  category: string;
  gender: string;
  material: string;
  image: string;
};

type Filters = {
  price: { min: number; max: number };
  category: string[];
  gender: string[];
  material: string[];
};

const MATERIAL_OPTIONS = [
  'Obsidian', 'Tiger Eye', 'Lapis Lazuli', 'Rose Quartz', 'Clear Quartz', 'Green Aventurine'
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  
  const [filters, setFilters] = useState<Filters>({
    price: { min: 0, max: 150 },
    category: [],
    gender: [],
    material: [],
  });

  const [openSections, setOpenSections] = useState({ category: true, gender: true, material: true });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  // 1. DYNAMIC FETCH WITH ERROR HANDLING
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/shopify/products');
        const data = await res.json();
        
        // Safety Check: Shopify Service layer might return {error: ...} 
        if (data && Array.isArray(data)) {
          setAllProducts(data);
          setQuantities(Object.fromEntries(data.map((p: Product) => [p.id, 1])));
        } else {
          console.error("Backend returned non-array data:", data);
          setApiError(data.error || "Failed to load products from Shopify.");
          setAllProducts([]); 
        }
      } catch (error) {
        console.error("Failed to load products", error);
        setApiError("Network error. Please check your Shopify connection.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // 2. SAFETY WRAPPER FOR FILTERING (Prevents the crash)
  const safeProducts = Array.isArray(allProducts) ? allProducts : [];

  const getCount = (key: keyof Product, value: string) => 
    safeProducts.filter(p => p[key] === value).length;

  const toggleSection = (key: keyof typeof openSections) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[];
      return { ...prev, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, (prev[id] || 1) + delta) }));
  };

  const handleAddToCart = (p: Product) => {
    addToCart({ id: p.id, title: p.title, variant: "Default", price: p.price, image: p.image });
    setNotification(null);
    //setNotification(`${p.title} added to cart!`);
    setTimeout(() => {setNotification(p.title);}, 10);
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredProducts = safeProducts.filter((p) => {
    if (p.price < filters.price.min || p.price > filters.price.max) return false;
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    return true;
  });

  if (loading) return (
    <div className="bg-[#F6D8AB] min-h-screen flex items-center justify-center font-lora text-xl">
      Loading Collection...
    </div>
  );

  if (apiError) return (
    <div className="bg-[#F6D8AB] min-h-screen flex flex-col items-center justify-center p-10 text-center">
      <h2 className="text-2xl font-lora mb-4">Connection Issue</h2>
      <p className="opacity-70 mb-6">{apiError}</p>
      <p className="text-sm italic">Tip: Ensure USE_MOCK_DATA=false is only set when your Shopify .env keys are valid.</p>
    </div>
  );

  return (
    <>
      <Header />
      <div className="h-[80px] md:h-[150px] w-full bg-[#F6D8AB]" />
      <div className="fixed top-5 right-5 z-[9999] pointer-events-none">
        {notification && (
          <div className="w-[calc(100vw-40px)] sm:w-[350px] pointer-events-auto bg-[#280F0B] text-[#F6D8AB] p-4 rounded-md shadow-2xl border border-[#F6D8AB33] relative flex items-start gap-4 animate-slideInRight">
            <div className="bg-[#F6D8AB] text-[#280F0B] rounded-full p-1.5 flex-shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.42-6.446z"/>
              </svg>
            </div>
            <div className="flex-1 pr-6">
              <p className="font-lora font-bold text-sm leading-tight mb-1">Added to Cart</p>
              <p className="text-xs opacity-90 line-clamp-2 leading-relaxed">{notification}</p>
              <div className="mt-3 flex gap-4">
                <Link href="/cart" className="text-[11px] uppercase tracking-wider font-bold underline underline-offset-4 hover:text-white transition-colors">View Cart</Link>
                <button onClick={() => setNotification(null)} className="text-[11px] uppercase tracking-wider font-bold opacity-60 hover:opacity-100">Dismiss</button>
              </div>
            </div>
            <button onClick={() => setNotification(null)} className="absolute top-3 right-3 text-[#F6D8AB] p-1"><svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg></button>
          </div>
        )}
      </div>

      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen">
        <div className="px-5 md:px-12 xl:px-24 2xl:px-32 py-10">

          <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8 mb-1">
            <div />
            <h1 className="font-lora text-[40px] leading-tight">All Products</h1>
          </div>
                
          <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8 mb-6">
            <h2 className="text-xl font-bold border-b border-[#280F0B33] pb-1 flex items-end tracking-[0px]">Filters</h2>
            <div className="flex justify-between items-end border-b border-[#280F0B33] pb-1">
              <p className="text-sm opacity-70 leading-none">{filteredProducts.length} Products</p>
              <select className="bg-transparent border-none font-semibold cursor-pointer outline-none text-sm leading-none">
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <aside className="w-full lg:w-[260px]">
              {/* Filter Sidebar UI (Logic is safe now) */}
              <div className="lg:hidden flex flex-col mb-6">
                <h1 className="font-lora text-[40px] leading-tight mb-1">All Products</h1>
                <p className="text-xs opacity-70">Showing {filteredProducts.length} products</p>
              </div>
              {/* ... REST OF YOUR FILTER UI CODE ... */}
              <div className="flex justify-between items-center lg:hidden border-b border-[#280F0B33] pb-2 mb-4">
                <button 
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className={`flex items-center gap-2 text-[#280F0B] font-semibold tracking-widest transition-all ${showMobileFilters ? 'text-[20px]' : 'text-sm'}`}
                >
                  {!showMobileFilters && <Image src="/assets/images/filter.svg" alt="" width={14} height={14} />}
                  <span>Filters</span>
                </button>
                {showMobileFilters ? (
                  <button onClick={() => setShowMobileFilters(false)} className="text-3xl font-light leading-none">×</button>
                ) : (
                  <select className="bg-transparent border-none font-semibold cursor-pointer outline-none text-xs">
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                  </select>
                )}
              </div>

              {/* FILTER CONTENT */}
              {/* FIXED: Removed space-y-4 and added individual margins for precise control */}
              <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block animate-fadeIn`}>
                <div className="mt-2 mb-6">
                  <p className="text-[12px] font-bold uppercase mb-3 tracking-wider">Price</p>
                  <div className="flex gap-3 mb-5">
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
                      <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-6 pr-2 py-1.5 text-sm outline-none" value={filters.price.min} onChange={(e) => setFilters(p => ({...p, price: {...p.price, min: Number(e.target.value)}}))} />
                    </div>
                    <span className="text-[#000000]">—</span>
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
                      <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-6 pr-2 py-1.5 text-sm outline-none" value={filters.price.max} onChange={(e) => setFilters(p => ({...p, price: {...p.price, max: Number(e.target.value)}}))} />
                    </div>
                  </div>
                  <div className="relative h-1.5 bg-[#280F0B33] w-full rounded-full">
                    <div className="absolute h-full bg-[#725C4B]" style={{ left: `${(filters.price.min / 150) * 100}%`, right: `${100 - (filters.price.max / 150) * 100}%` }} />
                    <input type="range" min="0" max="150" value={filters.price.min} onChange={(e) => setFilters(p => ({...p, price: {...p.price, min: Math.min(Number(e.target.value), p.price.max)}}))} className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent h-1.5" />
                    <input type="range" min="0" max="150" value={filters.price.max} onChange={(e) => setFilters(p => ({...p, price: {...p.price, max: Math.max(Number(e.target.value), p.price.min)}}))} className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent h-1.5" />
                  </div>
                </div>

                {[
                  { id: 'category' as const, label: 'Product category', options: ['Bracelets', 'Charms & Pendants'] },
                  { id: 'gender' as const, label: 'Gender', options: ['For her', 'For him', 'Unisex'] },
                  { id: 'material' as const, label: 'Jewellery Material', options: MATERIAL_OPTIONS },
                ].map((section) => (
                  <div key={section.id} className="border-t border-[#280F0B33] pt-3 mt-5">
                    <button onClick={() => toggleSection(section.id)} className="w-full flex justify-between items-center text-[12px] font-bold uppercase tracking-wider mb-2">
                      {section.label}
                      <Image src="/assets/images/dropdown.svg" alt="" width={10} height={10} className={openSections[section.id] ? 'rotate-180' : ''} />
                    </button>
                    {openSections[section.id] && (
                      <div className="space-y-2 pb-1">
                        {section.options.map(opt => (
                          <label key={opt} className="flex items-center gap-3 text-sm cursor-pointer hover:opacity-70 transition-opacity">
                            <input type="checkbox" className="accent-[#280F0B] w-4 h-4" checked={filters[section.id].includes(opt)} onChange={() => toggleFilter(section.id, opt)} />
                            <span>{opt} ({getCount(section.id, opt)})</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            <section className="flex-1 w-full lg:pt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="group cursor-pointer">
                    <Link href={`/product/${p.handle}`}>
                      <div className="aspect-[306/316] relative bg-[#F2EFEA] mb-4 overflow-hidden">
                        <Image src={p.image || '/assets/images/necklace-img.png'} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </Link>
                    <Link href={`/product/${p.handle}`}>
                      <h4 className="text-[14px] font-semibold mb-1 group-hover:underline truncate">{p.title}</h4>
                    </Link>
                    <div className="relative h-8 flex items-center">
                      <p className="text-[13px] opacity-70 font-medium absolute inset-0 flex items-center transition-opacity duration-300 group-hover:opacity-0">
                        ${p.price.toFixed(2)} AUD
                      </p>
                      <div className="flex items-center gap-3 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#F6D8AB]">
                        <div className="flex items-center border border-[#280F0B66] h-8">
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, -1); }} className="w-7 h-full flex items-center justify-center hover:bg-[#280F0B] hover:text-[#F6D8AB] transition-colors">-</button>
                          <span className="w-8 h-full flex items-center justify-center border-x border-[#280F0B66] text-sm font-bold">{quantities[p.id] || 1}</span>
                          <button onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, 1); }} className="w-7 h-full flex items-center justify-center hover:bg-[#280F0B] hover:text-[#F6D8AB] transition-colors">+</button>
                        </div>
                        <button 
                          onClick={() => addToCart({ id: p.id, title: p.title, variant: "Default", price: p.price, image: p.image })}
                          className="text-[10px] uppercase font-bold underline whitespace-nowrap"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <style jsx global>{`
          .custom-slider::-webkit-slider-thumb {
            appearance: none; pointer-events: auto; height: 24px; width: 24px; border-radius: 50%;
            background: #280F0B; border: 2px solid #F6D8AB; box-shadow: 0 0 0 2px #280F0B; cursor: pointer; position: relative; z-index: 10;
          }
          .custom-slider::-moz-range-thumb {
            appearance: none; pointer-events: auto; height: 20px; width: 20px; border-radius: 50%;
            background: #280F0B; border: 2px solid #F6D8AB; box-shadow: 0 0 0 2px #280F0B; cursor: pointer;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-slideInRight {
            animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}</style>
      </main>
    </>
  );
}