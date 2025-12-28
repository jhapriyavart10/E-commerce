import type { Metadata } from 'next'
import {Lora, Manrope } from 'next/font/google'
import './globals.css'
import { CartProvider } from './context/CartContext'

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
      <body className={`${lora.variable} ${manrope.variable}`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
