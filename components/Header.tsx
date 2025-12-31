'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/app/context/CartContext'
import CartDrawer from '@/components/CartDrawer'
import { Menu, X, Search, ShoppingBag, User } from 'lucide-react' // Using Lucide for cleaner icons

const BANNER_MESSAGES = [
  "Free Standard Domestic Shipping above $135",
  "New Collection: Rose Quartz Bracelets Now Available",
  "Join our community for 10% off your first order"
];

export default function Header() {
  const router = useRouter();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const [showBanner, setShowBanner] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile Menu State

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (!showBanner || paused) return;
    const interval = setInterval(() => {
      setAnimate(true); 
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % BANNER_MESSAGES.length);
        setNextIndex((prev) => (prev + 2) % BANNER_MESSAGES.length);
        setAnimate(false); 
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [showBanner, paused]);

  return (
    <>
      {/* Top Banner */}
      {showBanner && (
        <div className="bg-[#7F3E2F] text-white text-center w-full h-[45px] flex items-center justify-center relative overflow-hidden z-[60]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          >  
          <span className={`text-sm whitespace-nowrap leading-[45px] transition-transform duration-500 ease-in-out ${animate ? '-translate-y-[45px]' : 'translate-y-0'}`}>
            {BANNER_MESSAGES[messageIndex]}
          </span>
          <span className={`absolute text-sm whitespace-nowrap leading-[45px] transition-transform duration-500 ease-in-out ${animate ? 'translate-y-0' : 'translate-y-[45px]'}`}>
            {BANNER_MESSAGES[nextIndex]}
          </span>
          <button onClick={() => setShowBanner(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">✕</button>
        </div>
      )}

      {/* Main Header */}
      <header className="bg-[#280F0B] text-white w-full h-[80px] lg:h-[120px] relative z-50">
        <div className="w-full max-w-[1440px] mx-auto h-full px-4 lg:px-[72px] flex items-center justify-between relative">
          
          {/* 1. Mobile Hamburger (Left) - Only visible on Mobile */}
          <button 
            className="lg:hidden p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* 2. Desktop Nav (Left) - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center gap-[40px]">
            <Link href="/product-analogue" className="hover:text-gray-300 transition-colors text-base font-manrope">Shop</Link>
            <Link href="/plans" className="hover:text-gray-300 transition-colors text-base font-manrope">Plans</Link>
            <Link href="https://azure-takeaways-956863.framer.app/blogs" className="text-base transition-colors hover:text-gray-300 font-manrope">
              Raw Earth Dojo
            </Link>
            <Link href="/about" className="hover:text-gray-300 transition-colors text-base font-manrope">About</Link>
          </nav>

          {/* 3. Logo (Center) - Responsive Width */}
          <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2">
            <Link href="/">
              <Image 
                src="/assets/images/Logo.png" 
                alt="Raw Earth Crystals" 
                width={186} 
                height={72} 
                className="object-contain w-[120px] lg:w-[186px]" 
                priority 
              />
            </Link>
          </div>

          {/* 4. Action Icons (Right) */}
          <div className="flex items-center gap-2 lg:gap-6">
            <button 
              onClick={() => setIsSearchOpen(true)} 
              className="p-2 hover:text-gray-300 transition-colors"
            >
              <Search size={24} />
            </button>

            {/* Profile Icon - Hidden on Mobile (moved to menu) */}
            <Link href="/profile" className="hidden lg:block p-2 hover:text-gray-300 transition-colors">
              <User size={24} />
            </Link>

            <button 
              onClick={() => setIsCartOpen(true)} 
              className="p-2 hover:text-gray-300 transition-colors relative"
            >
              <ShoppingBag size={24} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#7F3E2F] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* --- Overlay Search Bar --- */}
          {isSearchOpen && (
            <div className="absolute inset-0 bg-[#280F0B] z-[70] flex items-center px-4 lg:px-[72px]">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-4">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search products..."
                  className="bg-transparent border-b border-white/30 w-full py-2 outline-none text-lg lg:text-xl font-manrope placeholder:text-white/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="uppercase font-bold text-xs lg:text-sm tracking-widest hover:text-[#f6d8ab]">Search</button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="text-white/60 hover:text-white text-xs">CLOSE</button>
              </form>
            </div>
          )}
        </div>

        {/* --- Mobile Sidebar Menu --- */}
        <div className={`fixed inset-0 bg-black/50 z-[100] transition-opacity duration-300 lg:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsMenuOpen(false)}>
          <div 
            className={`absolute top-0 left-0 w-[80%] h-full bg-[#280F0B] p-6 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-xl font-lora font-bold">Menu</span>
              <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            
            <nav className="flex flex-col gap-6 text-lg font-manrope">
              <Link href="/product-analogue" onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 pb-2">Go to Shop</Link>
              <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 pb-2">My Profile</Link>
              <Link href="/plans" onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 pb-2">Plans</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 pb-2">About Us</Link>
              <Link href="https://azure-takeaways-956863.framer.app/blogs" onClick={() => setIsMenuOpen(false)} className="border-b border-white/10 pb-2">Raw Earth Dojo</Link>
            </nav>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}