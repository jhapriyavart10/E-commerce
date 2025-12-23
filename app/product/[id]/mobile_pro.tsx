'use client';

import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

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

export default function MobileProductPage() {
  const [selectedImage, setSelectedImage] = useState(jewelleryImages[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0].name);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <>
      <Header />

      <main className="bg-[#F6D8AB] text-[#280F0B] font-manrope min-h-screen">
        {/* SECTION 1 – PRODUCT */}
        <section className="px-6 py-6 md:px-16 md:py-12 max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <p className="text-[12px] md:text-[14px] opacity-70 mb-3">
            <strong className="font-bold">Shop</strong> / Pendants / Tiger Eye Pendant
          </p>

          {/* Main Image - Large enough for tablets */}
          <div className="w-full aspect-square bg-[#F2EFEA] mb-3 max-w-[600px] mx-auto">
            <Image
              src={selectedImage}
              alt="Product"
              width={600}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-6 gap-2 w-full mb-6 max-w-[600px] mx-auto">
            {jewelleryImages.map((img) => (
              <div
                key={img}
                onClick={() => setSelectedImage(img)}
                className={`aspect-square cursor-pointer transition-all ${
                  selectedImage === img ? 'border-2 border-[#280F0B]' : 'border border-[#280F0B]/30'
                }`}
              >
                <Image
                  src={img}
                  alt="Thumbnail"
                  width={100}
                  height={100}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Text Content Wrapper for centering on larger tablets */}
          <div className="max-w-[600px] mx-auto">
            {/* Title */}
            <h1 className="text-2xl md:text-4xl font-semibold mb-2">
              Sphere Crystal Pendulums
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[#F5B301]">★ ★ ★ ★ ★</span>
              <button
                onClick={() => document.getElementById('reviews-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[12px] md:text-[14px] bg-transparent border-none p-0 cursor-pointer text-[#280F0B]"
              >
                [7 reviews]
              </button>
            </div>

            {/* Description */}
            <p className="text-[14px] md:text-[16px] leading-[22px] md:leading-[26px] mb-3">
              Harness Universal Energy with a Sphere Crystal Pendulum. The sphere
              represents wholeness, unity, and the infinite flow of universal energy.
            </p>

            {/* Learn more */}
            <button
              onClick={() => {
                setOpenAccordion('Description');
                setTimeout(() => {
                  document.getElementById('description-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
              }}
              className="text-[12px] font-bold uppercase underline text-[#7F3E2F] mb-4 bg-transparent border-none p-0 cursor-pointer"
            >
              Learn more
            </button>

            {/* Price */}
            <div className="text-xl md:text-2xl font-semibold mb-4">
              $35.00 AUD <span className="text-[12px] font-normal">incl. tax</span>
            </div>

            {/* Jewellery Material */}
            <div className="border border-[#280F0B] p-3 md:p-6 mb-4">
              <p className="text-[14px] font-medium mb-3">Jewellery Material</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {materialOptions.map((option) => (
                  <button
                    key={option.name}
                    onClick={() => setSelectedMaterial(option.name)}
                    className={`w-full h-11 flex items-center justify-center gap-2 rounded-full border transition-colors text-[14px] ${
                      selectedMaterial === option.name 
                        ? 'bg-[#6C6AE4] border-[#6C6AE4] text-white' 
                        : 'bg-transparent border-[#280F0B] text-[#280F0B]'
                    }`}
                  >
                    <Image src={option.img} alt={option.name} width={20} height={20} />
                    {option.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center h-[35px] w-[120px] border-t border-l border-r border-[#280F0B]/40">
                  <button className="flex-1" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val) && val >= 1) setQuantity(val);
                    }}
                    className="w-12 text-center border-none outline-none font-manrope text-[14px] bg-transparent p-0"
                  />
                  <button className="flex-1" onClick={() => setQuantity((q) => q + 1)}>+</button>
                </div>

                <button className="w-full h-12 bg-[#7A3E2E] text-white font-semibold uppercase hover:opacity-90 transition-opacity">
                  Add to cart
                </button>

                <button className="w-full h-12 bg-[#4A2CF0] text-white hover:opacity-90 transition-opacity">
                  Buy with <strong className="font-bold">Shop</strong>
                </button>
            </div>

            {/* Delivery Info */}
            <div className="flex gap-2 text-[14px] mt-4">
              <Image src="/assets/images/truck.jpeg" alt="Truck" width={40} height={40} className="object-contain" />
              <span>Orders are fulfilled within 24 hours. 3–5 business days delivery average.</span>
            </div>

            {/* Accordion */}
            <div className="mt-8">
              {['Description', 'How to use', 'Product Details', 'Ideal for'].map((title) => {
                const isOpen = openAccordion === title;
                return (
                  <div key={title} id={title === 'Description' ? 'description-section' : undefined} className="border-b border-[#280F0B]/40 py-[14px]">
                    <button
                      onClick={() => setOpenAccordion(isOpen ? null : title)}
                      className="w-full flex justify-between items-center bg-transparent border-none p-0 cursor-pointer font-manrope text-[16px] font-medium text-[#280F0B]"
                    >
                      <span>{title}</span>
                      <span className={`text-xl transition-transform duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>+</span>
                    </button>
                    {isOpen && (
                      <p className="mt-3 text-[14px] leading-[22px] text-[#280F0B] opacity-80 animate-fadeIn">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION 2 – EMBRACE SPIRITUALITY */}
        <section className="w-full bg-gradient-to-b from-[#2A0F0A] to-[#1A0705]">
          <div className="w-full h-[35px] bg-[#C38154]" />
          <div className="px-6 py-8 md:px-24 md:py-20 max-w-6xl mx-auto">
            <h2 className="font-lora italic font-bold text-[48px] md:text-[72px] leading-none tracking-tight text-[#F6D8AB] mb-[150px] md:mb-[200px]">
              Embrace<br />Spirituality.
            </h2>
            <p className="font-manrope font-medium text-[14px] md:text-[18px] leading-relaxed text-[#F6D8AB] opacity-95 max-w-2xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum in libero facilisis interdum. Integer sit amet sapien non nulla luctus elementum.
            </p>
          </div>
        </section>

        {/* SECTION 3 – CUSTOMER REVIEWS */}
        <section id="reviews-section" className="bg-[#F6D8AB] text-[#280F0B]">
          <div className="py-12 px-5 md:px-16 lg:px-24 max-w-6xl mx-auto">
            <h2 className="font-manrope font-bold text-[28px] md:text-[40px] leading-none tracking-tight mb-4">
              Customer Reviews
            </h2>

            <div className="flex items-center gap-4 mb-8">
              <div className="font-inter font-bold text-[48px] md:text-[64px] leading-none">4.8</div>
              <div>
                <div className="text-[#F5B301] text-lg md:text-xl">★ ★ ★ ★ ★</div>
                <p className="text-[12px] opacity-70">Based on 7 Ratings</p>
              </div>
            </div>

            {/* Rating Bars - Made wider on tablets */}
            <div className="mt-6 max-w-md">
              {[
                { star: 5, percent: 90 },
                { star: 4, percent: 10 },
                { star: 3, percent: 0 },
                { star: 2, percent: 0 },
                { star: 1, percent: 0 },
              ].map((item) => (
                <div key={item.star} className="flex items-center gap-3 mb-2">
                  <span className="w-8 flex items-center gap-1 text-[14px] text-[#464646]">
                    <span className="text-[#F5B301]">★</span>{item.star}
                  </span>
                  <div className="flex-1 h-2 bg-[#5A4A1A] rounded-full overflow-hidden">
                    <div className="h-full bg-[#F5B301]" style={{ width: `${item.percent}%` }} />
                  </div>
                  <span className="w-9 text-[12px]">{item.percent}%</span>
                </div>
              ))}
            </div>

            <button className="w-full md:w-auto md:px-12 h-[51px] bg-[#7A3E2E] flex items-center justify-center gap-3 mt-6 border-none hover:opacity-90 transition-all">
              <img src="/assets/images/write.svg" alt="write" />
              <span className="font-manrope font-semibold text-[14px] tracking-widest uppercase text-white">
                Write a review
              </span>
            </button>

            {/* Top Reviews */}
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl font-semibold mb-4 underline underline-offset-[6px]">
                Top reviews
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#E7C69A] text-[14px]">
                  <img src="/assets/images/search-icon.png" alt="search" />
                  <span>Search</span>
                </div>
                {['Most relevant', 'All ratings', 'With media'].map((label) => (
                  <div key={label} className="flex items-center justify-center gap-2 p-3 rounded-full bg-[#E7C69A] text-[14px]">
                    <span>{label}</span>
                    <img src="/assets/images/dropdown.svg" alt="dropdown" />
                  </div>
                ))}
              </div>

              <div className="bg-[#FDC77B] p-5 md:p-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold md:text-lg">Raman S.</span>
                  <img src="/assets/images/verified.png" alt="verified" className="w-4 h-4" />
                  <span className="text-[14px]">Verified Buyer</span>
                </div>
                <p className="text-[12px] opacity-70 mb-3">18 days ago</p>
                <p className="text-[14px] md:text-[16px] leading-relaxed">
                  I bought the black Ball Crystal Pendulum for my wife and she says it has a steady, smooth swing...
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}