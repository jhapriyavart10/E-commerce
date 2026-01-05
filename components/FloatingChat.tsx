'use client';
import { useState } from 'react';
import Image from 'next/image';
import ChatBotContent from '@/components/ChatBotContent';

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsMaximized(false);
  };

  return (
    <div 
      className={`fixed z-[100] flex flex-col items-end gap-4 transition-all duration-500 
        ${isMaximized 
          ? 'inset-0 p-6 bg-black/40 backdrop-blur-sm justify-center items-center' 
          : 'bottom-6 right-6'
        }`}
    >
      {/* Chatbot Window Container */}
      {isOpen && (
        <div 
          className={`shadow-2xl rounded-[24px] overflow-hidden bg-[#280F0B] origin-bottom-right transition-all duration-300 ease-out
            ${isMaximized 
              ? 'w-full max-w-[1200px] h-full' 
              : 'w-[375px] h-[600px] animate-in fade-in zoom-in-95 slide-in-from-bottom-10'
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
      {!isMaximized && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg rounded-full cursor-pointer z-[100] shrink-0
            ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        >
          <Image
            src="/assets/images/circle.svg"
            alt="toggle background"
            fill
            className="object-contain"
          />
          <div className="relative w-7 h-7">
            <Image
              src={isOpen ? "/assets/images/drop.svg" : "/assets/images/chat.svg"}
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