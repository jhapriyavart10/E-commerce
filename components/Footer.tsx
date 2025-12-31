import Link from 'next/link';
import { Instagram, Facebook} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#280F0B] text-[#F6D8AB] pt-16 pb-10 mt-auto px-4 sm:px-6 lg:px-12">
      <div className="max-w-[2440px] mx-auto">
        
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8 mb-16 lg:mb-24">
          
          {/* Tagline & Socials */}
          <div className="flex-1">
            <h2 className="font-lora text-[32px] md:text-[32px] leading-tight text-[#F6D8AB] mb-6">
              Your <span className="italic font-medium text-[#F6D8AB]">spiritual journey</span> <br /> 
              begins <span className="font-medium text-[#ce953f]">here</span>.
            </h2>
            <p className="font-manrope text-base text-[14px] text-white opacity-70 max-w-md mb-8 leading-relaxed">
              Healing Bracelets from the house of Raw Earth Crystals. <br className="hidden md:block" />
              Every bracelet tells a beautiful story.
            </p>    
            <div className="flex gap-5">
              <Link href="#" aria-label="X">
                <img src="/assets/images/X.svg" className="w-5 h-5 invert brightness-0 hover:opacity-70" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <img src="/assets/images/insta.svg" className="w-5 h-5 invert brightness-0 hover:opacity-70" />
              </Link> 
              <Link href="#" aria-label="TikTok">
                <img src="/assets/images/tiktok.svg" className="w-5 h-5 invert brightness-0 hover:opacity-70" />
              </Link>
              <Link href="#" aria-label="Facebook">
                <img src="/assets/images/facebook.svg" className="w-5 h-5 invert brightness-0 hover:opacity-70" />
              </Link>      
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto">
            <div className="flex flex-col">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-widest mb-4 font-manrope">Index</h3>
              <ul className="space-y-2 text-[15px] font-manrope">
                <li><Link href="/" className="hover:opacity-70">Home</Link></li>
                <li><Link href="https://azure-takeaways-956863.framer.app/blogs" className="hover:opacity-70">Dojo</Link></li>
                <li><Link href="/testimonials" className="hover:opacity-70">Testimonials</Link></li>
                <li><Link href="/profile" className="hover:opacity-70">User Account</Link></li>
                <li><Link href="/product-analogue" className="hover:opacity-70">Shop</Link></li>
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

            <div className="flex flex-col lg:items-end">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-widest mb-4 font-manrope">Contact</h3>
              <a 
                href="mailto:rawearth@crystals.com" 
                className="text-[15px] font-manrope hover:text-[#F6D8AB] transition-colors"
              >
                rawearth@crystals.com
              </a>
            </div>
          </div>
        </div>

        {/* REFINED Massive Logo Text */}
        <div className="w-full mb-10 ">
          <h1
            className="font-muslone font-bold leading-[0.8] text-[#F6D8AB] text-center select-none uppercase
                      whitespace-normal lg:whitespace-nowrap"
            style={{
              fontSize: 'clamp(2.2rem, 8vw, 10rem)',
              letterSpacing: '-0.04em',
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