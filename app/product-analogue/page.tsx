'use client';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState } from 'react';

/* ---------------- TYPES ---------------- */
type Product = {
  id: number;
  title: string;
  price: number;
  category: 'Bracelets' | 'Charms & Pendants';
  gender: 'For her' | 'For him' | 'Unisex';
  material: string;
  image: string;
};

type Filters = {
  price: { min: number; max: number };
  category: string[];
  gender: string[];
  material: string[];
};

/* ---------------- CONSTANTS ---------------- */
const MATERIAL_OPTIONS = [
  'Obsidian', 'Tiger Eye', 'Lapis Lazuli', 'Rose Quartz', 'Clear Quartz', 'Green Aventurine'
];

const PRODUCTS: Product[] = Array.from({ length: 24 }).map((_, i) => ({
  id: i + 1,
  title: 'Angel Crystal Pendants',
  price: 35,
  category: i % 2 === 0 ? 'Bracelets' : 'Charms & Pendants',
  gender: i % 3 === 0 ? 'For her' : i % 3 === 1 ? 'For him' : 'Unisex',
  material: MATERIAL_OPTIONS[i % 6],
  image: '/assets/images/necklace-img.png',
}));

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>({
    price: { min: 0, max: 150 },
    category: [],
    gender: [],
    material: [],
  });

  const [openSections, setOpenSections] = useState({ category: true, gender: true, material: true });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    Object.fromEntries(PRODUCTS.map(p => [p.id, 1]))
  );

  const getCount = (key: keyof Product, value: string) => PRODUCTS.filter(p => p[key] === value).length;
  const toggleSection = (key: keyof typeof openSections) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[];
      return { ...prev, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(1, prev[id] + delta) }));
  };

  const filteredProducts = PRODUCTS.filter((p) => {
    if (p.price < filters.price.min || p.price > filters.price.max) return false;
    if (filters.category.length && !filters.category.includes(p.category)) return false;
    if (filters.gender.length && !filters.gender.includes(p.gender)) return false;
    if (filters.material.length && !filters.material.includes(p.material)) return false;
    return true;
  });

  return (
    <>
      <Header />
      <div className="h-[80px] md:h-[150px] w-full bg-[#F6D8AB]" />

      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen">
        <div className="px-5 md:px-12 xl:px-24 2xl:px-32 py-10">
          
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* SIDEBAR FILTERS */}
            <aside className="w-full lg:w-[260px] space-y-8">
              {/* MOBILE FILTER TOGGLE (Now at the top for mobile) */}
              <button 
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-2 mb-4 text-[#280F0B] font-semibold tracking-widest text-sm hover:opacity-70 transition-opacity"
              >
                {showMobileFilters ? 'Hide' : 'Filters'}
                <Image 
                  src="/assets/images/dropdown.svg" 
                  alt="" 
                  width={10} 
                  height={10} 
                  className={showMobileFilters ? 'rotate-180' : ''} 
                />
              </button>

              <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block animate-fadeIn space-y-8`}>
                <h2 className="text-xl font-bold tracking-tight border-b border-[#280F0B33] pb-2 leading-none h-[40px] hidden lg:flex items-center">
                  Filters
                </h2>

                {/* PRICE SECTION */}
                <div className="pt-2">
                  <p className="text-sm font-semibold uppercase mb-4">Price</p>
                  <div className="flex gap-3 mb-8">
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
                      <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-7 pr-2 py-2 text-sm outline-none" value={filters.price.min} onChange={(e) => setFilters(p => ({...p, price: {...p.price, min: Number(e.target.value)}}))} />
                    </div>
                    <div className="relative w-1/2">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
                      <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-7 pr-2 py-2 text-sm outline-none" value={filters.price.max} onChange={(e) => setFilters(p => ({...p, price: {...p.price, max: Number(e.target.value)}}))} />
                    </div>
                  </div>
                  
                  <div className="relative h-1.5 bg-[#280F0B33] w-full rounded-full mb-10">
                    {/* Progress Bar (The dark middle part) */}
                    <div 
                      className="absolute h-full bg-[#725C4B]" 
                      style={{ 
                        left: `${(filters.price.min / 150) * 100}%`, 
                        right: `${100 - (filters.price.max / 150) * 100}%` 
                      }} 
                    />
                    
                    {/* Thumb 1 */}
                    <input 
                      type="range" 
                      min="0" 
                      max="150" 
                      value={filters.price.min} 
                      onChange={(e) => setFilters(p => ({...p, price: {...p.price, min: Math.min(Number(e.target.value), p.price.max)}}))} 
                      className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent h-1.5" 
                    />
                    
                    {/* Thumb 2 */}
                    <input 
                      type="range" 
                      min="0" 
                      max="150" 
                      value={filters.price.max} 
                      onChange={(e) => setFilters(p => ({...p, price: {...p.price, max: Math.max(Number(e.target.value), p.price.min)}}))} 
                      className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent h-1.5" 
                    />
                  </div>

                  <style jsx>{`
                    .custom-slider::-webkit-slider-thumb {
                      appearance: none;
                      pointer-events: auto;
                      height: 24px;
                      width: 24px;
                      border-radius: 50%;
                      background: #280F0B; /* Inner Circle */
                      border: 2px solid #F6D8AB; /* Spacer */
                      box-shadow: 0 0 0 2px #280F0B; /* Outer Ring */
                      cursor: pointer;
                      position: relative;
                      z-index: 10;
                    }
                    .custom-slider::-moz-range-thumb {
                      appearance: none;
                      pointer-events: auto;
                      height: 20px;
                      width: 20px;
                      border-radius: 50%;
                      background: #280F0B;
                      border: 2px solid #F6D8AB;
                      box-shadow: 0 0 0 2px #280F0B;
                      cursor: pointer;
                    }
                  `}</style>
                </div>

                {/* CHECKBOX SECTIONS */}
                {[
                  { id: 'category' as const, label: 'Product category', key: 'category' as const, options: ['Bracelets', 'Charms & Pendants'] },
                  { id: 'gender' as const, label: 'Gender', key: 'gender' as const, options: ['For her', 'For him', 'Unisex'] },
                  { id: 'material' as const, label: 'Jewellery Material', key: 'material' as const, options: MATERIAL_OPTIONS },
                ].map((section) => (
                  <div key={section.id} className="border-t border-[#280F0B33] pt-6">
                    <button onClick={() => toggleSection(section.id)} className="w-full flex justify-between items-center text-lg font-semibold mb-4">
                      {section.label}
                      <Image src="/assets/images/dropdown.svg" alt="" width={12} height={12} className={openSections[section.id] ? 'rotate-180' : ''} />
                    </button>
                    {openSections[section.id] && (
                      <div className="space-y-3">
                        {section.options.map(opt => (
                          <label key={opt} className="flex items-center gap-3 text-sm cursor-pointer hover:opacity-70 transition-opacity">
                            <input type="checkbox" className="accent-[#280F0B] w-4 h-4" checked={filters[section.id].includes(opt)} onChange={() => toggleFilter(section.id, opt)} />
                            <span>{opt} ({getCount(section.key, opt)})</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </aside>

            {/* PRODUCT GRID */}
            <section className="flex-1 w-full">
              <div className="flex justify-between items-center mb-3 pt-9">
                <p className="text-xs md:text-sm opacity-70">Showing {filteredProducts.length} products</p>
                <div className="flex items-center gap-2 text-sm">
                  <select className="bg-transparent border-none font-semibold cursor-pointer outline-none text-xs md:text-sm">
                    <option>Default Sorting</option>
                    <option>Price: Low to High</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                {filteredProducts.map((p) => (
                  <div key={p.id} className="group cursor-pointer">
                    <div className="aspect-[306/316] relative bg-[#F2EFEA] mb-4 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <h4 className="text-[13px] md:text-[15px] font-semibold mb-1 group-hover:underline truncate">{p.title}</h4>
                    
                    <div className="relative h-8 flex items-center">
                      <p className="text-[12px] md:text-sm opacity-70 font-medium absolute inset-0 flex items-center transition-opacity duration-300 group-hover:opacity-0">
                        ${p.price}.00 AUD
                      </p>
                      
                      <div className="flex items-center gap-3 absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[#F6D8AB]">
                        <div className="flex items-center border border-[#280F0B66] h-7 md:h-8">
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, -1); }} 
                            className="w-7 h-full flex items-center justify-center hover:bg-[#280F0B] hover:text-[#F6D8AB] transition-colors"
                          >-</button>
                          <span className="w-8 h-full flex items-center justify-center border-x border-[#280F0B66] text-[12px] md:text-sm font-bold">
                            {quantities[p.id]}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); updateQuantity(p.id, 1); }} 
                            className="w-7 h-full flex items-center justify-center hover:bg-[#280F0B] hover:text-[#F6D8AB] transition-colors"
                          >+</button>
                        </div>
                        
                        <button className="text-[9px] md:text-[10px] uppercase font-bold underline whitespace-nowrap">
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
      </main>
    </>
  );
}