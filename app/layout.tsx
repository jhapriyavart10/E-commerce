import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import localFont from 'next/font/local'
import Script from 'next/script' // 1. Import Script component
import './globals.css'
import { CartProvider } from './context/CartContext'
import Footer from '@/components/Footer' 
import FloatingChat from '@/components/FloatingChat'
import NewsletterPopup from '@/components/NewsletterPopup';

const manrope = Manrope({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'], 
  variable: '--font-manrope', 
})

const muslone = localFont({
  src: '../public/assets/font/muslone.otf', 
  variable: '--font-muslone',
})

const lora = localFont({
  src: [
    {
      path: '../public/assets/font/Lora-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/assets/font/Lora-MediumItalic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/assets/font/Lora-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Raw Earth Crystals',
  description: 'E-commerce store for crystals and natural products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${manrope.variable} ${muslone.variable} flex flex-col min-h-screen`}>

        <CartProvider>
          {/* flex-grow ensures this area takes up all available space, pushing footer down */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Persistent components appearing on all pages */}
          <Footer />
          <NewsletterPopup />
          <FloatingChat />
        </CartProvider>
      </body>
    </html>
  )
}