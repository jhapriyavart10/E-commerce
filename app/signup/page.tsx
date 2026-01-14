'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('Email Address'),
          username: formData.get('Username'),
          firstName: formData.get('First Name'),
          lastName: formData.get('Last Name'),
          // Ensure your backend handles a default or provided password
          password: "TemporaryPassword123!", 
        }),
      });

      if (res.ok) {
        window.location.href = '/signin';
      } else {
        const data = await res.json();
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col md:flex-row bg-[#F6D8AB] min-h-[calc(100vh-80px)] overflow-hidden">
        
        {/* Left Section: Details (Animate in from left) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex items-center justify-start py-8 md:py-16 pl-6 lg:pl-[72px]"
        >
          <div className="w-full">
            {/* Header Text */}
            <div className="mb-10">
              <h1 className="font-lora text-4xl md:text-5xl text-[#280F0B] font-medium mb-4">
                Register with us.
              </h1>
              <p className="font-manrope text-[#280F0B]/60 text-base font-medium lg:whitespace-nowrap">
                Start adding your account details. It will be used for login and billing purposes.
              </p>
              {error && <p className="text-red-600 mt-2 font-manrope text-sm">{error}</p>}
            </div>

            {/* Form */}
            <form className="mt-8 space-y-8" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 lg:gap-x-12">
                {[
                  { label: "Username", type: "text" },
                  { label: "Email Address", type: "email" },
                  { label: "First Name", type: "text" },
                  { label: "Last Name", type: "text" },
                ].map((field, index) => (
                  <div key={field.label} className="relative group lg:w-[355px]">
                    <input
                      required
                      name={field.label}
                      type={field.type}
                      placeholder={field.label}
                      className="w-full lg:w-[355px] py-2 bg-transparent font-manrope outline-none placeholder:text-[#280F0B]/40 text-[#280F0B] text-[16px]"
                    />
                    {/* Animated Underline tracing from left to right */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: 0.6 + index * 0.1, 
                        ease: "easeInOut" 
                      }}
                      style={{ originX: 0 }} 
                      className="absolute bottom-0 left-0 w-full lg:w-[355px] h-[1px] bg-[#280F0B]/30 group-focus-within:bg-[#280F0B] group-focus-within:h-[1.5px] transition-all"
                    />
                  </div>
                ))}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 group cursor-pointer w-fit mt-10">
                <input
                  required
                  type="checkbox"
                  id="terms"
                  className="appearance-none mt-1 min-w-[16px] h-4 border border-[#280F0B]/50 bg-transparent rounded-sm checked:bg-[#280F0B] checked:border-transparent cursor-pointer transition-all relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45"
                />
                <label htmlFor="terms" className="font-manrope text-sm text-[#280F0B]/70 cursor-pointer leading-tight">
                  I declare that I have read the terms & conditions.
                </label>
              </div>

              {/* Register Button */}
              <button
                disabled={loading}
                type="submit"
                className="w-full lg:w-[355px] py-3 mt-4 border border-[#280F0B] text-[#280F0B] font-manrope font-semibold uppercase tracking-widest text-sm hover:bg-[#280F0B] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'REGISTERING...' : 'REGISTER'}
              </button>
            </form>

            <div className="mt-6 text-left">
              <p className="font-manrope text-sm text-[#280F0B]/60">
                Already have an account? <Link href="/signin" className="underline hover:text-[#280F0B] font-medium">Login</Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Section: Mandala Logo (Animate in from bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 flex items-center justify-center p-8 relative bg-[#F6D8AB]"
        >
          <div className="relative w-full max-w-[450px] aspect-square">
            <Image 
              src="/assets/images/Reg_logo.svg" 
              alt="Mandala Illustration" 
              fill 
              className="object-contain"
            />
          </div>
        </motion.div>

      </div>
    </>
  );
}