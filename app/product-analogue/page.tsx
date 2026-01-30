'use client';
import Header from '@/components/Header';
import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { useCart } from '@/app/context/CartContext';
import Link from 'next/link';
import CartDrawer from '@/components/CartDrawer';
import { motion, AnimatePresence } from 'framer-motion';

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

// 1. Define the Quick Link Data
const QUICK_LINKS = [
  { 
    title: 'For Her', 
    image: '/assets/images/For Her.png', 
    filterType: 'gender', 
    filterValue: 'For Her' 
  },
  { 
    title: 'For Him', 
    image: '/assets/images/For Him.png', 
    filterType: 'gender', 
    filterValue: 'For Him' 
  },
  { 
    title: 'Charms', 
    image: '/assets/images/Charms.png', 
    filterType: 'category', 
    filterValue: 'Charms & Pendants' 
  },
  { 
    title: 'Bracelets', 
    image: '/assets/images/Bracelets.png', 
    filterType: 'category', 
    filterValue: 'Bracelets' 
  }
];

export default function ShopPage() {
  const { addToCart } = useCart();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sortBy, setBy] = useState<string>('Default Sorting');
  
  // 2. Add State for Dynamic Header
  const [pageTitle, setPageTitle] = useState('All Products');

  const [filters, setFilters] = useState<Filters>({
    price: { min: 0, max: 150 },
    category: [],
    gender: [],
    material: [],
  });

  const [openSections, setOpenSections] = useState({ category: true, gender: true, material: true });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch('/api/shopify/products');
        const data = await res.json();
        if (data && Array.isArray(data)) {
          setAllProducts(data);
        } else {
          setApiError(data.error || "Failed to load products.");
          setAllProducts([]); 
        }
      } catch (error) {
        setApiError("Network error.");
        setAllProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const safeProducts = Array.isArray(allProducts) ? allProducts : [];

  const getCount = (key: keyof Product, value: string) => {
    return safeProducts.filter(p => {
      const val = p[key];
      if (Array.isArray(val)) return val.includes(value);
      return val === value;
    }).length;
  };

  const toggleSection = (key: keyof typeof openSections) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => {
      const list = prev[key] as string[];
      // If manually toggling, we might want to reset the "Page Title" to generic if it gets complex, 
      // but strictly adhering to the prompt, we just toggle the filter.
      return { ...prev, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] };
    });
  };

  // 3. Handle Quick Link Click
  const handleQuickLink = (item: typeof QUICK_LINKS[0]) => {
    setPageTitle(item.title); // Update Header
    
    // Reset other filters and apply the selected one
    setFilters({
      price: { min: 0, max: 150 },
      category: [],
      gender: [],
      material: [],
      [item.filterType]: [item.filterValue]
    });
  };

  const handleAddToCart = (p: Product) => {
    addToCart({ id: p.id, title: p.title, variant: "Default", price: p.price, image: p.image }, 1);
    setIsCartOpen(true);
  };

  const dynamicMaterials = useMemo(() => {
    const counts: Record<string, number> = {};
    safeProducts.forEach(p => {
      const materials = Array.isArray(p.material) ? p.material : [p.material];
      materials.forEach(m => { if (m) counts[m] = (counts[m] || 0) + 1; });
    });
    return Object.entries(counts)
      .sort((a, b) => {
        if (a[0] === 'Uncategorized') return 1;
        if (b[0] === 'Uncategorized') return -1;
        return b[1] - a[1];
      })
      .map(([name]) => name);
  }, [safeProducts]);

  const filteredProducts = safeProducts.filter((p) => {
    if (p.price < filters.price.min || p.price > filters.price.max) return false;
    if (filters.category.length > 0) {
      const title = p.title.toLowerCase();
      const isBraceletItem = title.includes('bracelets') || title.includes('bracelet');
      const isPendantItem = title.includes('pendants') || (!isBraceletItem && !title.includes('bracelet'));
      const matchesSelectedBracelets = filters.category.includes('Bracelets') && isBraceletItem;
      const matchesSelectedPendants = filters.category.includes('Charms & Pendants') && isPendantItem;
      if (!matchesSelectedBracelets && !matchesSelectedPendants) return false;
    }
    if (filters.gender.length) {
      const productGenders = Array.isArray(p.gender) ? p.gender : [p.gender];
      if (!productGenders.some(g => filters.gender.includes(g))) return false;
    }
    if (filters.material.length) {
      const productMaterials = Array.isArray(p.material) ? p.material : [p.material];
      if (!productMaterials.some(m => filters.material.includes(m))) return false;
    }
    return true;
  });

  const sortedProducts = useMemo(() => {
    const items = [...filteredProducts];
    switch (sortBy) {
      case 'Price: Low to High': return items.sort((a, b) => a.price - b.price);
      case 'Price: High to Low': return items.sort((a, b) => b.price - a.price);
      case 'Name: A to Z': return items.sort((a, b) => a.title.localeCompare(b.title));
      case 'Name: Z to A': return items.sort((a, b) => b.title.localeCompare(a.title));
      default: return items;
    }
  }, [filteredProducts, sortBy]);

  if (loading) return (
    <div className="bg-[#F6D8AB] min-h-screen flex items-center justify-center">
      <div className="relative flex items-center justify-center w-48 h-48">
        <motion.div animate={{ scale: [0.8, 1.2, 0.8], opacity: [1, 0, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute w-32 h-32">
          <img src="/assets/images/Logo.svg" alt="Loading" className="w-full h-full object-contain" />
        </motion.div>
      </div>
    </div>
  );

  return (
    <>
      <Header />
      <div className="h-[40px] md:h-[40px] w-full bg-[#F6D8AB]" />
      
      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen">
        <div className="px-5 md:px-12 xl:px-24 2xl:px-32 pb-5">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-16 w-full">
            {QUICK_LINKS.map((link) => (
              <motion.div
                key={link.title}
                onClick={() => handleQuickLink(link)}
                className="relative cursor-pointer group"
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="aspect-[17/15] relative overflow-hidden rounded-md border border-[#280F0B]/10 shadow-sm bg-[#280F0B]">
                    <Image 
                      src={link.image} 
                      alt={link.title}
                      fill
                      className="object-fill transition-all will-change-transform transform-gpu duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-70 group-hover:scale-110 group-hover:opacity-100"
                    />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8 mb-1">
            <div />
            {/* 5. Dynamic Header */}
            <h1 className="font-lora text-[40px] leading-tight">{pageTitle}</h1>
          </div>
        
          <div className="hidden lg:grid grid-cols-[260px_1fr] gap-8 mb-6">
            <h2 className="text-xl font-bold border-b border-[#280F0B33] pb-1 flex items-end tracking-[0px]">Filters</h2>
            <div className="flex justify-between items-end border-b border-[#280F0B33] pb-1">
              <p className="text-sm opacity-70 leading-none">{filteredProducts.length} Products</p>
              <select value={sortBy} onChange={(e) => setBy(e.target.value)} className="bg-transparent border-none font-semibold cursor-pointer outline-none text-sm">
                <option>Default Sorting</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
                <option>Name: Z to A</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <aside className="w-full lg:w-[260px]">
              <div className="lg:hidden flex flex-col mb-6">
                <h1 className="font-lora text-[40px] leading-tight mb-1">{pageTitle}</h1>
                <p className="text-xs opacity-70">Showing {filteredProducts.length} products</p>
              </div>

              {/* ... (Rest of the Sidebar / Mobile Filters remains the same) ... */}
              <div className="flex justify-between items-center lg:hidden border-b border-[#280F0B33] pb-2 mb-4">
                <button onClick={() => setShowMobileFilters(true)} className="flex items-center gap-2 text-[#280F0B] font-semibold">
                  <Image src="/assets/images/filter.svg" alt="" width={14} height={14} />
                  <span>Filters</span>
                </button>
                <select value={sortBy} onChange={(e) => setBy(e.target.value)} className="bg-transparent border-none font-semibold outline-none text-xs">
                  <option>Default Sorting</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                  <option>Name: Z to A</option>
                </select>
              </div>

              <AnimatePresence>
                {(showMobileFilters) && (
                  <div className="fixed inset-0 z-[100] lg:hidden">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowMobileFilters(false)}
                      className="absolute inset-0 bg-black/40"
                    />
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ type: "spring", damping: 25, stiffness: 200 }}
                      className="fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-[#F6D8AB] p-6 shadow-xl overflow-y-auto"
                    >
                      <div className="flex justify-between items-center mb-8">
                        <span className="font-lora text-2xl">Filters</span>
                        <button onClick={() => setShowMobileFilters(false)} className="text-3xl font-light">×</button>
                      </div>
                      <FilterContent filters={filters} setFilters={setFilters} openSections={openSections} toggleSection={toggleSection} dynamicMaterials={dynamicMaterials} toggleFilter={toggleFilter} safeProducts={safeProducts} getCount={getCount} />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

              <div className="hidden lg:block">
                <FilterContent filters={filters} setFilters={setFilters} openSections={openSections} toggleSection={toggleSection} dynamicMaterials={dynamicMaterials} toggleFilter={toggleFilter} safeProducts={safeProducts} getCount={getCount} />
              </div>
            </aside>

            <section className="flex-1 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
                {sortedProducts.map((p, index) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} className="group cursor-pointer">
                    <Link href={`/product/${p.handle}`}>
                      <div className="aspect-[306/316] relative bg-[#F2EFEA] mb-4 overflow-hidden">
                        <Image src={p.image || '/assets/images/necklace-img.png'} alt={p.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    </Link>
                    <h4 className="text-[14px] font-semibold mb-1 truncate">{p.title}</h4>
                    <div className="relative h-8 flex items-center justify-between overflow-hidden">
                      <p className="text-[13px] opacity-70 transition-all duration-300 transform lg:group-hover:translate-y-[-100%] lg:group-hover:opacity-0">${p.price.toFixed(2)} AUD</p>
                      <button onClick={() => handleAddToCart(p)} className="lg:hidden text-[14px] opacity-70 font-medium text-[#7A3E2E]">+ Add to Cart</button>
                      <button onClick={() => handleAddToCart(p)} className="hidden lg:flex absolute top-0 left-0 w-full h-full text-[14px] opacity-70 transform translate-y-[100%] group-hover:translate-y-0 items-center hover:text-black transition-all duration-300">+ Add to Cart</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <style jsx global>{`
          .custom-slider::-webkit-slider-thumb { appearance: none; pointer-events: auto; height: 24px; width: 24px; border-radius: 50%; background: #280F0B; border: 2px solid #F6D8AB; box-shadow: 0 0 0 2px #280F0B; cursor: pointer; position: relative; z-index: 10; }
          .custom-slider::-moz-range-thumb { appearance: none; pointer-events: auto; height: 20px; width: 20px; border-radius: 50%; background: #280F0B; border: 2px solid #F6D8AB; box-shadow: 0 0 0 2px #280F0B; cursor: pointer; }
        `}</style>
      </main>
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

/* HELPER COMPONENT TO AVOID CODE DUPLICATION */
function FilterContent({ filters, setFilters, openSections, toggleSection, dynamicMaterials, toggleFilter, safeProducts, getCount }: any) {
  return (
    <>
      <div className="mt-2 mb-6 w-full">
        <p className="text-[12px] font-bold uppercase mb-3 tracking-wider">Price</p>
        <div className="flex gap-3 mb-5 items-center">
          <div className="relative w-1/2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
            <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-6 pr-2 py-1.5 text-sm outline-none" value={filters.price.min} onChange={(e) => setFilters((p: any) => ({...p, price: {...p.price, min: Number(e.target.value)}}))} />
          </div>
          <span className="opacity-50">—</span>
          <div className="relative w-1/2">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm opacity-60">$</span>
            <input type="number" className="w-full bg-transparent border border-[#280F0B] pl-6 pr-2 py-1.5 text-sm outline-none" value={filters.price.max} onChange={(e) => setFilters((p: any) => ({...p, price: {...p.price, max: Number(e.target.value)}}))} />
          </div>
        </div>
        <div className="relative h-6 w-full flex items-center px-1">
          <div className="absolute h-1.5 bg-[#280F0B33] w-full rounded-full overflow-hidden">
            <div className="absolute h-full bg-[#725C4B]" style={{ left: `${(filters.price.min / 150) * 100}%`, right: `${100 - (filters.price.max / 150) * 100}%` }} />
          </div>
          <input type="range" min="0" max="150" value={filters.price.min} onChange={(e) => setFilters((p: any) => ({...p, price: {...p.price, min: Math.min(Number(e.target.value), filters.price.max)}}))} className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent" />
          <input type="range" min="0" max="150" value={filters.price.max} onChange={(e) => setFilters((p: any) => ({...p, price: {...p.price, max: Math.max(Number(e.target.value), filters.price.min)}}))} className="custom-slider absolute w-full pointer-events-none appearance-none bg-transparent" />
        </div>
      </div>

      {[
        { id: 'category', label: 'Product category', options: ['Bracelets', 'Charms & Pendants'] },
        { id: 'gender', label: 'Gender', options: ['For Her', 'For Him', 'Unisex'] },
        { id: 'material', label: 'Jewellery Material', options: dynamicMaterials },
      ].map((section) => (
        <div key={section.id} className="border-t border-[#280F0B33] pt-3 mt-5">
          <button onClick={() => toggleSection(section.id as any)} className="w-full flex justify-between items-center text-[12px] font-bold uppercase tracking-wider mb-2">
            {section.label}
            <Image src="/assets/images/dropdown.svg" alt="" width={24} height={24} className={`transition-transform duration-300 ${openSections[section.id as keyof typeof openSections] ? 'rotate-180' : ''}`} />
          </button>
          <div className={`overflow-hidden transition-all duration-500 ${openSections[section.id as keyof typeof openSections] ? 'max-h-[1000px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
            <div className="space-y-2 pb-3">
              {section.options.map((opt: string) => (
                <label key={opt} className="flex items-center gap-3 text-sm cursor-pointer hover:opacity-70">
                  <div className="relative flex items-center justify-center w-4 h-4">
                    <input type="checkbox" className="peer appearance-none w-4 h-4 border border-[#280F0B] rounded-sm checked:bg-[#280F0B] transition-all cursor-pointer" checked={filters[section.id as keyof Filters].includes(opt)} onChange={() => toggleFilter(section.id as keyof Filters, opt)} />
                    <svg className="absolute w-3 h-3 pointer-events-none hidden peer-checked:block text-[#F6D8AB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>{opt} ({section.id === 'category' ? safeProducts.filter((p: any) => {
                    const t = p.title.toLowerCase();
                    return opt === 'Bracelets' ? (t.includes('bracelet')) : (t.includes('pendant') || (!t.includes('bracelet')));
                  }).length : getCount(section.id as any, opt)})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}