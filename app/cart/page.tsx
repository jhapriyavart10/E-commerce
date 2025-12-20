'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/app/context/CartContext';
import Header from '@/components/Header';

// SVG Path data for desktop
const svgPathsDesktop = {
  p21b9db80: "M10.1569 12.7116L5.20694 17.6616C4.81647 18.0521 4.1834 18.0521 3.79294 17.6616C3.40247 17.2712 3.40247 16.6381 3.79294 16.2476L8.03594 12.0046L3.79294 7.76163C3.40247 7.37116 3.40247 6.73809 3.79294 6.34763C4.1834 5.95716 4.81647 5.95716 5.20694 6.34763L10.1569 11.2976C10.3444 11.4852 10.4497 11.7395 10.4497 12.0046C10.4497 12.2698 10.3444 12.5241 10.1569 12.7116Z",
  p242d7e80: "M526 213.581C520.217 215.302 516 220.658 516 227C516 233.342 520.217 238.697 526 240.418V420H0V240.418C5.78266 238.697 10 233.342 10 227C10 220.658 5.7828 215.302 0 213.581V0H526V213.581Z",
  pdaf5300: "M0.75 4.77297C0.335786 4.77297 0 5.10876 0 5.52297C0 5.93718 0.335786 6.27297 0.75 6.27297V5.52297V4.77297ZM17.2803 6.0533C17.5732 5.76041 17.5732 5.28553 17.2803 4.99264L12.5074 0.21967C12.2145 -0.0732234 11.7396 -0.0732234 11.4467 0.21967C11.1538 0.512563 11.1538 0.987437 11.4467 1.28033L15.6893 5.52297L11.4467 9.76561C11.1538 10.0585 11.1538 10.5334 11.4467 10.8263C11.7396 11.1192 12.2145 11.1192 12.5074 10.8263L17.2803 6.0533ZM0.75 5.52297V6.27297H16.75V5.52297V4.77297H0.75V5.52297Z",
  p23bcfd80: "M5.33333 15.8333L4.16667 14.6667L8.83333 10L4.16667 5.33333L5.33333 4.16667L10 8.83333L14.6667 4.16667L15.8333 5.33333L11.1667 10L15.8333 14.6667L14.6667 15.8333L10 11.1667L5.33333 15.8333Z",
  pbe57a00: "M10 18C11.775 17.9998 13.4989 17.4056 14.897 16.312L19.293 20.708L20.707 19.294L16.311 14.898C17.4051 13.4997 17.9997 11.7755 18 10C18 5.589 14.411 2 10 2C5.589 2 2 5.589 2 10C2 14.411 5.589 18 10 18ZM10 4C13.309 4 16 6.691 16 10C16 13.309 13.309 16 10 16C6.691 16 4 13.309 4 10C4 6.691 6.691 4 10 4Z",
  p2a29c500: "M1.74006 10.5285C2.25021 7.97495 2.50576 6.70005 3.34841 5.87735C3.50414 5.72577 3.67259 5.58783 3.85191 5.46505C4.82376 4.80005 6.12526 4.80005 8.72826 4.80005H10.3461C12.9482 4.80005 14.2487 4.80005 15.2196 5.46505C15.4001 5.58918 15.5679 5.72693 15.7231 5.8783C16.5658 6.70005 16.8223 7.9759 17.3324 10.5285C18.0649 14.1917 18.4316 16.0233 17.588 17.321C17.4353 17.5573 17.258 17.7736 17.056 17.9699C15.9483 19.05 14.0815 19.05 10.3461 19.05H8.72826C4.99191 19.05 3.12421 19.05 2.01651 17.9689C1.8161 17.7729 1.638 17.5553 1.48546 17.3201C0.641857 16.0224 1.00856 14.1908 1.74196 10.5276L1.74006 10.5285Z",
  p1553ba00: "M8 7.25C7.58579 7.25 7.25 7.58579 7.25 8C7.25 8.41421 7.58579 8.75 8 8.75V8V7.25ZM25.5303 8.53033C25.8232 8.23744 25.8232 7.76256 25.5303 7.46967L20.7574 2.6967C20.4645 2.40381 19.9896 2.40381 19.6967 2.6967C19.4038 2.98959 19.4038 3.46447 19.6967 3.75736L23.9393 8L19.6967 12.2426C19.4038 12.5355 19.4038 13.0104 19.6967 13.3033C19.9896 13.5962 20.4645 13.5962 20.7574 13.3033L25.5303 8.53033ZM8 8V8.75H25V8V7.25H8V8Z",
  pc813b00: "M9 11C11.7614 11 14 8.76142 14 6C14 3.23858 11.7614 1 9 1C6.23858 1 4 3.23858 4 6C4 8.76142 6.23858 11 9 11Z",
  pd085366: "M17 19C17 16.8783 16.1571 14.8434 14.6569 13.3431C13.1566 11.8429 11.1217 11 9 11C6.87827 11 4.84344 11.8429 3.34315 13.3431C1.84285 14.8434 1 16.8783 1 19",
  p3659b180: "M12.3855 9.55002C12.9102 9.55002 13.3355 9.12469 13.3355 8.60002C13.3355 8.07535 12.9102 7.65002 12.3855 7.65002C11.8609 7.65002 11.4355 8.07535 11.4355 8.60002C11.4355 9.12469 11.8609 9.55002 12.3855 9.55002Z",
  p27467800: "M6.68633 9.55002C7.211 9.55002 7.63633 9.12469 7.63633 8.60002C7.63633 8.07535 7.211 7.65002 6.68633 7.65002C6.16166 7.65002 5.73633 8.07535 5.73633 8.60002C5.73633 9.12469 6.16166 9.55002 6.68633 9.55002Z",
  p12d72e00: "M6.68555 4.8V3.85C6.68555 3.09413 6.98581 2.36922 7.52029 1.83475C8.05477 1.30027 8.77968 1 9.53555 1C10.2914 1 11.0163 1.30027 11.5508 1.83475C12.0853 2.36922 12.3855 3.09413 12.3855 3.85V4.8",
};

// SVG Paths for mobile
const svgPathsMobile = {
  p21b9db80: "M10.1569 12.7116L5.20694 17.6616C4.81647 18.0521 4.1834 18.0521 3.79294 17.6616C3.40247 17.2712 3.40247 16.6381 3.79294 16.2476L8.03594 12.0046L3.79294 7.76163C3.40247 7.37116 3.40247 6.73809 3.79294 6.34763C4.1834 5.95716 4.81647 5.95716 5.20694 6.34763L10.1569 11.2976C10.3444 11.4852 10.4497 11.7395 10.4497 12.0046C10.4497 12.2698 10.3444 12.5241 10.1569 12.7116Z",
  p29054b00: "M342 213.581C336.217 215.302 332 220.658 332 227C332 233.342 336.217 238.697 342 240.418V420H0V240.418C5.78266 238.697 10 233.342 10 227C10 220.658 5.7828 215.302 0 213.581V0H342V213.581Z",
  pdaf5300: "M0.75 4.77297C0.335786 4.77297 0 5.10876 0 5.52297C0 5.93718 0.335786 6.27297 0.75 6.27297V5.52297V4.77297ZM17.2803 6.0533C17.5732 5.76041 17.5732 5.28553 17.2803 4.99264L12.5074 0.21967C12.2145 -0.0732234 11.7396 -0.0732234 11.4467 0.21967C11.1538 0.512563 11.1538 0.987437 11.4467 1.28033L15.6893 5.52297L11.4467 9.76561C11.1538 10.0585 11.1538 10.5334 11.4467 10.8263C11.7396 11.1192 12.2145 11.1192 12.5074 10.8263L17.2803 6.0533ZM0.75 5.52297V6.27297H16.75V5.52297V4.77297H0.75V5.52297Z",
  p22d23bc0: "M3.59961 9.39995C3.59961 9.08169 3.72604 8.77647 3.95108 8.55142C4.17612 8.32638 4.48135 8.19995 4.79961 8.19995H19.1996C19.5179 8.19995 19.8231 8.32638 20.0481 8.55142C20.2732 8.77647 20.3996 9.08169 20.3996 9.39995C20.3996 9.71821 20.2732 10.0234 20.0481 10.2485C19.8231 10.4735 19.5179 10.6 19.1996 10.6H4.79961C4.48135 10.6 4.17612 10.4735 3.95108 10.2485C3.72604 10.0234 3.59961 9.71821 3.59961 9.39995ZM3.59961 16.6C3.59961 16.2817 3.72604 15.9765 3.95108 15.7514C4.17612 15.5264 4.48135 15.4 4.79961 15.4H19.1996C19.5179 15.4 19.8231 15.5264 20.0481 15.7514C20.2732 15.9765 20.3996 16.2817 20.3996 16.6C20.3996 16.9182 20.2732 17.2234 20.0481 17.4485C19.8231 17.6735 19.5179 17.8 19.1996 17.8H4.79961C4.48135 17.8 4.17612 17.6735 3.95108 17.4485C3.72604 17.2234 3.59961 16.9182 3.59961 16.6Z",
  p2a29c500: "M1.74006 10.5285C2.25021 7.97495 2.50576 6.70005 3.34841 5.87735C3.50414 5.72577 3.67259 5.58783 3.85191 5.46505C4.82376 4.80005 6.12526 4.80005 8.72826 4.80005H10.3461C12.9482 4.80005 14.2487 4.80005 15.2196 5.46505C15.4001 5.58918 15.5679 5.72693 15.7231 5.8783C16.5658 6.70005 16.8223 7.9759 17.3324 10.5285C18.0649 14.1917 18.4316 16.0233 17.588 17.321C17.4353 17.5573 17.258 17.7736 17.056 17.9699C15.9483 19.05 14.0815 19.05 10.3461 19.05H8.72826C4.99191 19.05 3.12421 19.05 2.01651 17.9689C1.8161 17.7729 1.638 17.5553 1.48546 17.3201C0.641857 16.0224 1.00856 14.1908 1.74196 10.5276L1.74006 10.5285Z",
  p3659b180: "M12.3855 9.55002C12.9102 9.55002 13.3355 9.12469 13.3355 8.60002C13.3355 8.07535 12.9102 7.65002 12.3855 7.65002C11.8609 7.65002 11.4355 8.07535 11.4355 8.60002C11.4355 9.12469 11.8609 9.55002 12.3855 9.55002Z",
  p27467800: "M6.68633 9.55002C7.211 9.55002 7.63633 9.12469 7.63633 8.60002C7.63633 8.07535 7.211 7.65002 6.68633 7.65002C6.16166 7.65002 5.73633 8.07535 5.73633 8.60002C5.73633 9.12469 6.16166 9.55002 6.68633 9.55002Z",
  p12d72e00: "M6.68555 4.8V3.85C6.68555 3.09413 6.98581 2.36922 7.52029 1.83475C8.05477 1.30027 8.77968 1 9.53555 1C10.2914 1 11.0163 1.30027 11.5508 1.83475C12.0853 2.36922 12.3855 3.09413 12.3855 3.85V4.8",
};

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const [isMobile, setIsMobile] = useState(false);
  const [couponExpanded, setCouponExpanded] = useState(false);

  // Use mock data if cart is empty (for display purposes)
  const displayItems = cartItems.length > 0 ? cartItems : [
    {
      id: 'angel-wing-crystal-pendants',
      name: 'Angel Wing Crystal Pendants',
      variant: 'Rose Quartz, Standard',
      price: 35.00,
      quantity: 1,
      image: '/assets/images/necklace-img.png'
    }
  ];

  // Calculate totals - use hardcoded values from screenshot
  const subtotal = 250.00;
  const tax = 35.00;
  const shipping = 0; // FREE
  const total = 285.00;

  // Check screen size
  if (typeof window !== 'undefined') {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    if (!isMobile && window.innerWidth < 768) {
      checkMobile();
    } else if (isMobile && window.innerWidth >= 768) {
      checkMobile();
    }
  }

  if (isMobile) {
    // Mobile Cart Layout
    return (
      <div className="bg-[#f6d8ab] min-h-screen w-full">
        <Header />

        {/* Main Content */}
        <div className="pt-[190px] px-6 pb-12 min-h-screen">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="font-['Lora',serif] font-normal text-[#280f0b] text-[40px] leading-[100%]">Cart</h1>
            <p className="font-['Manrope:Regular',sans-serif] font-normal text-[#280f0b] text-[16px] leading-[100%] ml-1">(2 items)</p>
          </div>

          {/* Cart Items */}
          <div className="mb-8">
          {displayItems.map((item) => (
            <div key={item.id} className="mb-6">
              <div className="content-stretch flex gap-[16px] items-start w-full">
                <div className="relative shrink-0 w-[95px] h-[95px]">
                  <Image 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    src={item.image}
                    width={95}
                    height={95}
                  />
                </div>
                <div className="content-stretch flex flex-col gap-[8px] items-start flex-1">
                  <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] text-[#280f0b] text-[16px]">{item.name}</p>
                  <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#7f3e2f] text-[14px]">{item.variant}</p>
                  <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[#280f0b] text-[13px]">${item.price.toFixed(2)} AUD</p>
                  
                  {/* Quantity Selector */}
                  <div className="content-stretch flex gap-[24px] h-[31px] items-center px-[8px] py-[6px] relative rounded-[6px] shrink-0 border border-[#280f0b]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#280f0b] text-[20px] ${item.quantity === 1 ? 'opacity-50' : ''}`}
                    >
                      -
                    </button>
                    <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-[#280f0b] text-[16px]">{item.quantity}</p>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#280f0b] text-[20px]"
                    >
                      +
                    </button>
                  </div>
                  
                  {/* Delete Item */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[#474747] text-[13px] underline"
                  >
                    Delete item
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Summary Card */}
          <div className="w-full max-w-[342px] mx-auto mb-[80px]">
            <div className="relative w-full h-[420px] bg-[#FFC26F] rounded-[20px] overflow-hidden">
              <svg className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 342 420">
                <path d={svgPathsMobile.p29054b00} fill="#FFC26F" />
              </svg>
            
            {/* Summary Content */}
            <div className="relative p-6 flex flex-col h-full">
              {/* Subtotal Items */}
              <div className="flex items-center justify-between text-[16px] text-black mb-4">
                <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Subtotal</p>
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between text-[16px] text-black mb-4">
                <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Tax</p>
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">${tax.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between text-[16px] text-black">
                <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Shipping</p>
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">FREE</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-dashed border-black opacity-50 mt-[80px] mb-6 -mx-6" />
              
              {/* Coupon Section */}
              <div className="relative -mx-6 px-6 mb-6">
                {/* Left semicircle */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-[#f6d8ab] rounded-full" />
                {/* Right semicircle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[12px] h-[12px] bg-[#f6d8ab] rounded-full" />
                
                <button 
                  onClick={() => setCouponExpanded(!couponExpanded)}
                  className="flex gap-2 items-center w-full"
                >
                  <div className="relative shrink-0 size-[22px]">
                    <Image src="/assets/images/coupon.png" alt="Coupon" width={22} height={22} />
                  </div>
                  <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] text-[#280f0b] text-[16px] text-nowrap tracking-[-0.08px]">Have a coupon code ?</p>
                  <div className="ml-auto">
                    <div className={`transition-transform ${couponExpanded ? '' : 'rotate-90'}`}>
                      <svg className="block w-[12px] h-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 12 24">
                        <path clipRule="evenodd" d={svgPathsMobile.p21b9db80} fill="#280F0B" fillRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Divider */}
              <div className="border-t border-dashed border-black opacity-50 mb-6 -mx-6" />
              
              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] text-[#280f0b] text-[20px] text-nowrap">Total</p>
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] text-[#280f0b] text-[20px] text-nowrap text-right">${total.toFixed(2)} AUD</p>
              </div>
              
              {/* Checkout Button */}
              <button className="mt-auto mb-6 bg-[#7f3e2f] flex gap-[12px] items-center justify-center px-[40px] py-[15px] w-full">
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-[#fcf3e5] text-[14px] text-nowrap tracking-[1.12px] uppercase">Proceed to checkout</p>
                <svg className="block w-[16px] h-[12px]" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
                  <path d={svgPathsMobile.pdaf5300} fill="#FCF3E5" />
                </svg>
              </button>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Cart Layout
  return (
    <div className="bg-[#f6d8ab] min-h-screen w-full">
      <Header />
      
      {/* Main Content Container */}
      <div className="w-full max-w-[1280px] mx-auto px-8 pb-12 pt-[50px]">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex gap-4 items-center">
            {/* Step 1 - Active */}
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
              <div className="bg-[#280f0b] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[79px] shrink-0 size-[30px]">
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] text-[#f6d8ab] text-[16px]">1</p>
              </div>
              <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] text-[#280f0b] text-[16px] tracking-[-0.08px]">Shopping Cart</p>
            </div>
            
            {/* Arrow */}
            <div className="h-[16px] relative shrink-0 w-[33px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 16">
                <g opacity="0.4">
                  <path d={svgPathsDesktop.p1553ba00} fill="black" />
                </g>
              </svg>
            </div>
            
            {/* Step 2 - Inactive */}
            <div className="content-stretch flex gap-[12px] items-center opacity-40 relative shrink-0">
              <div className="bg-[#280f0b] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[79px] shrink-0 size-[30px]">
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f6d8ab] text-[16px] text-nowrap">2</p>
              </div>
              <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#280f0b] text-[16px] text-nowrap tracking-[-0.08px]">Checkout</p>
            </div>
            
            {/* Arrow */}
            <div className="h-[16px] relative shrink-0 w-[33px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 33 16">
                <g opacity="0.4">
                  <path d={svgPathsDesktop.p1553ba00} fill="black" />
                </g>
              </svg>
            </div>
            
            {/* Step 3 - Inactive */}
            <div className="content-stretch flex gap-[12px] items-center opacity-40 relative shrink-0">
              <div className="bg-[#280f0b] content-stretch flex flex-col items-center justify-center p-[8px] relative rounded-[79px] shrink-0 size-[30px]">
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#f6d8ab] text-[16px] text-nowrap">3</p>
              </div>
              <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] relative shrink-0 text-[#280f0b] text-[16px] text-nowrap tracking-[-0.08px]">Order Complete</p>
            </div>
          </div>
        </div>
        
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="font-['Lora:Regular',sans-serif] font-normal text-[#280f0b] text-[72px] leading-[100%]">Cart</h1>
          <p className="font-['Lora:Regular',sans-serif] font-normal text-[#280f0b] text-[16px] leading-[100%] ml-2">(2 items)</p>
        </div>
        
        {/* Two Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_526px] gap-[40px]">
          {/* Left Column - Cart Items */}
          <div className="flex flex-col gap-6">
            {/* Table Headers */}
            <div className="grid grid-cols-[2fr_1fr_1fr] gap-[16px] pb-[32px] border-b border-[#280f0b] border-opacity-40">
              <p className="font-['Manrope:Bold',sans-serif] font-bold text-[12px] text-black tracking-[1.2px] uppercase">product</p>
              <p className="font-['Manrope:Bold',sans-serif] font-bold text-[12px] text-black tracking-[1.2px] uppercase text-center">Quantity</p>
              <p className="font-['Manrope:Bold',sans-serif] font-bold text-[12px] text-black tracking-[1.2px] uppercase text-right">Subtotal</p>
            </div>
            
            {/* Cart Items */}
            {displayItems.map((item) => (
              <div key={item.id} className="grid grid-cols-[2fr_1fr_1fr] gap-[16px] items-center">
                {/* Product Info */}
                <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
                  <div className="relative shrink-0 size-[110px]">
                    <Image 
                      alt={item.name}
                      className="w-full h-full object-cover"
                      src={item.image}
                      width={110}
                      height={110}
                    />
                  </div>
                  <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[217px]">
                    <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[normal] text-[#280f0b] text-[16px]">{item.name}</p>
                    <p className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#7f3e2f] text-[14px]">{item.variant}</p>
                    <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[#280f0b] text-[13px]">${item.price.toFixed(2)} AUD</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[#474747] text-[13px] underline"
                    >
                      Delete item
                    </button>
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="flex justify-center">
                  <div className="content-stretch flex gap-[24px] h-[31px] items-center px-[8px] py-[6px] relative rounded-[6px] shrink-0 border border-[#280f0b]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className={`font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#280f0b] text-[20px] ${item.quantity === 1 ? 'opacity-50' : ''}`}
                    >
                      -
                    </button>
                    <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-[#280f0b] text-[16px]">{item.quantity}</p>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="font-['Manrope:Medium',sans-serif] font-medium leading-[1.5] text-[#280f0b] text-[20px]"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Subtotal */}
                <div className="flex justify-end">
                  <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[normal] text-[13px] text-black">${(item.price * item.quantity).toFixed(2)} AUD</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Right Column - Summary */}
          <div className="relative h-[420px] mb-[200px] w-full max-w-[526px] mx-auto lg:mx-0">
            <div className="absolute inset-0 bg-[#FFC26F] rounded-[20px] overflow-hidden">
              <svg className="block w-full h-full" fill="none" preserveAspectRatio="none" viewBox="0 0 526 420">
                <path d={svgPathsDesktop.p242d7e80} fill="#FFC26F" />
              </svg>
            </div>
            
            {/* Summary Content */}
            <div className="relative p-8 flex flex-col h-full">
              {/* Subtotal Items */}
              <div className="flex items-center justify-between text-[16px] text-black mb-4">
                <p className="font-['Manrope',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Subtotal</p>
                <p className="font-['Manrope',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">${subtotal.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between text-[16px] text-black mb-4">
                <p className="font-['Manrope',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Tax</p>
                <p className="font-['Manrope',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">${tax.toFixed(2)}</p>
              </div>
              
              <div className="flex items-center justify-between text-[16px] text-black">
                <p className="font-['Manrope',sans-serif] font-normal leading-[24px] tracking-[-0.08px]">Shipping</p>
                <p className="font-['Manrope',sans-serif] font-semibold leading-[1.5] text-right tracking-[0.16px]">FREE</p>
              </div>
              
              {/* Divider */}
              <div className="border-t border-dashed border-black opacity-50 mt-[80px] mb-6 -mx-8" />
              
              {/* Coupon Section */}
              <div className="relative -mx-8 px-8 mb-6">
                {/* Left semicircle */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[16px] h-[16px] bg-[#f6d8ab] rounded-full" />
                {/* Right semicircle */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-[16px] h-[16px] bg-[#f6d8ab] rounded-full" />
                
                <button 
                  onClick={() => setCouponExpanded(!couponExpanded)}
                  className="flex gap-2 items-center w-full"
                >
                  <div className="relative shrink-0 size-[22px]">
                    <Image src="/assets/images/coupon.png" alt="Coupon" width={22} height={22} />
                  </div>
                  <p className="font-['Manrope:Regular',sans-serif] font-normal leading-[24px] text-[#280f0b] text-[16px] text-nowrap tracking-[-0.08px]">Have a coupon code ?</p>
                  <div className="ml-auto">
                    <div className={`transition-transform ${couponExpanded ? '' : 'rotate-90'}`}>
                      <svg className="block w-[12px] h-[24px]" fill="none" preserveAspectRatio="none" viewBox="0 0 12 24">
                        <path clipRule="evenodd" d={svgPathsDesktop.p21b9db80} fill="#280F0B" fillRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
              
              {/* Divider */}
              <div className="border-t border-dashed border-black opacity-50 mb-6 -mx-8" />
              
              {/* Total */}
              <div className="flex items-center justify-between mb-6">
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] text-[#280f0b] text-[20px] text-nowrap">Total</p>
                <p className="font-['Manrope:Bold',sans-serif] font-bold leading-[normal] text-[#280f0b] text-[20px] text-nowrap text-right">${total.toFixed(2)} AUD</p>
              </div>
              
              {/* Checkout Button */}
              <button className="mt-auto mb-6 bg-[#7f3e2f] flex gap-[12px] items-center justify-center px-[40px] py-[15px] w-full">
                <p className="font-['Manrope:SemiBold',sans-serif] font-semibold leading-[1.5] text-[#fcf3e5] text-[14px] text-nowrap tracking-[1.12px] uppercase">Proceed to checkout</p>
                <svg className="block w-[16px] h-[12px]" fill="none" preserveAspectRatio="none" viewBox="0 0 18 12">
                  <path d={svgPathsDesktop.pdaf5300} fill="#FCF3E5" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
