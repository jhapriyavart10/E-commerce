'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface GiftTriggerProps {
  onOpen: () => void;
}

export default function GiftTrigger({ onOpen }: GiftTriggerProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="fixed bottom-6 left-6 z-[90] cursor-pointer flex items-center overflow-hidden shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      initial={false}
      animate={{
        width: isHovered ? '178px' : '56px', // Animates width from circle to pill
        backgroundColor: '#7F3E2F', // Deep reddish-brown/rust fill
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        height: '56px',
        borderRadius: '28px', // Maintains the rounded pill edges
      }}
    >
      {/* Icon Section (Fixed Width) */}
      <div className="relative min-w-[56px] h-[56px] flex items-center justify-center">
        {/* Gift Icon Asset in Center */}
        <div className="relative z-10 w-6 h-6">
          <Image 
            src="/assets/images/gift.svg" 
            alt="gift icon" 
            fill 
            className="object-contain"
          />
        </div>
      </div>

      {/* Text Label Section - Only visible when stretched */}
      <div className="flex items-center pr-3 overflow-hidden">
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="font-manrope text-white text-[16px] font-medium whitespace-nowrap"
          style={{ letterSpacing: '-0.005em' }}
        >
          Grab 20% Off
        </motion.span>
      </div>
    </motion.div>
  );
}