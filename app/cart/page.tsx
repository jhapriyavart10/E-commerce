'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import Header from '@/components/Header';
import Link from 'next/link';

const svgPathsDesktop = {
  p21b9db80: "M10.1569 12.7116L5.20694 17.6616C4.81647 18.0521 4.1834 18.0521 3.79294 17.6616C3.40247 17.2712 3.40247 16.6381 3.79294 16.2476L8.03594 12.0046L3.79294 7.76163C3.40247 7.37116 3.40247 6.73809 3.79294 6.34763C4.1834 5.95716 4.81647 5.95716 5.20694 6.34763L10.1569 11.2976C10.3444 11.4852 10.4497 11.7395 10.4497 12.0046C10.4497 12.2698 10.3444 12.5241 10.1569 12.7116Z",
  pdaf5300: "M0.75 4.77297C0.335786 4.77297 0 5.10876 0 5.52297C0 5.93718 0.335786 6.27297 0.75 6.27297V5.52297V4.77297ZM17.2803 6.0533C17.5732 5.76041 17.5732 5.28553 17.2803 4.99264L12.5074 0.21967C12.2145 -0.0732234 11.7396 -0.0732234 11.4467 0.21967C11.1538 0.512563 11.1538 0.987437 11.4467 1.28033L15.6893 5.52297L11.4467 9.76561C11.1538 10.0585 11.1538 10.5334 11.4467 10.8263C11.7396 11.1192 12.2145 11.1192 12.5074 10.8263L17.2803 6.0533ZM0.75 5.52297V6.27297H16.75V5.52297V4.77297H0.75V5.52297Z",
  p1553ba00: "M8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V8V7.25ZM25.5303 8.53033C25.8232 8.23744 25.8232 7.76256 25.5303 7.46967L20.7574 2.6967C20.4645 2.40381 19.9896 2.40381 19.6967 2.6967C19.4038 2.98959 19.4038 3.46447 19.6967 3.75736L23.9393 8L19.6967 12.2426C19.4038 12.5355 19.4038 13.0104 19.6967 13.3033C19.9896 13.5962 20.4645 13.5962 20.7574 13.3033L25.5303 8.53033ZM8 8V8.75H25V8V7.25H8V8Z",
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartId, getTotalItems } = useCart();
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [couponMessage, setCouponMessage] = useState({ text: '', type: '' });
  const [discountAmount, setDiscountAmount] = useState(0);

  // Dynamic calculations based on real Cart state
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.1; // Example 10% tax calculation
  const total = subtotal + tax - discountAmount;

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    setIsApplying(true);
    setCouponMessage({ text: '', type: '' });

    try {
      // Note: Ensure your API route handles cartId specifically if using Shopify's Cart API
      const res = await fetch('/api/shopify/apply-discount', {
        method: 'POST',
        body: JSON.stringify({ 
          checkoutId: cartId, 
          discountCode: couponCode 
        })
      });
      
      const result = await res.json();

      if (result.success) {
        setCouponMessage({ text: 'Discount applied!', type: 'success' });
        // Calculate how much was saved
        const savings = (subtotal + tax) - Number(result.newTotal);
        setDiscountAmount(savings);
      } else {
        setCouponMessage({ text: result.error || 'Invalid code', type: 'error' });
        setDiscountAmount(0);
      }
    } catch (err) {
      setCouponMessage({ text: 'System error. Try again.', type: 'error' });
    } finally {
      setIsApplying(false);
    }
  };

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
          <Link href="/checkout" className="flex gap-3 items-center opacity-40">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold group-hover:bg-[#ce953f] transition-colors">
              2
            </div>
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
            <div className="bg-[#FFC26F] rounded-[20px] overflow-hidden relative min-h-[430px] flex flex-col shadow-sm">
              
              <div className="p-6 lg:p-10 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Subtotal</span>
                  <span className="font-semibold text-base lg:text-lg">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-[#280f0b] font-bold">
                    <span className="text-base lg:text-lg">Discount</span>
                    <span className="text-base lg:text-lg">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Tax</span>
                  <span className="font-semibold text-base lg:text-lg">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Shipping</span>
                  <span className="font-semibold text-base lg:text-lg">FREE</span>
                </div>
              </div>

              <div className="relative">
                <div className="w-full border-t border-dashed border-black/40" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-[#f6d8ab] z-10 shadow-inner" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-8 rounded-full bg-[#f6d8ab] z-10 shadow-inner" />

                <div className="px-6 lg:px-10 py-6">
                  <button 
                    onClick={() => setCouponExpanded(!couponExpanded)} 
                    className="flex items-center gap-4 w-full group outline-none"
                  >
                    <div className="size-6 relative shrink-0">
                      <Image src="/assets/images/coupon.png" alt="Coupon" fill className="object-contain" />
                    </div>
                    <span className="text-[#280f0b] font-medium text-base lg:text-lg group-hover:underline">
                      Have a coupon code?
                    </span>
                    <svg className={`ml-auto w-4 h-4 transition-transform ${couponExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="#280f0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-300 ${couponExpanded ? 'max-h-32 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex gap-2">
                      <input 
                        type="text" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter code" 
                        className="flex-1 bg-white/20 border border-black/20 p-3 rounded text-sm text-[#280f0b] placeholder-[#280f0b]/50 outline-none focus:border-[#280f0b]" 
                      />
                      <button 
                        onClick={handleApplyCoupon}
                        disabled={isApplying}
                        className="bg-[#280F0B] text-[#F6D8AB] px-6 rounded text-xs font-bold uppercase hover:bg-black transition-colors disabled:opacity-50"
                      >
                        {isApplying ? '...' : 'Apply'}
                      </button>
                    </div>
                    
                    {/* Status Message: Uses existing text size and bold uppercase styling */}
                    {couponMessage.text && (
                      <p className={`mt-3 text-[11px] font-bold uppercase tracking-widest ${couponMessage.type === 'error' ? 'text-red-700' : 'text-green-800'}`}>
                        {couponMessage.text}
                      </p>
                    )}
                  </div>
                </div>
                <div className="w-full border-b border-dashed border-black/40" />
              </div>

              <div className="p-6 lg:p-10 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)} AUD</span>
                </div>

              <Link href="/checkout" className="w-full block">
                <button  
                  className="w-full mt-auto bg-[#7f3e2f] text-[#fcf3e5] py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-110 disabled:opacity-50 transition-all uppercase tracking-[1.12px] font-semibold text-sm"
                >
                  Proceed to checkout
                  <svg className="w-5 h-3" viewBox="0 0 18 12" fill="none">
                    <path d={svgPathsDesktop.pdaf5300} fill="#fcf3e5" />
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