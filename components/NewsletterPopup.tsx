'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check } from 'lucide-react';
import Image from 'next/image';

const SPIRITUAL_FOCUS_OPTIONS = [
  "Inner Peace & Emotional Balance",
  "Energy Cleansing & Protection",
  "Spiritual Growth & Intuition",
  "Manifestation & Abundance",
  "Love, Self-Worth & Relationships",
  "Purpose, Clarity & Life Direction"
];

export default function ImmersiveNewsletter() {
  const [isVisible, setIsVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [warning, setWarning] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem('hasSeenNewsletter');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setIsVisible(true), 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    sessionStorage.setItem('hasSeenNewsletter', 'true');
  };

  const handleViewCode = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setWarning('Please enter your email address.');
      return;
    }
    if (!emailRegex.test(email)) {
      setWarning('Please enter a valid email address.');
      return;
    }
    setWarning('');
    setStep(3);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('WELCOME20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradientTextStyle = {
    background: 'linear-gradient(92.14deg, #FEFEFE 12.41%, #F6D8AB 105.08%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] flex items-center justify-center overflow-hidden bg-black"
        >
          {/* Background Layer - Preserved without changes */}
          <div className="absolute inset-0">
            <Image
              src="/assets/images/newsletter.avif"
              alt="Raw Earth Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Close Button */}
          <button 
            onClick={closePopup}
            className="absolute top-8 right-8 z-[110] w-10 h-10 flex items-center justify-center rounded-full bg-[#5D1F1F] text-white transition-transform hover:scale-110"
          >
            <X className="w-6 h-6" />
          </button>

          <div className={`relative z-[105] w-full flex flex-col items-center text-center ${step > 1 ? '-mt-12' : ''}`}>
            {/* Logo */}
            <div className="mb-6 w-[240px] h-[120px] relative">
              <Image 
                src="/assets/images/Logo(REC).svg" 
                alt="Logo" 
                fill
                style={{ filter: 'brightness(0) invert(1)' }} 
                className="object-contain" 
              />
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <h2 className="font-lora text-4xl md:text-5xl text-white mb-2 tracking-wider">Grab a 20% off.</h2>
                  <p className="font-manrope text-white/90 text-[16px] leading-[24px] mb-6 max-w-xs leading-relaxed">To claim it tell us your primary spiritual focus.</p>
                  <div className="flex flex-col gap-2 w-full items-center mb-4">
                    {SPIRITUAL_FOCUS_OPTIONS.map((option) => (
                      <button 
                        key={option} 
                        onClick={() => setStep(2)} 
                        style={{ width: '350px', height: '48px', borderWidth: '1.25px', letterSpacing: '-0.005em' }} 
                        className="flex items-center justify-center border-white/60 text-white font-manrope font-normal text-[16px] leading-[24px] transition-all hover:bg-white hover:text-black"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={closePopup} 
                    style={{ letterSpacing: '-0.005em' }} 
                    className="font-manrope font-normal text-[16px] leading-[24px] text-white/70 hover:text-white underline underline-offset-4"
                  >
                    I don’t want a discount
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                  <h2 
                    style={{ fontSize: '48px', lineHeight: '100%', fontWeight: 500, letterSpacing: '0px' }} 
                    className="font-lora mb-2 tracking-normal"
                  >
                    <span className="text-white">Reveal </span>
                    <span style={gradientTextStyle}>your code!</span>
                  </h2>
                  <p className="font-manrope text-white/90 text-[16px] leading-[24px] mb-8">Enter your email address & get the code.</p>
                  <div className="flex flex-col gap-2 w-[350px] items-center">
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => { setEmail(e.target.value); setWarning(''); }} 
                      placeholder="Your email address" 
                      className="w-full h-[48px] bg-[#280F0B] text-white px-6 focus:outline-none font-manrope text-[16px] leading-[24px]" 
                    />
                    <div className="h-4">
                      {warning && <p className="text-red-400 text-xs font-manrope">{warning}</p>}
                    </div>
                    <button 
                      onClick={handleViewCode} 
                      style={{ borderWidth: '1.25px', letterSpacing: '-0.005em' }} 
                      className="w-full h-[48px] border-white text-white font-manrope font-normal text-[16px] leading-[24px] hover:bg-white hover:text-black transition-all"
                    >
                      View code →
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center">
                  <h2 
                    style={{ fontSize: '48px', lineHeight: '100%', fontWeight: 500, letterSpacing: '0px' }} 
                    className="font-lora mb-2 tracking-normal"
                  >
                    <span style={gradientTextStyle}>Here's your code!</span>
                  </h2>
                  <p 
                    style={{ letterSpacing: '-0.005em' }}
                    className="font-manrope text-white/70 text-[16px] leading-[24px] mb-8 font-normal"
                  >
                    Use this code & get <span className="font-semibold text-white">20% off.</span>
                  </p>
                  
                  <div 
                    onClick={copyToClipboard}
                    style={{
                      width: '350px',
                      height: '44px',
                      borderStyle: 'dashed',
                      backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23FEFEFE' stroke-width='1.25' stroke-dasharray='2.5%2c 2.5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`
                    }}
                    className="flex items-center justify-center gap-[8px] px-[20px] cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="font-manrope font-medium text-white text-[16px] tracking-widest uppercase">WELCOME20</span>
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}