'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

export default function SignInPage() {
  const [activeChakra, setActiveChakra] = useState(1);
  const [loading, setLoading] = useState(false);

  // Chakra Loop Animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChakra((prev) => (prev === 7 ? 1 : prev + 1));
    }, 800);
    return () => clearInterval(interval);
  }, []);

  // Login Handler (Moved inside the component)
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: formData.get('email'), // matches name="email"
          password: formData.get('password'), // matches name="password"
        }),
      });

      if (res.ok) {
        window.location.href = '/account'; 
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="flex-grow flex flex-col md:flex-row bg-[#F6D8AB] min-h-[calc(100vh-80px)]">
        {/* Left Visual Illustration Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative min-h-[400px]">
          <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
            <div className="absolute inset-0">
              <Image 
                src="/assets/images/body.svg" 
                alt="Meditation Pose" 
                fill 
                className="object-contain opacity-80"
              />
            </div>
            <div className="relative z-10 flex flex-col items-center justify-between h-[60%] gap-2">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div key={num} className="w-8 h-8 relative">
                  <div 
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      activeChakra === num ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <Image 
                      src={`/assets/images/chakra${num}.svg`} 
                      alt={`Chakra ${num}`} 
                      fill 
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <div>
              <h1 className="font-lora text-4xl md:text-5xl text-[#280F0B] font-medium mb-2">
                Welcome back!
              </h1>
              <p className="font-manrope text-[#280F0B]/60 text-base font-medium mb-4">
                Enter login details to go ahead.
              </p>
            </div>

            {/* Form with handleLogin integrated */}
            <form className="mt-0" onSubmit={handleLogin}>
              <div className="space-y-6">
                {/* Username/Email Input */}
                <div className="relative border-b border-[#280F0B]/30 focus-within:border-[#280F0B] transition-colors">
                  <input
                    required
                    name="email"
                    type="text"
                    placeholder="Username or Email"
                    className="w-full py-3 bg-transparent font-manrope outline-none placeholder:text-[#280F0B]/40 text-[#280F0B]"
                  />
                </div>

                {/* Password Input */}
                <div className="relative border-b border-[#280F0B]/30 focus-within:border-[#280F0B] transition-colors">
                  <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full py-3 bg-transparent font-manrope outline-none placeholder:text-[#280F0B]/40 text-[#280F0B]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 group cursor-pointer w-fit mt-8">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  className="appearance-none w-4 h-4 border border-[#280F0B]/50 bg-transparent rounded-sm checked:bg-[#280F0B] checked:border-transparent cursor-pointer transition-all relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45"
                />
                <label htmlFor="remember" className="font-manrope text-sm text-[#280F0B]/70 cursor-pointer">
                  Remember me
                </label>
              </div>

              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 mt-10 border border-[#280F0B] text-[#280F0B] font-manrope font-semibold uppercase tracking-widest text-sm hover:bg-[#280F0B] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="pt-4 text-center">
              <p className="font-manrope text-sm text-[#3D1A1A]/50">
                Don't have an account? <Link href="/signup" className="underline hover:text-[#3D1A1A]">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}