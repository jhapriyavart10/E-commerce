import React from 'react';
import Image from 'next/image';
const PaymentMethods = () => {
  return (
    <div className="flex flex-col items-center text-center py-12 animate-in fade-in duration-500">
      <h2 className="text-3xl font-bold font-manrope text-[#280F0B] mb-2">No saved cards found.</h2>
      <p className="text-[#280F0B] mb-8">You don't have a credit card setup yet.</p>
      <button className="flex items-center justify-center gap-3 bg-[#7F3E2F] text-[#FCF3E5] px-10 py-4 rounded-sm font-medium tracking-widest hover:bg-[#6D3A2D] transition-colors uppercase text-sm w-full md:w-[349px]">
        <Image 
            src="/assets/images/card.svg" 
            alt="Card Icon"
            width={24} 
            height={24}
            className="w-5 h-5 brightness-0 invert" 
        />
        Add a Card
      </button>
    </div>
  );
};

export default PaymentMethods;