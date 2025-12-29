'use client';

import React, { useState } from 'react';
import Header from '@/components/Header'; // Imported Header
import { AccountSection, SECTIONS } from '@/types/account';
import OrdersContent from '@/components/profile/OrdersContent';
import AccountDetails from '@/components/profile/AccountDetails';
import Addresses from '@/components/profile/Addresses';
import PaymentMethods from '@/components/profile/PaymentMethods';
import Subscriptions from '@/components/profile/Subscriptions';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<AccountSection>('orders');

  // Helper to render the correct component based on activeTab
  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <div className="flex justify-center pt-4 md:pt-12"><OrdersContent /></div>;
      case 'details':
        return <AccountDetails />;
      case 'addresses':
        return <Addresses />;
      case 'payments':
        return <PaymentMethods />;
      case 'subscriptions':
        return <Subscriptions />;
      default:
        return <OrdersContent />;
    }
  };

  return (
    <>
      <Header />

      {/* 2. Main Page Content */}
      <div className="min-h-screen bg-[#F6D8AB] px-6 py-12 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-lora text-[#280F0B] mb-12 md:mb-16">
            Account
          </h1>

          <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
            {/* Sidebar Navigation */}
            <nav className="flex flex-col gap-6 min-w-[200px] border-b border-[#3D1F16]/10 pb-8 md:border-none md:pb-0">
            {SECTIONS.map((section) => (
                <button
                key={section.id}
                onClick={() => setActiveTab(section.id as AccountSection)}
                className={`text-left text-xl transition-all duration-300 ease-out ${
                    activeTab === section.id
                    ? 'text-[#280F0B] font-semibold scale-105 origin-left' // Removed translate-x, added scale
                    : 'text-[#280F0B]/40 hover:text-[#280F0B]/70 hover:scale-105 origin-left'
                }`}
                >
                {section.label}
                </button>
            ))}
            </nav>

            {/* Dynamic Content Area */}
            <main className="flex-1 min-h-[400px]">
              {renderContent()}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}