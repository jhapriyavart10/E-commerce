'use client';

import { useState } from 'react';
import Image from 'next/image';
import ChatBotContent from '@/components/ChatBotContent';;

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // Function to handle closing and resetting state
  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
  };

  return (
    <div 
      className={`fixed z-50 flex flex-col items-end gap-4 transition-all duration-300 
        ${isMaximized 
          ? 'inset-0 p-6 bg-black/20 backdrop-blur-sm justify-center items-center' 
          : 'bottom-6 right-6'
        }`}
    >
      {/* Chatbot Window Container */}
      {isOpen && (
        <div 
          className={`shadow-2xl rounded-[24px] overflow-hidden animate-in slide-in-from-bottom-5 transition-all duration-300 bg-[#280F0B]
            ${isMaximized 
              ? 'w-full max-w-[1200px] h-full' 
              : 'w-[375px] h-[600px]'
            }`}
        >
          <ChatBotContent 
            onClose={handleClose} 
            onToggleExpand={() => setIsMaximized(!isMaximized)}
            isMaximized={isMaximized}
          />
        </div>
      )}

      {/* Floating Toggle Button */}
      {/* Hidden when maximized to match Figma standard patterns, or kept for accessibility */}
      {!isMaximized && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-lg rounded-full cursor-pointer z-50 shrink-0"
        >
          {/* Background Circle */}
          <Image
            src="/assets/images/circle.svg"
            alt="toggle background"
            fill
            className="object-contain"
          />
          {/* Swapping Icons */}
          <div className="relative w-7 h-7">
            <Image
              src={isOpen ? "/assets/images/dropdown.svg" : "/assets/images/chat.svg"}
              alt="chat status icon"
              fill
              className="object-contain"
            />
          </div>
        </button>
      )}
    </div>
  );
}