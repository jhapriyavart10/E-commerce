import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#280F0B] text-[#F6D8AB] pt-16 pb-10 mt-auto px-4 sm:px-6 lg:px-12">
      <div className="max-w-[2440px] mx-auto">

        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-8 mb-16 lg:mb-24">

          {/* Tagline & Socials */}
          <div className="flex-1">
            <h2
              className="font-lora text-[32px] leading-[1.15] text-[#F6D8AB] mb-6"
              style={{
                WebkitFontSmoothing: 'antialiased',
              }}
            >
              Your <span className="italic font-normal">spiritual journey</span> <br />
              begins <span className="font-normal text-[#ce953f]">here</span>.
            </h2>

            <p className="font-manrope text-[14px] text-white opacity-70 max-w-md mb-8 leading-[1.6]">
              Healing Bracelets from the house of Raw Earth Crystals. <br className="hidden md:block" />
              Every bracelet tells a beautiful story.
            </p>

            <div className="flex gap-5">
              {['X', 'insta', 'tiktok', 'facebook'].map((icon) => (
                <Link key={icon} href="#">
                  <img
                    src={`/assets/images/${icon}.svg`}
                    className="w-5 h-5 invert brightness-0 opacity-90 hover:opacity-70 transition-opacity"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-16 w-full lg:w-auto">
            <div>
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-[0.2em] mb-4 font-manrope">
                Index
              </h3>
              <ul className="space-y-[6px] text-[15px] font-manrope">
                <li><Link href="/product-analogue">Home</Link></li>
                <li><Link href="https://azure-takeaways-956863.framer.app/blogs">Dojo</Link></li>
                <li><Link href="/testimonials">Testimonials</Link></li>
                <li><Link href="/profile">User Account</Link></li>
                <li><Link href="/product-analogue">Shop</Link></li>
                <li><Link href="/faqs">FAQs</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-[0.2em] mb-4 font-manrope">
                Legal
              </h3>
              <ul className="space-y-[6px] text-[15px] font-manrope">
                <li><Link href="/policies/privacy">Privacy Policy</Link></li>
                <li><Link href="/policies/terms">Terms of service</Link></li>
                <li><Link href="/policies/refund">Refund policy</Link></li>
                <li><Link href="/policies/shipping">Shipping policy</Link></li>
              </ul>
            </div>

            <div className="lg:text-right">
              <h3 className="text-[#F6D8AB]/50 text-xs uppercase tracking-[0.2em] mb-4 font-manrope">
                Contact
              </h3>
              <a
                href="mailto:rawearth@crystals.com"
                className="text-[15px] font-manrope opacity-90 hover:opacity-70 transition-opacity"
              >
                rawearth@crystals.com
              </a>
            </div>
          </div>
        </div>

        {/* Massive Logo Text */}
        <div className="w-full mb-10 overflow-hidden">
          <h1
            className="font-muslone uppercase text-center select-none whitespace-nowrap"
            style={{
              fontSize: 'clamp(2rem, 7vw, 10rem)',
              fontWeight: 500,
              lineHeight: 0.9,
              WebkitFontSmoothing: 'antialiased',
              paddingTop: '0.08em',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                transform: `
                  scaleX(
                    clamp(0.8, 100vw / 520, 1.06)
                  )
                `,
                transformOrigin: 'center',
              }}
            >
              Raw Earth Crystals
            </span>
          </h1>
        </div>


        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4
                        text-[12px] text-white opacity-60 font-manrope
                        tracking-[0.08em] uppercase text-center lg:text-left">
          <p>© {new Date().getFullYear()} Raw Earth Crystals All rights reserved.</p>
          <p>Designed & Developed by Dtory Studio</p>
        </div>

      </div>
    </footer>
  );
}
