import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types';

interface OrderReceipt {
  orderId: string;
  timestamp: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  unlockedGifts: string[];
  estimatedDelivery: string;
}

interface CartContextType {
  items: CartItem[];
  totalItemCount: number;
  subtotal: number;
  subscriptionDiscount: number;
  promoDiscount: number;
  totalSavings: number;
  shippingCost: number;
  totalPrice: number;
  promoCode: string;
  isPromoApplied: boolean;
  freeShippingUnlocked: boolean;
  shakerGiftUnlocked: boolean;
  nextMilestoneAmount: number;
  milestoneProgressPercent: number;
  recentReceipt: OrderReceipt | null;
  isReceiptModalOpen: boolean;
  toastMessage: string | null;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  triggerCheckout: () => void;
  closeReceiptModal: () => void;
  closeToast: () => void;
}

const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'item-hydro-iso-1',
    name: 'APEX HYDRO-ISO',
    subtitle: 'Triple Chocolate • 2.2 lbs',
    flavor: 'Triple Chocolate',
    size: '2.2 lbs',
    price: 43.99,
    originalPrice: 54.99,
    isSubscription: true,
    intervalWeeks: 4,
    quantity: 1,
    badge: '25G PRO',
    imageType: 'hydro-iso',
  },
  {
    id: 'item-electro-1',
    name: 'ELECTRO-HYDRATE RAW',
    subtitle: 'Citrus Lime • 30 Packets',
    flavor: 'Citrus Lime',
    size: '30 Packets',
    price: 29.99,
    originalPrice: 29.99,
    isSubscription: false,
    quantity: 1,
    badge: 'ELECTRO',
    imageType: 'electro',
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('apex_cart_manifest_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CART_ITEMS;
  });

  const [promoCode, setPromoCode] = useState<string>('APEXATHLETE');
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(true);
  const [recentReceipt, setRecentReceipt] = useState<OrderReceipt | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('apex_cart_manifest_v2', JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const totalItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Subtotal without subscription discounts
  const subtotal = items.reduce((sum, item) => {
    const basePrice = item.originalPrice || item.price;
    return sum + basePrice * item.quantity;
  }, 0);

  // Subscription Privilege savings (20% off items marked subscription)
  const subscriptionDiscount = items.reduce((sum, item) => {
    if (item.isSubscription && item.originalPrice && item.originalPrice > item.price) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

  // Calculate promotional coupon discount (if applied and not already subscribed)
  const promoDiscount = isPromoApplied && promoCode.toUpperCase().includes('APEX')
    ? 0 // promo APEXATHLETE is bundled or applied
    : 0;

  const totalSavings = subscriptionDiscount + promoDiscount;
  const currentPreShippingTotal = subtotal - totalSavings;

  // Milestone Thresholds:
  // Free Express Shipping at $50
  // Free Stainless Metal Shaker at $85
  const freeShippingThreshold = 50.0;
  const shakerGiftThreshold = 85.0;

  const freeShippingUnlocked = currentPreShippingTotal >= freeShippingThreshold;
  const shakerGiftUnlocked = currentPreShippingTotal >= shakerGiftThreshold;

  const shippingCost = freeShippingUnlocked || items.length === 0 ? 0.0 : 8.5;

  let nextMilestoneAmount = 0;
  let milestoneProgressPercent = 0;

  if (currentPreShippingTotal < freeShippingThreshold) {
    nextMilestoneAmount = Math.max(0, freeShippingThreshold - currentPreShippingTotal);
    milestoneProgressPercent = Math.min(100, (currentPreShippingTotal / freeShippingThreshold) * 50);
  } else if (currentPreShippingTotal < shakerGiftThreshold) {
    nextMilestoneAmount = Math.max(0, shakerGiftThreshold - currentPreShippingTotal);
    milestoneProgressPercent = 50 + ((currentPreShippingTotal - freeShippingThreshold) / (shakerGiftThreshold - freeShippingThreshold)) * 50;
  } else {
    nextMilestoneAmount = 0;
    milestoneProgressPercent = 100;
  }

  const totalPrice = Math.max(0, currentPreShippingTotal + shippingCost);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) =>
          i.name === newItem.name &&
          i.flavor === newItem.flavor &&
          i.size === newItem.size &&
          i.isSubscription === newItem.isSubscription
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += newItem.quantity;
        return updated;
      }

      const generatedId = `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      return [...prev, { ...newItem, id: generatedId }];
    });

    setToastMessage(`Added ${newItem.name} to cart`);
    setTimeout(() => {
      setToastMessage((cur) => (cur?.includes(newItem.name) ? null : cur));
    }, 2800);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code: string) => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'APEX20' || formatted === 'APEXATHLETE' || formatted === 'BIOFORMULA') {
      setPromoCode(formatted);
      setIsPromoApplied(true);
      setToastMessage(`Promo code ${formatted} verified!`);
      setTimeout(() => setToastMessage(null), 2500);
      return true;
    }
    setToastMessage('Invalid athlete promo code');
    setTimeout(() => setToastMessage(null), 2500);
    return false;
  };

  const removePromoCode = () => {
    setIsPromoApplied(false);
    setPromoCode('');
  };

  const triggerCheckout = () => {
    if (items.length === 0) {
      setToastMessage('Cart manifest is empty');
      setTimeout(() => setToastMessage(null), 2000);
      return;
    }

    const unlockedGifts: string[] = [];
    if (freeShippingUnlocked) unlockedGifts.push('Cold-Chain Express Logistics ($0.00)');
    if (shakerGiftUnlocked) unlockedGifts.push('Matte Pro Shaker (28oz - Free)');

    const receipt: OrderReceipt = {
      orderId: `APX-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      items: [...items],
      subtotal,
      discount: totalSavings,
      shipping: shippingCost,
      total: totalPrice,
      unlockedGifts,
      estimatedDelivery: 'Express 48-Hour Air Logistics',
    };

    setRecentReceipt(receipt);
    setIsReceiptModalOpen(true);
    setToastMessage(`Order ${receipt.orderId} Confirmed!`);
  };

  const closeReceiptModal = () => {
    setIsReceiptModalOpen(false);
  };

  const closeToast = () => {
    setToastMessage(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalItemCount,
        subtotal,
        subscriptionDiscount,
        promoDiscount,
        totalSavings,
        shippingCost,
        totalPrice,
        promoCode,
        isPromoApplied,
        freeShippingUnlocked,
        shakerGiftUnlocked,
        nextMilestoneAmount,
        milestoneProgressPercent,
        recentReceipt,
        isReceiptModalOpen,
        toastMessage,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        triggerCheckout,
        closeReceiptModal,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
