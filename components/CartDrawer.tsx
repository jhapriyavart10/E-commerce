'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Plus, Minus, ChevronDown, CircleX } from 'lucide-react';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateQuantity, removeFromCart, cartId, getTotalItems } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [couponExpanded, setCouponExpanded] = useState(false);
  const router = useRouter();

  // Calculate subtotal from real context data
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    if (!cartId) return alert("Cart is empty");
    setIsRedirecting(true);
    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        body: JSON.stringify({ cartId })
      });
      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err) {
      console.error("Checkout redirect failed", err);
      setIsRedirecting(false);
    }
  };

  //if (!isOpen) return null;

  const goToCheckout = () => {
    onClose(); // Close the drawer first
    router.push('/checkout'); // Navigate to your local checkout page
  };

  return (
    <div className={`fixed inset-0 z-[100] flex justify-end transition-opacity duration-800 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Cart Sidebar */}
      <section 
        className={`relative flex h-full w-full flex-col bg-[#f6d8ab] shadow-2xl transition-transform duration-300 ease-in-out md:w-[486px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#280f0b]/10 px-6 py-8">
          <div className="flex items-baseline gap-2">
            <h2 className="font-lora text-4xl text-[#280f0b]">Cart</h2>
            <span className="font-manrope text-lg opacity-70">({getTotalItems()} items)</span>
          </div>
          <button onClick={onClose} className="text-[#280f0b] hover:rotate-90 transition-transform">
            <X size={32} strokeWidth={1.5} />
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="font-lora text-xl opacity-60">Your cart is empty</p>
              <Link 
                href="/product-analogue" 
                onClick={onClose} 
                className="mt-4 underline font-bold inline-block"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {cartItems.map((item) => (
                <div key={item.id} className="group flex gap-4">
                  <div className="relative h-28 w-24 flex-shrink-0">
                    <div className="h-full w-full overflow-hidden rounded bg-white/50">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    {/* CROSS REMOVE BUTTON (Top Left) */}
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      //className="absolute -top-2 -left-2 z-10 bg-white rounded-full text-[#280f0b] hover:text-red-600 shadow-sm transition-colors"
                      className="absolute -top-2 -left-2 z-10 bg-white rounded-full text-[#280f0b] hover:text-red-600 shadow-sm transition-all opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
                      title="Remove item"
                    >
                      <CircleX size={22} fill="currentColor" stroke="white" strokeWidth={1.5} />
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col justify-between py-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0"> {/* min-w-0 allows text truncation/wrapping within flex */}
                        <h3 className="font-manrope font-semibold text-[#280f0b] leading-tight break-words">
                          {item.title}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-[#7f3e2f] mt-1 uppercase tracking-wider">{item.variant}</p>
                        )}
                      </div>
                      
                      {/* PRICE FIX: Added whitespace-nowrap and shrink-0 to prevent line breaks */}
                      <p className="font-manrope text-[13px] text-[#280f0b] whitespace-nowrap flex-shrink-0">
                        ${(item.price * item.quantity).toFixed(2)} <span className="text-[13px]">AUD</span>
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between border border-[#280f0b] rounded-md px-3 py-1 w-28 mt-4">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-[#280f0b] hover:opacity-50"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-[#280f0b] hover:opacity-50"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon Section (Dashed Border Style) */}
        <div className="border-t border-dashed border-[#280f0b]/30">
          <button 
            onClick={() => setCouponExpanded(!couponExpanded)}
            className="flex w-full items-center justify-between px-6 py-5 hover:bg-black/5 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative size-5">
                <Image src="/assets/images/coupon.png" alt="Coupon" fill className="object-contain" />
              </div>
              <span className="font-manrope font-medium text-[#280f0b]">Have a coupon code?</span>
            </div>
            <ChevronDown className={`transition-transform ${couponExpanded ? 'rotate-180' : ''}`} size={20} />
          </button>
          {couponExpanded && (
            <div className="px-6 pb-4">
              <input 
                type="text" 
                placeholder="Enter discount code" 
                className="w-full bg-white/50 border border-[#280f0b]/20 p-3 rounded text-sm focus:outline-none focus:border-[#280f0b]"
              />
            </div>
          )}
        </div>

        {/* Summary Footer */}
        <div className="bg-[#280f0b] p-8 text-[#f6d8ab]">
          <div className="flex items-end justify-between mb-2">
            <div className="flex-1 mr-4">
              {/* Reduced label to 18px */}
              <p className="text-[18px] font-bold font-lora">Subtotal</p>
              {/* Reduced disclaimer for better fit on mobile */}
              <p className="text-[11px] md:text-[13px] opacity-60 mt-1 tracking-tight whitespace-nowrap">
                Tax included. Shipping calculated at checkout.
              </p>
            </div>
            {/* Set price to 18px and forced no wrap to stay on one line */}
            <p className="text-[18px] font-bold font-manrope whitespace-nowrap">
              ${subtotal.toFixed(2)} AUD
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <Link 
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center border border-[#f6d8ab]/40 py-4 text-xs font-bold uppercase tracking-[1.5px] hover:bg-white/10 transition-all"
            >
              View Cart
            </Link>
            <button 
              onClick={goToCheckout}
              disabled={isRedirecting || cartItems.length === 0}
              className="bg-[#7f3e2f] flex items-center justify-center py-4 text-xs font-bold uppercase tracking-[1.5px] text-white hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isRedirecting ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}