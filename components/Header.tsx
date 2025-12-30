'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation' // Import router for search navigation
import { useCart } from '@/app/context/CartContext'
import CartDrawer from '@/components/CartDrawer'

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

  // --- Search Functionality States ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Redirect to your search results page with the query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Banner Text Carousel Logic
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
        <div className="bg-[#7F3E2F] text-white text-center w-full h-[45px] flex items-center justify-center relative overflow-hidden"
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
      <header className="bg-[#280F0B] text-white w-full h-[120px] relative z-40">
        <div className="w-full max-w-[1440px] mx-auto h-full relative">
          
          {/* Overlay Search Bar (Appears when isSearchOpen is true) */}
          {isSearchOpen && (
            <div className="absolute inset-0 bg-[#280F0B] z-50 flex items-center px-6 lg:px-[72px]">
              <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-4">
                <input 
                  autoFocus
                  type="text" 
                  placeholder="Search for products (e.g. Rose Quartz, Pendants)..."
                  className="bg-transparent border-b border-white/30 w-full py-2 outline-none text-xl font-manrope placeholder:text-white/40"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="uppercase font-bold text-sm tracking-widest hover:text-[#f6d8ab]">Search</button>
                <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-4 text-white/60 hover:text-white text-sm">CLOSE</button>
              </form>
            </div>
          )}

          <div className="h-full px-4 sm:px-6 lg:px-0 flex items-center justify-between">
            
            {/* Desktop Nav (Left) */}
            <nav className="hidden lg:flex items-center gap-[50px] absolute left-[72px] top-[50px]">
              <Link href="/product-analogue" className="hover:text-gray-300 transition-colors text-base">Shop</Link>
              <Link href="/plans" className="hover:text-gray-300 transition-colors text-base">Plans</Link>
              <Link href="https://azure-takeaways-956863.framer.app/blogs" className="flex items-center text-base transition-colors hover:text-gray-300">
                Raw Earth Dojo
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors text-base">About</Link>
            </nav>

            {/* Logo (Center) */}
            <div className="lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:top-[24px]">
              <Link href="/" className="flex items-center">
                <Image src="/assets/images/Logo.png" alt="Raw Earth Crystals" width={186} height={72} className="object-contain w-[140px] lg:w-[186px]" priority />
              </Link>
            </div>

            {/* Icons (Right) */}
            <div className="flex items-center gap-[16px] lg:gap-[24px] lg:absolute lg:right-[48px] lg:top-[48px]">
              
              {/* Search Trigger */}
              <button 
                onClick={() => setIsSearchOpen(true)} 
                className="hover:text-gray-300 transition-colors" 
                aria-label="Search"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <Link href="/profile" className="hover:text-gray-300 transition-colors" aria-label="Account">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>

              <button onClick={() => setIsCartOpen(true)} className="hover:text-gray-300 transition-colors relative" aria-label="Cart">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#7F3E2F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}