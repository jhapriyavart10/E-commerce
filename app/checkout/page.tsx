'use client';

import Header from '@/components/Header';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';

// Sample Data for Country-State logic
const COUNTRY_DATA: Record<string, string[]> = {
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
  "United States": ["California", "Texas", "New York", "Florida", "Illinois"],
  "India": ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Gujarat"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta"]
};

const svgPathsDesktop = {
  p1553ba00: "M8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V8V7.25ZM25.5303 8.53033C25.8232 8.23744 25.8232 7.76256 25.5303 7.46967L20.7574 2.6967C20.4645 2.40381 19.9896 2.40381 19.6967 2.6967C19.4038 2.98959 19.4038 3.46447 19.6967 3.75736L23.9393 8L19.6967 12.2426C19.4038 12.5355 19.4038 13.0104 19.6967 13.3033C19.9896 13.5962 20.4645 13.5962 20.7574 13.3033L25.5303 8.53033ZM8 8V8.75H25V8V7.25H8V8Z",
};

export default function CheckoutPage() {
  const { cartItems, cartId, getTotalItems } = useCart();
  
  // States
  const [isHydrated, setIsHydrated] = useState(false);
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: 'Australia',
    streetAddress: '',
    apartment: '',
    townCity: '',
    pincode: '',
    state: '',
    orderNotes: ''
  });

  // 1. HYDRATION GUARD: Prevents the page from acting on "empty" state 
  // until localStorage has been read by the Context.
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 2. Calculations
  const subtotal = useMemo(() => 
    cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  , [cartItems]);
  
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const filteredCountries = useMemo(() => {
    return Object.keys(COUNTRY_DATA).filter(c => 
      c.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  const handleCountrySelect = (country: string) => {
    setFormData({ ...formData, country, state: '' });
    setIsCountryOpen(false);
    setCountrySearch('');
  };

  // 3. SECURE REDIRECT LOGIC
  const handlePaymentClick = async () => {
    // Only proceed if hydrated and cart is valid
    if (!isHydrated) return;
    if (!cartId || cartItems.length === 0) {
      alert("Your cart is empty. Please add items before checking out.");
      return;
    }

    setIsProcessing(true);

    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId }),
      });

      const data = await response.json();

      if (data.url) {
        // Use replace to prevent "back button" loops if necessary
        window.location.href = data.url;
      } else {
        throw new Error("Checkout URL missing");
      }
    } catch (err) {
      console.error("Payment Redirect Error:", err);
      alert("Failed to reach payment gateway. Please check your connection.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle Loading/Hydration State
  if (!isHydrated) {
    return (
      <div className="bg-[#F6D8AB] min-h-screen flex items-center justify-center font-lora text-xl">
        Initializing Secure Checkout...
      </div>
    );
  }

  // Handle Empty Cart State (after hydration)
  if (cartItems.length === 0) {
    return (
      <div className="bg-[#F6D8AB] min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-3xl font-lora mb-4">Your cart is empty</h2>
        <p className="mb-6 opacity-70">Please add some products to your cart before proceeding to checkout.</p>
        <Link href="/product-analogue" className="bg-[#280F0B] text-[#F6D8AB] px-8 py-3 rounded-full font-bold uppercase tracking-wider">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#F6D8AB] w-full min-h-screen font-manrope text-[#280F0B]">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-5 md:px-12 xl:px-24 2xl:px-32 py-10">
        {/* Progress Stepper */}
        <div className="hidden md:flex items-center gap-4 mb-12">
          <Link href="/cart" className="flex gap-3 items-center group cursor-pointer">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold group-hover:scale-110 transition-transform">1</div>
            <p className="text-[#280f0b] text-base group-hover:underline">Shopping Cart</p>
          </Link>
          <div className="w-[33px] h-[16px] opacity-40">
            <svg className="w-full h-full" fill="none" viewBox="0 0 33 16"><path d={svgPathsDesktop.p1553ba00} fill="black" /></svg>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">2</div>
            <p className="text-[#280f0b] text-base font-bold">Checkout</p>
          </div>
          <div className="w-[33px] h-[16px] opacity-40">
            <svg className="w-full h-full" fill="none" viewBox="0 0 33 16"><path d={svgPathsDesktop.p1553ba00} fill="black" /></svg>
          </div>
          <div className="flex gap-3 items-center opacity-40">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">3</div>
            <p className="text-[#280f0b] text-base">Order Complete</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="flex-1 w-full order-1">
            <h1 className="font-lora text-[32px] lg:text-[72px] mb-2 leading-tight">
              Checkout <span className="text-lg opacity-60 font-manrope font-normal">({getTotalItems()} items)</span>
            </h1>
            
            <section className="space-y-8 mt-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-wider uppercase">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                  <input type="text" placeholder="Last name" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                  <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                  <input type="tel" placeholder="Phone (optional)" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-wider uppercase">Delivery</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <div onClick={() => setIsCountryOpen(!isCountryOpen)} className="w-full bg-transparent border border-[#280F0B66] p-4 flex justify-between items-center cursor-pointer">
                      <span>{formData.country}</span>
                      <svg className={`w-4 h-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                    {isCountryOpen && (
                      <div className="absolute top-full left-0 w-full bg-[#F6D8AB] border border-[#280F0B66] z-50 shadow-xl rounded-b-md">
                        <input type="text" autoFocus placeholder="Search countries..." className="w-full p-4 bg-white/20 border-b border-[#280F0B33] outline-none" value={countrySearch} onChange={(e) => setCountrySearch(e.target.value)} />
                        <div className="max-h-60 overflow-y-auto">
                          {filteredCountries.map(country => (
                            <div key={country} className="p-4 hover:bg-[#280F0B] hover:text-[#F6D8AB] cursor-pointer transition-colors" onClick={() => handleCountrySelect(country)}>{country}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <input type="text" placeholder="Street Address" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Town/City" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                    <input type="text" placeholder="Pincode" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                  </div>
                  <select value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none appearance-none cursor-pointer">
                    <option value="" disabled>Select State/Province</option>
                    {COUNTRY_DATA[formData.country]?.map(state => <option key={state} value={state}>{state}</option>)}
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Dynamic Summary Card */}
          <div className="relative w-full max-w-[526px] mx-auto lg:mx-0 order-2 lg:mt-[120px]">
            <div className="bg-[#FFC26F] rounded-[20px] overflow-hidden relative flex flex-col shadow-sm">
              <div className="p-6 lg:p-10 flex flex-col gap-4">
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Subtotal</span>
                  <span className="font-semibold text-base lg:text-lg">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Tax</span>
                  <span className="font-semibold text-base lg:text-lg">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[#280f0b]">
                  <span className="text-base lg:text-lg">Shipping</span>
                  <span className="font-semibold text-base lg:text-lg text-[#280f0b]">FREE</span>
                </div>
              </div>

              {/* Coupon Section */}
              <div className="relative">
                <div className="w-full border-t border-dashed border-black/40" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 size-8 rounded-full bg-[#f6d8ab]" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 size-8 rounded-full bg-[#f6d8ab]" />
                <div className="px-6 lg:px-10 py-6">
                  <button onClick={() => setCouponExpanded(!couponExpanded)} className="flex items-center gap-4 w-full group">
                    <div className="size-6 relative shrink-0">
                      <Image src="/assets/images/coupon.png" alt="Coupon" fill className="object-contain" />
                    </div>
                    <span className="text-[#280f0b] font-medium text-base lg:text-lg group-hover:underline">Have a coupon code?</span>
                    <svg className={`ml-auto w-4 h-4 transition-transform ${couponExpanded ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${couponExpanded ? 'max-h-20 mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex gap-2">
                      <input type="text" placeholder="Enter code" className="flex-1 bg-white/20 border border-black/20 p-3 rounded text-sm outline-none" />
                      <button className="bg-[#280F0B] text-[#F6D8AB] px-4 rounded text-xs font-bold uppercase hover:bg-black">Apply</button>
                    </div>
                  </div>
                </div>
                <div className="w-full border-b border-dashed border-black/40" />
              </div>

              <div className="p-6 lg:p-10 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-2xl font-bold">${total.toFixed(2)} AUD</span>
                </div>

                <button 
                  disabled={isProcessing}
                  onClick={handlePaymentClick}
                  className="w-full bg-[#7f3e2f] text-[#fcf3e5] py-5 rounded-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all uppercase tracking-[1.12px] font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Redirecting...
                    </span>
                  ) : (
                    <>
                      Complete Payment
                      <svg className="w-5 h-3" viewBox="0 0 18 12" fill="none"><path d="M12 1L17 6L12 11M1 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}