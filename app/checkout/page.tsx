'use client';

import Header from '@/components/Header';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Sample Data for Country-State logic
const COUNTRY_DATA: Record<string, string[]> = {
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
  "United States": ["California", "Texas", "New York", "Florida", "Illinois"],
  "India": ["Maharashtra", "Karnataka", "Delhi", "Tamil Nadu", "Gujarat"],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],
  "Canada": ["Ontario", "Quebec", "British Columbia", "Alberta"]
};

const svgPathsDesktop = {
  p21b9db80: "M10.1569 12.7116L5.20694 17.6616C4.81647 18.0521 4.1834 18.0521 3.79294 17.6616C3.40247 17.2712 3.40247 16.6381 3.79294 16.2476L8.03594 12.0046L3.79294 7.76163C3.40247 7.37116 3.40247 6.73809 3.79294 6.34763C4.1834 5.95716 4.81647 5.95716 5.20694 6.34763L10.1569 11.2976C10.3444 11.4852 10.4497 11.7395 10.4497 12.0046C10.4497 12.2698 10.3444 12.5241 10.1569 12.7116Z",
  pdaf5300: "M0.75 4.77297C0.335786 4.77297 0 5.10876 0 5.52297C0 5.93718 0.335786 6.27297 0.75 6.27297V5.52297V4.77297ZM17.2803 6.0533C17.5732 5.76041 17.5732 5.28553 17.2803 4.99264L12.5074 0.21967C12.2145 -0.0732234 11.7396 -0.0732234 11.4467 0.21967C11.1538 0.512563 11.1538 0.987437 11.4467 1.28033L15.6893 5.52297L11.4467 9.76561C11.1538 10.0585 11.1538 10.5334 11.4467 10.8263C11.7396 11.1192 12.2145 11.1192 12.5074 10.8263L17.2803 6.0533ZM0.75 5.52297V6.27297H16.75V5.52297V4.77297H0.75V5.52297Z",
  p1553ba00: "M8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V8V7.25ZM25.5303 8.53033C25.8232 8.23744 25.8232 7.76256 25.5303 7.46967L20.7574 2.6967C20.4645 2.40381 19.9896 2.40381 19.6967 2.6967C19.4038 2.98959 19.4038 3.46447 19.6967 3.75736L23.9393 8L19.6967 12.2426C19.4038 12.5355 19.4038 13.0104 19.6967 13.3033C19.9896 13.5962 20.4645 13.5962 20.7574 13.3033L25.5303 8.53033ZM8 8V8.75H25V8V7.25H8V8Z",
};

export default function CheckoutPage() {
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  
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

  // Derived values for the summary
  const subtotal = 250.00;
  const tax = 35.00;
  const total = subtotal + tax;

  // Search logic for countries
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

  return (
    <div className="bg-[#F6D8AB] w-full min-h-screen font-manrope text-[#280F0B]">
      <Header />
      
      <main className="max-w-[1440px] mx-auto px-5 md:px-12 xl:px-24 2xl:px-32 py-10">
        {/* Progress Stepper - Hidden on Mobile */}
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
          <div className="flex gap-3 items-center">
            <div className="bg-[#280f0b] flex items-center justify-center rounded-full size-[30px] text-[#f6d8ab] font-bold">2</div>
            <p className="text-[#280f0b] text-base">Checkout</p>
          </div>
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

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column: Form - On mobile, this comes first (order-1) */}
          <div className="flex-1 w-full order-1">
            <h1 className="font-lora text-[32px] lg:text-[72px] mb-2 leading-tight">
              Checkout <span className="text-lg opacity-60 font-manrope font-normal">(2 items)</span>
            </h1>
            
            <section className="space-y-8 mt-8">
              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-wider">Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" placeholder="First name" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                  <input type="text" placeholder="Last name" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B] " />
                  <input type="email" placeholder="Email Address" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                  <input type="tel" placeholder="Phone (optional)" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none focus:border-[#280F0B]" />
                </div>
              </div>

              {/* Delivery Information */}
              <div>
                <h3 className="text-lg font-bold mb-4 tracking-wider">Delivery</h3>
                <div className="space-y-4">
                  
                  {/* Searchable Country Selector */}
                  <div className="relative">
                    <div 
                      onClick={() => setIsCountryOpen(!isCountryOpen)}
                      className="w-full bg-transparent border border-[#280F0B66] p-4 flex justify-between items-center cursor-pointer"
                    >
                      <span>{formData.country || "Select Country"}</span>
                      <svg className={`w-4 h-4 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/></svg>
                    </div>
                    
                    {isCountryOpen && (
                      <div className="absolute top-full left-0 w-full bg-[#F6D8AB] border border-[#280F0B66] z-50 shadow-xl">
                        <input 
                          type="text" 
                          autoFocus
                          placeholder="Search countries..." 
                          className="w-full p-4 bg-white/20 border-b border-[#280F0B33] outline-none"
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                        />
                        <div className="max-h-60 overflow-y-auto">
                          {filteredCountries.map(country => (
                            <div 
                              key={country} 
                              className="p-4 hover:bg-[#280F0B] hover:text-white cursor-pointer transition-colors"
                              onClick={() => handleCountrySelect(country)}
                            >
                              {country}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input type="text" placeholder="Street Address" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                  <input type="text" placeholder="Apartment, Suite, Unit, etc. (optional)" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none " />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" placeholder="Town/City" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                    <input type="text" placeholder="Pincode" className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none" />
                  </div>

                  {/* Dynamic State Selector */}
                  <select 
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select State/Province</option>
                    {COUNTRY_DATA[formData.country]?.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>

                  <textarea placeholder="Order notes (optional)" rows={4} className="w-full bg-transparent border border-[#280F0B66] p-4 outline-none resize-none"></textarea>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary Card - On mobile, this comes second (order-2) */}
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
                        <button className="bg-[#280F0B] text-white px-4 rounded text-xs font-bold uppercase">Apply</button>
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

                <button className="w-full bg-[#7f3e2f] text-[#fcf3e5] py-4 rounded-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all uppercase tracking-[1.12px] font-semibold text-sm">
                  Complete Payment
                  <svg className="w-5 h-3" viewBox="0 0 18 12" fill="none">
                    <path d="M12 1L17 6L12 11M1 6H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}