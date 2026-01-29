'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const svgPathsDesktop = {
  p1553ba00: "M8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V8V7.25ZM25.5303 8.53033C25.8232 8.23744 25.8232 7.76256 25.5303 7.46967L20.7574 2.6967C20.4645 2.40381 19.9896 2.40381 19.6967 2.6967C19.4038 2.98959 19.4038 3.46447 19.6967 3.75736L23.9393 8L19.6967 12.2426C19.4038 12.5355 19.4038 13.0104 19.6967 13.3033C19.9896 13.5962 20.4645 13.5962 20.7574 13.3033L25.5303 8.53033ZM8 8V8.75H25V8V7.25H8V8Z",
  pdaf5300: "M0.75 4.77297C0.335786 4.77297 0 5.10876 0 5.52297C0 5.93718 0.335786 6.27297 0.75 6.27297V5.52297V4.77297ZM17.2803 6.0533C17.5732 5.76041 17.5732 5.28553 17.2803 4.99264L12.5074 0.21967C12.2145 -0.0732234 11.7396 -0.0732234 11.4467 0.21967C11.1538 0.512563 11.1538 0.987437 11.4467 1.28033L15.6893 5.52297L11.4467 9.76561C11.1538 10.0585 11.1538 10.5334 11.4467 10.8263C11.7396 11.1192 12.2145 11.1192 12.5074 10.8263L17.2803 6.0533ZM0.75 5.52297V6.27297H16.75V5.52297V4.77297H0.75V5.52297Z",
};

export default function CartPage() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems,
    applyCoupon, 
    removeCoupon, 
    appliedCoupon, 
    discountAmount,
    // New Context Values
    shippingMethod,
    setShippingMethod,
    shippingCost,
    subtotal,
    finalTotal,
    freeShippingThreshold
  } = useCart();

  const [couponExpanded, setCouponExpanded] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
  
  // Shipping Dropdown State
  const [shippingDropdownOpen, setShippingDropdownOpen] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplying(true);
    setCouponMessage({ text: '', type: '' });

    const result = await applyCoupon(couponCode);
    setCouponMessage({ 
      text: result.message, 
      type: result.success ? 'success' : 'error' 
    });
    
    if (result.success) setCouponCode('');
    setIsApplying(false);
  };

  // Progress Bar Logic
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (cartItems.length === 0) {
    return (
      <div className="bg-[#f6d8ab] min-h-screen w-full font-manrope">
        <Header />
        <div className="flex flex-col items-center justify-center py-40">
          <h2 className="font-lora text-4xl mb-6">Your cart is empty</h2>
          <Link href="/product-analogue" className="underline font-bold">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6d8ab] min-h-screen w-full font-manrope">
      <Header />
      
      <div className="mx-auto max-w-[1440px] px-6 py-6 md:px-12 lg:px-[72px] lg:py-[50px]">
        
        {/* Progress Indicator */}
        <div className="hidden md:flex items-center gap-4 mb-12">
          <div className="flex gap-3 items-center">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">1</div>
            <p className="text-[#280f0b] text-base">Shopping Cart</p>
          </div>
          <div className="w-[33px] h-[16px] opacity-40">
            <svg className="w-full h-full" fill="none" viewBox="0 0 33 16">
              <path d={svgPathsDesktop.p1553ba00} fill="black" />
            </svg>
          </div>
          <Link href="/checkout" className="flex gap-3 items-center opacity-40 hover:opacity-100 transition-opacity">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">2</div>
            <p className="text-[#280f0b] text-base font-medium">Checkout</p>
          </Link>
          <div className="w-[33px] h-[16px] opacity-40">
            <svg className="w-full h-full" fill="none" viewBox="0 0 33 16">
              <path d={svgPathsDesktop.p1553ba00} fill="black" />
            </svg>
          </div>
          <div className="flex gap-3 items-center opacity-40">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">3</div>
            <p className="text-[#280f0b] text-base">Order Complete</p>
          </div>
        </div>
        
        {/* Page Title */}
        <div className="mb-8 flex items-baseline gap-2">
          <h1 className="font-lora text-[40px] lg:text-[72px] text-[#280f0b] leading-none">Cart</h1>
          <p className="font-lora text-base lg:text-xl text-[#280f0b] opacity-80">({getTotalItems()} items)</p>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_526px] gap-10">
          
          {/* Left: Items Section */}
          <div className="flex flex-col gap-6">
            <div className="hidden lg:grid grid-cols-[1fr_120px_100px] border-b border-[#280f0b]/40 pb-6 mb-4">
              <p className="text-[12px] font-bold tracking-[1.2px] uppercase">Product</p>
              <p className="text-[12px] font-bold tracking-[1.2px] uppercase text-center">Quantity</p>
              <p className="text-[12px] font-bold tracking-[1.2px] uppercase text-right">Subtotal</p>
            </div>
            
            {cartItems.map((item) => (
              <div key={item.id} className="flex flex-col lg:grid lg:grid-cols-[1fr_120px_100px] lg:items-center gap-6 lg:gap-0">
                <div className="flex gap-4">
                  <div className="relative size-[95px] lg:size-[110px] shrink-0">
                    <Image alt={item.title} src={item.image} fill className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <p className="text-[#280f0b] text-base font-medium leading-none">{item.title}</p>
                    <p className="text-[#7f3e2f] text-sm font-medium leading-none">{item.variant}</p>
                    
                    <div className="flex flex-col gap-3 lg:hidden mt-1">
                      <p className="text-[#280f0b] text-sm font-semibold">${item.price.toFixed(2)} AUD</p>
                      
                      <div className="flex items-center justify-between border border-[#280f0b] rounded-[6px] px-3 py-1.5 gap-6 w-[110px]">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={`text-[20px] font-medium leading-none ${item.quantity <= 1 ? 'opacity-30' : ''}`}>-</button>
                        <span className="text-base font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[20px] font-medium leading-none">+</button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-[#474747] text-[13px] font-semibold underline text-left">Delete item</button>
                    </div>

                    <p className="hidden lg:block text-[#280f0b] text-sm font-semibold">${item.price.toFixed(2)} AUD</p>
                    <button onClick={() => removeFromCart(item.id)} className="hidden lg:block text-[#474747] text-[13px] font-semibold underline text-left mt-2">Delete item</button>
                  </div>
                </div>

                <div className="hidden lg:flex lg:justify-center items-center">
                  <div className="flex items-center justify-between border border-[#280f0b] rounded-[6px] px-3 py-1.5 gap-6 w-[110px]">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className={`text-[20px] font-medium leading-none ${item.quantity <= 1 ? 'opacity-30' : ''}`}>-</button>
                    <span className="text-base font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-[20px] font-medium leading-none">+</button>
                  </div>
                </div>

                <p className="hidden lg:block text-right text-[13px] font-semibold text-black">
                  ${(item.price * item.quantity).toFixed(2)} AUD
                </p>
              </div>
            ))}
          </div>
          
          {/* Right: Summary Card */}
          <div className="relative w-full max-w-[526px] mx-auto lg:mx-0">
            <div className="bg-[#FFC26F] rounded-[20px] overflow-hidden relative flex flex-col shadow-sm">
              
              {/* 1. Cost Breakdown Section */}
              <div className="p-6 lg:p-10 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Subtotal</span>
                  <span className="font-semibold text-base lg:text-lg">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[#280F0B] ">
                    <span className="text-base lg:text-lg tracking-tight">Discount</span>
                    <span className="font-semibold text-base lg:text-lg text-[#280F0B]">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                {/* Interactive Shipping Selector with Attached Truck Icon */}
                <div className="flex justify-between items-center relative z-20">
                  <span className="text-base lg:text-lg text-[#280f0b]">Shipping</span>

                  <div className="relative">
                    <button 
                      onClick={() => setShippingDropdownOpen(!shippingDropdownOpen)}
                      className="flex items-center gap-3 bg-[#f6d8ab] border border-[#280f0b]/10 rounded-lg px-4 py-3 text-sm font-bold text-[#280f0b] hover:bg-[#ffe3b9] transition-colors shadow-sm min-w-[200px] justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative w-5 h-5 shrink-0">
                          <Image src="/assets/images/truck.svg" alt="Shipping" fill className="object-contain" />
                        </div>
                        <span>{shippingMethod === 'standard' ? 'Standard' : 'Express'} - ${shippingCost.toFixed(2)}</span>
                      </div>
                      <ChevronDown size={16} className={`transition-transform ${shippingDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {shippingDropdownOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="absolute right-0 top-full mt-2 w-64 bg-[#f6d8ab] text-[#280f0b] rounded-lg shadow-xl overflow-hidden z-50 border border-[#280f0b]/10"
                        >
                          <div 
                            onClick={() => { setShippingMethod('standard'); setShippingDropdownOpen(false); }}
                            className={`p-4 cursor-pointer hover:bg-black/5 flex items-center justify-between ${shippingMethod === 'standard' ? 'bg-black/5' : ''}`}
                          >
                            <div className="flex flex-col">
                              <span className="font-bold">Standard</span>
                              <span className="text-xs opacity-70">7-14 Business Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {subtotal >= freeShippingThreshold ? <span className="font-bold text-[#280F0B]">FREE</span> : <span className="font-bold">$9.00</span>}
                              {shippingMethod === 'standard' && <Check size={16} />}
                            </div>
                          </div>
                          <div 
                            onClick={() => { setShippingMethod('express'); setShippingDropdownOpen(false); }}
                            className={`p-4 cursor-pointer hover:bg-black/5 flex items-center justify-between ${shippingMethod === 'express' ? 'bg-black/5' : ''}`}
                          >
                            <div className="flex flex-col">
                              <span className="font-bold">Express</span>
                              <span className="text-xs opacity-70 text-red-700 font-semibold">1-2 Days</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">$15.00</span>
                              {shippingMethod === 'express' && <Check size={16} />}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
              </div>

              {/* 2. Free Shipping Progress */}
              <div className="px-6 lg:px-10 pb-6">
                <p className="text-xs text-left text-[#280f0b] mb-2 font-medium tracking-wide">
                  {amountToFreeShipping > 0 ? (
                    <>
                      <span className="font-extrabold">${amountToFreeShipping.toFixed(2)}</span> away from free shipping!
                    </>
                  ) : (
                    <span className="font-extrabold">You've unlocked FREE shipping!</span>
                  )}
                </p>
                <div className="w-full h-2 bg-[#280f0b]/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    className="h-full bg-[#7F3E2F]"
                  />
                </div>
              </div>

              {/* 3. Divider with Cutouts */}
              <div className="relative w-full">
                <div className="border-t border-dashed border-[#280f0b]/30 w-full" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-[#f6d8ab] z-10" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-8 rounded-full bg-[#f6d8ab] z-10" />
              </div>

              {/* 4. Coupon Code Section */}
              <div className="px-6 lg:px-10 py-6">
                {!appliedCoupon ? (
                  <>
                    <button onClick={() => setCouponExpanded(!couponExpanded)} className="flex items-center gap-4 w-full group outline-none">
                      <div className="size-6 relative shrink-0">
                        <Image src="/assets/images/coupon.svg" alt="Coupon" fill className="object-contain" />
                      </div>
                      <span className="text-[#280f0b] font-medium text-base lg:text-lg group-hover:underline">Have a coupon code?</span>
                      <ChevronDown className={`ml-auto transition-transform ${couponExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${couponExpanded ? 'max-h-32 mt-4' : 'max-h-0'}`}>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Enter code" 
                          className="flex-1 bg-white/40 border border-[#280f0b]/20 p-3 rounded text-sm text-[#280f0b] placeholder-[#280f0b]/50 outline-none focus:border-[#280f0b]" 
                        />
                        <button 
                          onClick={handleApplyCoupon}
                          disabled={isApplying}
                          className="bg-[#280F0B] text-[#F6D8AB] px-4 rounded text-xs font-bold uppercase hover:bg-black disabled:opacity-50"
                        >
                          {isApplying ? '...' : 'Apply'}
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center py-2 bg-[#280F0B]/5 p-3 rounded border border-[#280F0B]/10">
                    <div className="flex items-center gap-3">
                      <Image src="/assets/images/coupon.svg" alt="Coupon" width={20} height={20} className="object-contain" />
                      <p className="text-[12px] font-bold text-[#280F0B] tracking-wider">CODE: {appliedCoupon} APPLIED</p>
                    </div>
                    <button onClick={removeCoupon} className="text-[11px] underline font-bold uppercase hover:text-red-700">Remove</button>
                  </div>
                )}
                {couponMessage.text && (
                  <p className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${couponMessage.type === 'error' ? 'text-red-700' : 'text-green-800'}`}>
                    {couponMessage.text}
                  </p>
                )}
              </div>
              <div className="w-full border-b border-dashed border-[#280f0b]/30" />

              {/* Final Total Section */}
              <div className="p-6 lg:p-10 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-10 text-[#280f0b]">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-2xl font-bold">${finalTotal.toFixed(2)} AUD</span>
                </div>

                <Link href="/checkout" className="w-full block mt-auto">
                  <button className="w-full bg-[#7f3e2f] text-[#fcf3e5] py-5 rounded-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all uppercase tracking-[1.12px] font-bold text-sm">
                    Proceed to checkout
                    <svg className="w-5 h-3" viewBox="0 0 18 12" fill="none">
                      <path d={svgPathsDesktop.p1553ba00} fill="#fcf3e5" />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}