import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-manrope',
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
      <body className={`${manrope.variable} font-sans`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
