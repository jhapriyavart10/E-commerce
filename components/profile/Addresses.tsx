// components/profile/Addresses.tsx
import React from 'react';
import Image from 'next/image';
const Addresses = () => {
  return (
    <div className="flex flex-col items-center text-center py-12 animate-in fade-in duration-500">
      {/* Heading matching the design */}
      <h2 className="text-3xl font-bold font-manrope text-[#280F0B] mb-2">
        Billing Address
      </h2>
      
      <p className="text-[#280F0B] mb-8">
        You have not set up an address yet.
      </p>

      {/* Add Address Button with Home Icon */}
      <button className="flex items-center justify-center gap-3 bg-[#7F3E2F] text-[#FCF3E5] px-10 py-4 rounded-sm font-medium tracking-widest hover:bg-[#6D3A2D] transition-colors uppercase text-sm w-full md:w-[349px]">
        <Image 
            src="/assets/images/home.svg" 
            alt="Home Icon"
            width={24} 
            height={24}
            className="w-5 h-5 brightness-0 invert" // Ensures the SVG appears white/cream to match the text
        />
        Add an Address
      </button>
    </div>
  );
};

export default Addresses;