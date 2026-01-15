'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import AddAddressForm from './AddAddressForm';

const Addresses = () => {
  const [showForm, setShowForm] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);

  // Load addresses on mount
  useEffect(() => {
    const saved = localStorage.getItem('user_addresses');
    if (saved) setAddresses(JSON.parse(saved));
  }, [showForm]); // Refresh list when form closes

  const deleteAddress = (id: number) => {
    const updated = addresses.filter(addr => addr.id !== id);
    localStorage.setItem('user_addresses', JSON.stringify(updated));
    setAddresses(updated);
  };

  if (showForm) {
    return <AddAddressForm onCancel={() => setShowForm(false)} onSave={() => setShowForm(false)} />;
  }

  return (
    <div className="w-full py-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold font-manrope text-[#280F0B]">My Addresses</h2>
        {addresses.length > 0 && (
          <button 
            onClick={() => setShowForm(true)}
            className="text-sm font-bold text-[#7F3E2F] uppercase tracking-widest hover:underline"
          >
            + Add New
          </button>
        )}
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center text-center py-12">
          <p className="text-[#280F0B] mb-8 opacity-70">You have not set up an address yet.</p>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-3 bg-[#7F3E2F] text-[#FCF3E5] px-10 py-4 rounded-sm font-medium tracking-widest uppercase text-sm w-full md:w-[349px]"
          >
            <Image src="/assets/images/home.svg" alt="Home" width={20} height={20} className="brightness-0 invert" />
            Add an Address
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="border border-[#280F0B1A] p-6 rounded-sm bg-white/50 relative group">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold uppercase tracking-tighter bg-[#7F3E2F1A] text-[#7F3E2F] px-2 py-1">
                  Saved Address
                </span>
                <button 
                  onClick={() => deleteAddress(addr.id)}
                  className="text-xs text-red-600 font-bold uppercase opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Delete
                </button>
              </div>
              <p className="font-bold text-[#280F0B] text-lg">{addr.firstName} {addr.lastName}</p>
              <p className="text-[#280F0B] opacity-80 mt-1">{addr.address1}</p>
              {addr.address2 && <p className="text-[#280F0B] opacity-80">{addr.address2}</p>}
              <p className="text-[#280F0B] opacity-80">{addr.city}, {addr.state} {addr.pincode}</p>
              <p className="text-[#280F0B] opacity-80 mt-2 text-sm">{addr.phone}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;