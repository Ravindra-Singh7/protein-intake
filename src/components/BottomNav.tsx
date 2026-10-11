import React from 'react';
import { ScreenType } from '../types';
import { useCart } from '../context/CartContext';

interface BottomNavProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const { totalItemCount } = useCart();

  const navItems: { key: ScreenType; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: 'storefront' },
    { key: 'product', label: 'Product', icon: 'inventory_2' },
    { key: 'cart', label: 'Cart', icon: 'shopping_cart' },
    { key: 'lab', label: 'Lab', icon: 'science' },
  ];

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-[#101419]/90 backdrop-blur-xl border-t border-[#262a30]/60 shadow-[0_-1px_12px_rgba(0,0,0,0.5)] max-w-md mx-auto">
      <div className="flex items-center justify-around h-16 px-space-xs">
        {navItems.map((item) => {
          const isActive = currentScreen === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex-1 flex flex-col items-center justify-center min-h-[44px] h-full gap-0.5 transition-colors cursor-pointer relative ${
                isActive
                  ? 'text-primary-container font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  {item.icon}
                </span>
                {item.key === 'cart' && totalItemCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[15px] h-[15px] px-1 bg-primary-container text-on-primary font-label-data-sm text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                    {totalItemCount}
                  </span>
                )}
              </div>
              <span className="font-label-data-sm text-[10px] uppercase tracking-wider">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-5 h-0.5 bg-primary-container rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
