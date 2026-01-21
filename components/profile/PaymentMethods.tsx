'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AddCard from './AddCard';

const PaymentMethods = () => {
  const [showForm, setShowForm] = useState(false);
  const [cards, setCards] = useState<any[]>([]);

  // 1. Load cards from localStorage on mount and when form closes
  useEffect(() => {
    const saved = localStorage.getItem('user_cards');
    if (saved) setCards(JSON.parse(saved));
  }, [showForm]);

  const deleteCard = (id: number) => {
    const updated = cards.filter(card => card.id !== id);
    localStorage.setItem('user_cards', JSON.stringify(updated));
    setCards(updated);
  };

  // 2. Form View
  if (showForm) {
    return (
      <AddCard 
        onCancel={() => setShowForm(false)} 
        onSave={(newCard) => {
          const savedCards = JSON.parse(localStorage.getItem('user_cards') || '[]');
          const updated = [...savedCards, { ...newCard, id: Date.now() }];
          localStorage.setItem('user_cards', JSON.stringify(updated));
          setShowForm(false);
        }} 
      />
    );
  }

  return (
    <div className="w-full py-8 animate-in fade-in duration-500">
      {cards.length === 0 ? (
        /* 3. Empty State (Modified to be functional) */
        <div className="flex flex-col items-center text-center py-12">
          <h2 className="text-3xl font-bold font-manrope text-[#280F0B] mb-2">No saved cards found.</h2>
          <p className="text-[#280F0B] mb-8 opacity-70">You don't have a credit card setup yet.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-3 bg-[#7F3E2F] text-[#FCF3E5] px-10 py-4 rounded-sm font-medium tracking-widest hover:bg-[#6D3A2D] transition-colors uppercase text-sm w-full md:w-[349px]"
          >
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
      ) : (
        <>
        <div className="flex justify-between items-center mb-8 border-b border-[#280F0B1A] pb-4">
          <h2 className="text-3xl font-bold font-manrope text-[#280F0B]">Payment Methods</h2>
          <button 
            onClick={() => setShowForm(true)}
            className="text-sm font-bold text-[#7F3E2F] uppercase tracking-widest hover:underline"
          >
            + Add New Card
          </button>
        </div>
        {/* 4. Card List View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((card) => (
            <div key={card.id} className="border border-[#280F0B1A] p-6 rounded-sm bg-white/50 relative group flex flex-col justify-between min-h-[160px]">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                   <div className="bg-[#280F0B] p-2 rounded-sm">
                      <Image src="/assets/images/card.svg" alt="Card" width={20} height={20} className="brightness-0 invert" />
                   </div>
                   <span className="text-xs font-bold uppercase tracking-widest text-[#280F0B]">
                     •••• {card.cardNumber.slice(-4)}
                   </span>
                </div>
                <button 
                  onClick={() => deleteCard(card.id)}
                  className="text-[10px] text-red-600 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
              
              <div className="mt-4">
                <p className="text-[10px] uppercase font-bold text-[#280F0B80] tracking-tighter">Expires</p>
                <p className="text-sm font-bold text-[#280F0B]">{card.expiry}</p>
              </div>

              <div className="absolute bottom-6 right-6 opacity-10">
                 <Image src="/assets/images/Logo(REC).svg" alt="Logo" width={60} height={20} />
              </div>
            </div>
          ))}
        </div>
        </>
      )}
    </div>
  );
};

export default PaymentMethods;