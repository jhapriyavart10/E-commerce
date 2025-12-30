import Link from 'next/link';
import { Instagram, Twitter, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#280F0B] text-[#F6D8AB] pt-16 pb-10 mt-auto px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8 mb-16 lg:mb-24">
          
          {/* Tagline & Socials */}
          <div className="flex-1">
            <h2 className="text-4xl lg:text-5xl font-lora leading-tight mb-6">
              Your <span className="italic">spiritual journey</span> <br /> begins here.
            </h2>
            <p className="text-sm text-white opacity-60 max-w-sm mb-8 font-manrope">
              Healing Bracelets from the house of Raw Earth Crystals. Every bracelet tells a beautiful story.
            </p>
            
            <div className="flex gap-5">
              <Link href="#" className="hover:opacity-70 transition-opacity"><Twitter size={20} /></Link>
              <Link href="#" className="hover:opacity-70 transition-opacity"><Instagram size={20} /></Link>
              <Link href="#" className="hover:opacity-70 transition-opacity"><Facebook size={20} /></Link>
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16">
            <div className="flex flex-col">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-widest mb-4 font-manrope">Index</h3>
              <ul className="space-y-2 text-[15px] font-manrope">
                <li><Link href="/" className="hover:opacity-70">Home</Link></li>
                <li><Link href="https://azure-takeaways-956863.framer.app/blogs" className="hover:opacity-70">Dojo</Link></li>
                <li><Link href="/testimonials" className="hover:opacity-70">Testimonials</Link></li>
                <li><Link href="/account" className="hover:opacity-70">User Account</Link></li>
                <li><Link href="/shop" className="hover:opacity-70">Shop</Link></li>
                <li><Link href="/faqs" className="hover:opacity-70">FAQs</Link></li>
              </ul>
            </div>

            <div className="flex flex-col ">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-widest mb-4 font-manrope">Legal</h3>
              <ul className="space-y-2 text-[15px] font-manrope">
                <li><Link href="/policies/privacy" className="hover:opacity-70">Privacy Policy</Link></li>
                <li><Link href="/policies/terms" className="hover:opacity-70">Terms of service</Link></li>
                <li><Link href="/policies/refund" className="hover:opacity-70">Refund policy</Link></li>
                <li><Link href="/policies/shipping" className="hover:opacity-70">Shipping policy</Link></li>
              </ul>
            </div>

            <div className="flex flex-col">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-widest mb-4 font-manrope">Contact</h3>
              <p className="text-[15px] font-manrope">rawearth@crystals.com</p>
            </div>
          </div>
        </div>

        {/* REFINED Massive Logo Text */}
        <div className="w-full pt-2 lg:pt-4 mb-10 container-type-inline-size">
          <h1
            className="font-bold leading-none text-[#F6D8AB] text-center select-none uppercase
                      whitespace-normal lg:whitespace-nowrap"
            style={{
              fontSize: 'clamp(2.5rem, 8.5cqw, 10.5rem)',
              letterSpacing: '-0.035em',
            }}
          >
            Raw Earth Crystals
          </h1>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-[13px] text-white opacity-60 font-manrope tracking-wide uppercase text-center lg:text-left">
          <p>© {new Date().getFullYear()} Raw Earth Crystals All rights reserved.</p>
          <p>Designed & Developed by Dtory Studio</p>
        </div>

      </div>
    </footer>
  );
}