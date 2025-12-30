import type { Metadata } from 'next'
import { Lora, Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'
//import Header from '@/components/Header' // Adjust path based on your folder structure
import Footer from '@/components/Footer' // Adjust path based on your folder structure

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
})

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora',
})

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
      {/* 1. Added flex flex-col and min-h-screen to the body */}
      <body className={`${lora.variable} ${manrope.variable} flex flex-col min-h-screen`}>
        <CartProvider>
          {/* 2. Header added here appears on all pages */}
          

          {/* 3. flex-grow ensures this area takes up all available space, pushing footer down */}
          <main className="flex-grow">
            {children}
          </main>

          {/* 4. Footer added here appears on all pages */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}