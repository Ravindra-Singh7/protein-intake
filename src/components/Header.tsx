import React from 'react';
import { ScreenType } from '../types';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentScreen, onNavigate, onOpenProfile }) => {
  const { totalItemCount } = useCart();

  const screenDisplayNames: Record<ScreenType, string> = {
    home: 'Home',
    product: 'Product',
    cart: 'Cart',
    lab: 'Lab',
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#101419]/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-[#262a30]/50 max-w-md mx-auto">
      <div className="h-16 px-gutter-mobile flex items-center justify-between">
        {/* Brand Lockup */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-space-sm focus:outline-none text-left cursor-pointer group"
        >
          <img
            alt="Apex Labs Athletic Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UR22fsHxn2kkSw3KAvgge4Ir36VgCQWNw8vyYtqBiX9F9ORE6dE4Z_PmomdaNwTW-AVipfTKYRuMnRhc07fnk_W1FEj3g2Me2PWcNymeLTpd0cWZti81Wv_SliiQj4sWeHH5hH8Hr9wDuNwwSF-f_4l7jvd73dOl3Y0ZVooTjc4aDNfo1Mv36xPhuBaIQ6bgA57C_mzb-Q3Zf5nebPKxZaoHMIXZ6rMX5YbEplqNJTYE9NrND_oO1mJg"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-white font-bold leading-none">
              APEX LABS
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase tracking-widest leading-none mt-space-xs">
              {screenDisplayNames[currentScreen]}
            </span>
          </div>
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-space-xs">
          {/* Cart Bag with dynamic count badge */}
          <button
            aria-label="Cart"
            onClick={() => onNavigate('cart')}
            className={`relative min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center transition-colors focus:outline-none ${
              currentScreen === 'cart' ? 'text-primary-container' : 'text-on-surface hover:text-primary-container'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            {totalItemCount > 0 && (
              <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 bg-primary-container text-on-primary font-label-data-sm text-[10px] font-bold rounded flex items-center justify-center leading-none animate-in zoom-in-50">
                {totalItemCount}
              </span>
            )}
          </button>

          {/* Athlete Profile Avatar */}
          <button
            aria-label="Athlete Profile"
            onClick={onOpenProfile}
            className="min-w-[44px] min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full p-1 focus:outline-none hover:ring-2 hover:ring-primary-container/40 transition-all cursor-pointer"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#31353b]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjOk5lUr5mLvXaGRJKuNq6qdLJM-KCRWv0J2SLBGYdSPqWUFraqSeMQQMPOVzinemb5bwHYuteEqZo2X-1mHmSvOuE2-mmskx0rRAQjRc-4xTtxOM3IcW0WDAh-MPUfVBMQN9TRbzwpkzerwKSy_w2DhSSvco_pNlm96CmPIboi26eMcUyso2dXDnuQwKxMN85FvnVJbhXr3pjyip9nQvGVYri2Nm-o3XNDU8PVdF3hB3p6m3k4hWs"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
