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
  isCartDrawerOpen: boolean; 
  setIsCartDrawerOpen: (open: boolean) => void;
  isPageLoading: boolean;
  setIsPageLoading: (loading: boolean) => void; 
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  
  // New Coupon States & Methods
  appliedCoupon: string | null;
  discountAmount: number;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ---------------- PROVIDER ---------------- */
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  // Coupon States
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // 1. HYDRATION (Pulling from LocalStorage)
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopify_cart_id');
    const savedItems = localStorage.getItem('local_cart_items');
    const savedCoupon = localStorage.getItem('raw_earth_coupon');
    
    if (savedCartId) setCartId(savedCartId);
    if (savedItems) {
      try { setCartItems(JSON.parse(savedItems)); } 
      catch (e) { console.error("Cart parse failed:", e); }
    }
    if (savedCoupon) {
      try {
        const { code, amount } = JSON.parse(savedCoupon);
        setAppliedCoupon(code);
        setDiscountAmount(amount);
      } catch (e) { console.error("Coupon parse failed:", e); }
    }
    setIsPageLoading(false);
  }, []);

  // 2. PERSISTENCE (Auto-save items)
  useEffect(() => {
    localStorage.setItem('local_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    setCartItems(currentItems => {
      const existingItem = currentItems.find(i => i.id === item.id);
      if (existingItem) {
        return currentItems.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...currentItems, { ...item, quantity }];
    });

    try {
      const response = await fetch('/api/shopify/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartId, variantId: item.id, quantity })
      });
      const data = await response.json();
      if (!cartId && data.id) {
        setCartId(data.id);
        localStorage.setItem('shopify_cart_id', data.id);
      }
    } catch (error) {
      console.error("Shopify sync failed:", error);
    }
  };

  // 3. COUPON METHODS
  const applyCoupon = async (code: string) => {
    if (!cartId) return { success: false, message: 'Cart not initialized' };
    
    try {
      const res = await fetch('/api/shopify/apply-discount', {
        method: 'POST',
        body: JSON.stringify({ checkoutId: cartId, discountCode: code })
      });
      const result = await res.json();

      if (result.success) {
        // Calculate savings based on current subtotal + 10% tax
        const subtotal = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);
        const tax = subtotal * 0.1;
        const savings = (subtotal + tax) - Number(result.newTotal);

        setAppliedCoupon(code);
        setDiscountAmount(savings);
        localStorage.setItem('raw_earth_coupon', JSON.stringify({ code, amount: savings }));
        
        return { success: true, message: 'Discount applied!' };
      }
      return { success: false, message: result.error || 'Invalid code' };
    } catch (err) {
      return { success: false, message: 'System error' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscountAmount(0);
    localStorage.removeItem('raw_earth_coupon');
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(currentItems =>
      currentItems.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    setCartId(null);
    removeCoupon();
    localStorage.removeItem('shopify_cart_id');
    localStorage.removeItem('local_cart_items');
  };

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartId,
        isCartDrawerOpen, 
        setIsCartDrawerOpen,
        isPageLoading,
        setIsPageLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getTotalItems,
        appliedCoupon,
        discountAmount,
        applyCoupon,
        removeCoupon
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