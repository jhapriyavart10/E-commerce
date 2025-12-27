'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import { useCart } from '@/app/context/CartContext';

const jewelleryImages = [
  '/assets/images/jewellery1.png',
  '/assets/images/jewellery2.png',
  '/assets/images/jewellery3.png',
  '/assets/images/jewellery4.png',
  '/assets/images/jewellery5.png',
  '/assets/images/jewellery6.png',
];

const materialOptions = [
  { name: 'Obsidian', img: '/assets/images/obsidian.png' },
  { name: 'Tiger Eye', img: '/assets/images/tiger eye.png' },
  { name: 'Lapis Lazuli', img: '/assets/images/Lapis Lazuli.svg' },
  { name: 'Rose Quartz', img: '/assets/images/rose quartz.png' },
  { name: 'Clear Quartz', img: '/assets/images/clear quartz.png' },
  { name: 'Green Aventurine', img: '/assets/images/green adventurine.png' },
];

export default function UnifiedProductPage({ product }: { product: any }) {
  const jewelleryImages = product.images && product.images.length > 0 
    ? product.images 
    : ['/assets/images/necklace-img.png'];
  const [selectedImage, setSelectedImage] = useState(product.image || jewelleryImages[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0].name);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // Review labels ordered specifically for the 2-column mobile grid
  // Index 0 & 2 will be Col 1 (Search, All ratings)
  // Index 1 & 3 will be Col 2 (Most relevant, With media)
  const reviewFilters = [
    { label: 'Search reviews', isSearch: true },
    { label: 'Most relevant', isSearch: false },
    { label: 'All ratings', isSearch: false },
    { label: 'With media', isSearch: false },
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen">
        
        {/* SECTION 1 – PRODUCT INFO */}
        <section className="px-6 pt-6 lg:pt-12 lg:px-12 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
            
            {/* LEFT COLUMN: Image Gallery */}
            <div className="w-full">
              <p className="text-[12px] lg:text-sm mb-3 lg:mb-4 opacity-70">
                <strong className="font-bold">Shop</strong> / Pendants / Tiger Eye Pendant
              </p>
              <div className="relative aspect-square w-full bg-[#F2EFEA] mb-3 lg:max-w-[820px]">
                <Image src={selectedImage} alt="Product" fill className="object-cover" priority />
              </div>
              <div className="grid grid-cols-6 gap-2 w-full lg:max-w-[820px]">
                {jewelleryImages.map((img: string, index: number) => (
                  <div 
                    key={index} 
                    onClick={() => setSelectedImage(img)} 
                    className={`aspect-square cursor-pointer transition-all ${selectedImage === img ? 'border-2 border-[#280F0B]' : 'border border-[#280F0B]/30'}`}
                  >
                    <Image src={img} alt={`Thumbnail ${index}`} width={100} height={100} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Details */}
            <div className="flex flex-col justify-start">
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-semibold mb-2 lg:mb-3 lg:mt-8">{product.title}</h1>
              <div className="flex items-center gap-2 mb-3 lg:mb-4">
                <span className="text-[#F5B301] text-lg lg:text-2xl">★ ★ ★ ★ ★</span>
                <button onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-[12px] lg:text-sm cursor-pointer bg-transparent border-none p-0">[7 reviews]</button>
              </div>

              <p className="text-[14px] lg:text-[16px] leading-[1.6] opacity-90 mb-3">Harness Universal Energy with a Sphere Crystal Pendulum. The sphere represents wholeness, unity, and the infinite flow of universal energy.</p>

              <button onClick={() => { setOpenAccordion('Description'); setTimeout(() => descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50); }} className="uppercase underline text-[12px] font-bold text-[#7F3E2F] mb-4 text-left bg-transparent border-none p-0">Learn more</button>

              <div className="text-xl lg:text-2xl font-semibold mb-4 lg:mb-6">${product.price.toFixed(2)} AUD <span className="text-sm font-normal opacity-70">incl. tax</span></div>

              {/* JEWELLERY MATERIAL: STACKED ON MOBILE/TAB, 3-PER-ROW WITH UNIFORM SPACING ON DESKTOP */}
              <div className="border-[1.25px] border-[#280F0B] p-3 lg:p-6 mb-4 lg:mb-6">

                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm font-semibold uppercase tracking-tight">Jewellery Material</p>
                  
                  {/* Book Icon - Hidden on mobile, visible on desktop */}
                  <div className="hidden lg:block">
                    <Image 
                      src="/assets/images/book.svg" 
                      alt="Material Guide" 
                      width={22} 
                      height={22} 
                      className="cursor-pointer"
                    />
                  </div>
                </div>
                   
                <div className="flex flex-col lg:flex-row lg:flex-wrap gap-2">
                  {materialOptions.map((option, index) => (
                    <div key={option.name} className="flex contents">
                      <button
                        onClick={() => setSelectedMaterial(option.name)}
                        className={`flex items-center gap-1 px-4 py-2 rounded-full border transition-all text-[13px] lg:text-[14px] justify-center lg:justify-start w-full lg:w-auto ${
                          selectedMaterial === option.name 
                            ? 'bg-[#6C6AE4] text-white border-[#6C6AE4]' 
                            : 'bg-transparent text-[#280F0B] border-[#280F0B]'
                        }`}
                      >
                        <Image 
                          src={option.img} 
                          alt={option.name} 
                          width={20} 
                          height={20} 
                          className={`object-contain ${selectedMaterial === option.name ? 'brightness-0 invert' : ''}`}
                        />
                        <span className="whitespace-nowrap font-normal">{option.name}</span>
                      </button>
                      
                      {/* Forces a new line after every 3rd item ONLY on desktop */}
                      {(index + 1) % 3 === 0 && <div className="hidden lg:block w-full h-0" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="w-full">
                <div className="flex items-center w-fit border-t border-l border-r border-[#280F0B]">
                  <button className="px-4 py-2" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                  <input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-12 text-center bg-transparent border-none outline-none font-manrope text-sm" />
                  <button className="px-4 py-2" onClick={() => setQuantity(q => q + 1)}>+</button>
                </div>
                <button 
                  onClick={() => addToCart({ ...product, variant: "Default", quantity })}
                  className="w-full bg-[#7A3E2E] text-white py-4 uppercase font-semibold tracking-wide mb-3"
                >
                  Add to cart
                </button>
                <button className="w-full bg-[#4A2CF0] text-white py-4 font-bold mb-3">Buy with SHOP</button>
              </div>

              <div className="flex items-start gap-3 mt-4 opacity-80 ">
                <Image src="/assets/images/truck.jpeg" alt="Truck" width={32} height={32} className="shrink-0" />
                <p className="text-[14px] lg:text-[15px] leading-snug">Orders are fulfilled within 24 hours. 3–5 business days delivery average.</p>
              </div>

              {/* Accordions */}
              <div className="mt-8">
                {['Description', 'How to use', 'Product Details', 'Ideal for'].map((title) => {
                  const isOpen = openAccordion === title;
                  return (
                    <div key={title} ref={title === 'Description' ? descriptionRef : null} className="border-b border-[#280F0B]/30 py-4">
                      <button onClick={() => setOpenAccordion(isOpen ? null : title)} className="w-full flex justify-between items-center text-left font-semibold text-[18px] lg:text-[18px] bg-transparent border-none p-0">
                        {title}
                        <span className={`text-xl transition-transform ${isOpen ? 'rotate-45' : ''}`}>+</span>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <p className="text-[14px] opacity-80 leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }}></p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 – EMBRACE SPIRITUALITY */}
        <section className="mt-16 bg-gradient-to-b from-[#2A0F0A] to-[#1A0705]">
          <div className="w-full h-[35px] bg-[#C38154]" />
          <div className="px-6 lg:px-12 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
            <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-[400px] lg:min-h-[560px] py-12 lg:py-0">
              <h2 className="font-lora italic font-bold text-[#F6D8AB] text-[48px] lg:text-[80px] xl:text-[96px] leading-none mb-[237px] lg:mb-0 lg:self-start lg:pt-24">Embrace<br />Spirituality.</h2>
              <p className="font-manrope text-[#F6D8AB] text-[14px] opacity-90 lg:max-w-[22rem] lg:justify-self-end lg:self-end lg:pb-16">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum in libero facilisis interdum. Integer sit amet sapien non nulla luctus elementum.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3 – REVIEWS */}
        <section id="reviews-section" className="py-16 px-6 lg:px-12 xl:px-24 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-[28px] lg:text-[40px] font-bold mb-6">Customer Reviews</h2>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-[48px] lg:text-[64px] font-bold">4.8</span>
                <div>
                  <div className="text-[#F5B301] text-lg">★ ★ ★ ★ ★</div>
                  <p className="text-sm opacity-70">Based on 7 Ratings</p>
                </div>
              </div>
              <div className="space-y-2 max-w-[820px]">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm min-w-[30px] flex items-center gap-1"><span className="text-[#F5B301]">★</span>{star}</span>
                    <div className="flex-1 h-2 bg-[#5A4A1A] rounded-full overflow-hidden">
                      <div className="h-full bg-[#F5B301]" style={{ width: star === 5 ? '90%' : star === 4 ? '10%' : '0%' }} />
                    </div>
                    <span className="text-xs w-8 text-right">{star === 5 ? '90%' : star === 4 ? '10%' : '0%'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full lg:max-w-[820px] lg:border lg:border-dashed border-[#280F0B] p-0 lg:p-12 flex flex-col items-center justify-center text-center">
              <h3 className="text-lg lg:text-xl font-semibold mb-2 hidden lg:block">Review this product</h3>
              <p className="text-sm opacity-80 mb-6 hidden lg:block">Share your feedback with other customers</p>
              <button className="w-full max-w-[820px] h-[51px] bg-[#7A3E2E] text-white uppercase font-semibold flex items-center justify-center gap-3 border-none">
                <img src="/assets/images/write.svg" alt="write" />
                Write a review
              </button>
            </div>
          </div>

          <div className="mt-16">
            <h3 className="text-xl font-semibold underline underline-offset-8 mb-8">Top reviews</h3>
            
            {/* REVIEW FILTERS: 2 COLS ON MOBILE (Search/All Ratings in Col 1), ROW ON DESKTOP */}
            <div className="grid grid-cols-2 lg:flex lg:flex-wrap gap-3 mb-8">
              {reviewFilters.map((f, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 px-4 py-2 bg-[#7F3E2F33] rounded-full text-sm lg:w-[177px] lg:h-[42px]">
                  {f.isSearch && <img src="/assets/images/search-icon.png" alt="search" className="w-4 h-4" />}
                  <span>{f.label}</span>
                  {!f.isSearch && <img src="/assets/images/dropdown.svg" alt="v" />}
                </div>
              ))}
            </div>

            {[1, 2].map(i => (
              <div key={i} className="bg-[#FDC77B] p-6 mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">Raman S.</span>
                  <img src="/assets/images/verified.png" alt="v" className="w-4 h-4" />
                  <span className="text-sm font-normal">Verified Buyer</span>
                </div>
                <p className="text-[12px] opacity-60 mb-3">18 days ago</p>
                <p className="text-sm leading-relaxed">I bought the black Ball Crystal Pendulum for my wife and she says it has a steady, smooth swing and feels very responsive...</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}