'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

/* ---------------- TYPES ---------------- */
export interface CartItem {
  id: string; // Shopify Variant GID
  title: string;
  variant: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  cartId: string | null;
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);

  // 1. INITIAL LOAD (Hydration)
  // Runs once when the app starts to pull data from the browser's memory
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopify_cart_id');
    const savedItems = localStorage.getItem('local_cart_items');
    
    if (savedCartId) {
      setCartId(savedCartId);
    }
    
    if (savedItems) {
      try {
        setCartItems(JSON.parse(savedItems));
      } catch (e) {
        console.error("Failed to parse local cart items:", e);
      }
    }
  }, []);

  // 2. AUTO-SAVE (Persistence)
  // Every time cartItems changes, we update localStorage
  useEffect(() => {
    localStorage.setItem('local_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>) => {
    // Update local UI state immediately
    setCartItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...currentItems, { ...item, quantity: 1 }];
    });

    // Sync with Shopify Backend
    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartId: cartId,
          variantId: item.id,
          quantity: 1
        })
      });
      
      const data = await response.json();
      
      // If Shopify creates a new cart session, save that ID
      if (!cartId && data.id) {
        setCartId(data.id);
        localStorage.setItem('shopify_cart_id', data.id);
      }
    } catch (error) {
      console.error("Failed to sync cart with Shopify:", error);
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartId(null);
    localStorage.removeItem('shopify_cart_id');
    localStorage.removeItem('local_cart_items');
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

/* ---------------- HOOK ---------------- */
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}