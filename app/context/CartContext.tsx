'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface CartItem {
  id: string; // This will now represent the Shopify Variant GID
  name: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartId: string | null; // Added: Shopify Cart ID
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>; // Updated to async
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

  // Initialize Cart ID from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopify_cart_id');
    if (savedCartId) setCartId(savedCartId);
  }, []);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // 1. UI Update (Immediate response for user)
    setCartItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });

    // 2. Shopify Sync (Background)
    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'POST',
        body: JSON.stringify({
          cartId: cartId,
          variantId: item.id, // item.id should be the gid:// variant ID
          quantity: 1
        })
      });
      const data = await response.json();
      
      // If a new cart was created, save the ID
      if (!cartId && data.id) {
        setCartId(data.id);
        localStorage.setItem('shopify_cart_id', data.id);
      }
    } catch (error) {
      console.error("Failed to sync cart with Shopify", error);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
    // Optional: Call /api/shopify/cart (PUT) here to sync quantity changes
  };

  const removeFromCart = (id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
    // Optional: Call /api/shopify/cart (DELETE) here
  };

  const clearCart = () => {
    setCartItems([]);
    setCartId(null);
    localStorage.removeItem('shopify_cart_id');
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}