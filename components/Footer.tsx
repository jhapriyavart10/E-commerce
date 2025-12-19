import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#5C3D2E] text-white py-12 mt-auto">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Raw Earth Crystals</h3>
            <p className="text-sm text-gray-300">
              Your trusted source for authentic crystals and minerals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop" className="text-gray-300 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/plants" className="text-gray-300 hover:text-white transition-colors">
                  Plants
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-bold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/policies/refund" className="text-gray-300 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="text-gray-300 hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="text-gray-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="text-gray-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: help@rawearthcrystals.com</li>
              <li>Website: rawearthcrystals.com.au</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} Raw Earth Crystals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
