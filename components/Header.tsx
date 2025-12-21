'use client';

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/app/context/CartContext'

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <>
      {/* Top Banner - 1440x45 */}
      <div className="bg-[#7F3E2F] text-white text-center w-full h-[45px] flex items-center justify-center relative">
        <span className="text-sm">Free Standard Domestic Shipping above $135</span>
        <button className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300">
          ✕
        </button>
      </div>

      {/* Main Header - Responsive navigation: mobile 390x120, desktop 1440x120 */}
      <header className="bg-[#280F0B] text-white w-full h-[120px]">
        <div className="w-full max-w-[1440px] mx-auto h-full relative">
          {/* Mobile & Desktop Layout */}
          <div className="h-full px-4 sm:px-6 lg:px-0 lg:block">
            
            {/* Mobile Layout - Single Row */}
            <div className="flex items-center justify-between h-full lg:hidden">
              {/* Mobile Logo - Left Side */}
              <Link href="/" className="flex items-center">
                <Image 
                  src="/assets/images/Logo.png" 
                  alt="Raw Earth Crystals" 
                  width={140} 
                  height={54}
                  className="object-contain"
                  priority
                />
              </Link>
              
              {/* Mobile Icons - Right Side */}
              <div className="flex items-center gap-4">
                <Link href="/cart" className="hover:text-gray-300 transition-colors relative" aria-label="Cart">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#7F3E2F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
                <button className="hover:text-gray-300 transition-colors" aria-label="Menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Desktop Layout - Absolute Positioning */}
            <div className="hidden lg:block">
              {/* Left Navigation - gap: 50px */}
              <nav className="absolute left-[72px] top-[50px] flex items-center gap-[50px]">
                <Link href="/shop" className="hover:text-gray-300 transition-colors text-base">
                  Shop
                </Link>
                <Link href="/plants" className="hover:text-gray-300 transition-colors text-base">
                  Plants
                </Link>
                <Link href="/raw-earth-logo" className="hover:text-gray-300 transition-colors text-base">
                  Raw Earth Logo
                </Link>
                <Link href="/about" className="hover:text-gray-300 transition-colors text-base">
                  About
                </Link>
              </nav>

              {/* Logo - 186x72 at top: 24px, left: 627px */}
              <div className="absolute left-[627px] top-[24px]">
                <Link href="/" className="flex items-center">
                  <Image 
                    src="/assets/images/Logo.png" 
                    alt="Raw Earth Crystals" 
                    width={186} 
                    height={72}
                    className="object-contain"
                    priority
                  />
                </Link>
              </div>

              {/* Icons - gap: 24px at top: 48px */}
              <div className="absolute right-[48px] top-[48px] flex items-center gap-[24px]">
                <button className="hover:text-gray-300 transition-colors" aria-label="Search">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <button className="hover:text-gray-300 transition-colors" aria-label="Account">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <Link href="/cart" className="hover:text-gray-300 transition-colors relative" aria-label="Cart">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#7F3E2F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
