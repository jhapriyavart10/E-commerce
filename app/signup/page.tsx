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
  const handleGoogleSignUp = () => {
    setLoading(true);
    
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    
    const options = {
      // Uses the NEXT_PUBLIC prefixed variables from your .env
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI || '',
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      prompt: 'select_account',
      access_type: 'offline',
    };

    const queryString = new URLSearchParams(options).toString();
    window.location.href = `${rootUrl}?${queryString}`;
  };

  return (
    <>
      <Header />
      <div className="flex flex-col-reverse md:flex-row bg-[#F6D8AB] min-h-[calc(100vh-80px)] w-full overflow-x-hidden">
        
        {/* Left Section: Form details */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-3/5 lg:w-1/2 flex items-center justify-center md:justify-start py-10 md:py-16 px-6 sm:px-12 lg:pl-[72px]"
        >
          <div className="w-full max-w-2xl">
            {/* Header Text */}
            <div className="mb-10 text-left">
              <h1 className="font-lora text-3xl sm:text-4xl md:text-5xl text-[#280F0B] font-medium mb-4">
                Register with us.
              </h1>
              <p className="font-manrope text-[#280F0B]/60 text-sm sm:text-base font-medium max-w-prose">
                Start adding your account details. It will be used for login and billing purposes.
              </p>
              {error && <p className="text-red-600 mt-2 font-manrope text-sm">{error}</p>}
            </div>

            {/* Form */}
            <form className="space-y-8" onSubmit={handleRegister}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-4 lg:gap-x-[16px]">
                {[
                  { label: "Username", type: "text" },
                  { label: "Email Address", type: "email" },
                  { label: "First Name", type: "text" },
                  { label: "Last Name", type: "text" },
                ].map((field) => (
                  <div key={field.label} className="relative group w-full">
                    <input
                      required
                      name={field.label}
                      type={field.type}
                      placeholder={field.label}
                      className="peer w-full py-2 bg-transparent font-manrope outline-none placeholder:text-[#280F0B]/40 text-[#280F0B] text-base"
                    />
                    <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#280F0B]/30" />
                    <span
                      className="absolute left-0 bottom-0 h-[1.5px] w-full bg-[#280F0B]/30
                                scale-x-0 origin-left transition-transform duration-300
                                peer-focus:scale-x-100 peer-focus:bg-[#280F0B]"
                    />
                  </div>
                ))}
              </div>
              {/* Terms Checkbox */}
              <div className="flex items-start gap-3 group cursor-pointer w-full mt-10">
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

              {/* Register Button: Spans full width of the grid */}
              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 mt-4 border border-[#280F0B] text-[#280F0B] font-manrope font-semibold uppercase tracking-widest text-sm hover:bg-[#280F0B] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                {loading ? 'REGISTERING...' : 'REGISTER'}
              </button>
              <div className="relative flex items-center py-5">
                <div className="flex-grow border-t border-[#280F0B]/20"></div>
                <span className="flex-shrink mx-4 text-[#280F0B]/40 text-sm">OR</span>
                <div className="flex-grow border-t border-[#280F0B]/20"></div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full py-3 flex items-center justify-center gap-3 border border-[#280F0B] text-[#280F0B] font-manrope font-semibold hover:bg-[#280F0B] hover:text-white transition-all duration-300 disabled:opacity-50"
              >
                <Image src="/assets/images/google-icon.png" alt="Google" width={40} height={60} />
                CONTINUE WITH GOOGLE
              </button>
            </form>

            <div className="mt-6 text-left">
              <p className="font-manrope text-sm text-[#280F0B]/60">
                Already have an account? <Link href="/signin" className="underline hover:text-[#280F0B] font-medium">Login</Link>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Section: Illustration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-2/5 lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16 bg-[#F6D8AB]"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[450px] aspect-square">
            <Image 
              src="/assets/images/Reg_logo.svg" 
              alt="Mandala Illustration" 
              fill 
              className="object-contain"
              priority
            />
          </div>
        </motion.div>

      </div>
    </>
  );
}