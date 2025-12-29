// components/OrdersContent.tsx
import React from 'react';
import Image from 'next/image';
const OrdersContent = () => {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Box Icon Placeholder - You can replace with an actual SVG/Image */}
      <div className="relative w-48 h-48 mb-4">
        <Image 
            src="/assets/images/no_order.svg" 
            alt="No orders found"
            width={192} 
            height={192}
            className="object-contain"
            priority
        />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-[#280F0B] mb-6">
        You don't have any orders yet.
      </h2>

      <button className="group flex items-center gap-2 bg-[#7F3E2F] text-[#FCF3E5] px-8 py-3 rounded-sm font-medium tracking-widest hover:bg-[#6D3A2D] transition-colors uppercase text-sm">
        Start Shopping
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </button>
    </div>
  );
};

export default OrdersContent;