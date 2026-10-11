import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useCart } from '../context/CartContext';
import { ProductVisual } from '../components/ProductVisual';

interface CartViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const CartView: React.FC<CartViewProps> = ({ onNavigate }) => {
  const {
    items,
    totalItemCount,
    subtotal,
    subscriptionDiscount,
    totalSavings,
    shippingCost,
    totalPrice,
    promoCode,
    isPromoApplied,
    freeShippingUnlocked,
    shakerGiftUnlocked,
    nextMilestoneAmount,
    milestoneProgressPercent,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromoCode,
    removePromoCode,
    triggerCheckout,
  } = useCart();

  const [inputCode, setInputCode] = useState<string>(promoCode || 'APEXATHLETE');

  const handleApplyPromo = () => {
    if (isPromoApplied) {
      removePromoCode();
    } else {
      applyPromoCode(inputCode);
    }
  };

  const handleAddShakerUpsell = () => {
    addToCart({
      name: 'PRO SHAKER (28OZ)',
      subtitle: 'Heavy Stainless Core',
      flavor: 'Matte Stealth Black',
      size: '28oz / 800ml',
      price: 14.99,
      originalPrice: 14.99,
      isSubscription: false,
      quantity: 1,
      badge: 'STEEL',
      imageType: 'shaker',
    });
  };

  const handleAddPreWorkUpsell = () => {
    addToCart({
      name: 'IGNITION PRE-WORK',
      subtitle: 'Sour Apple • 40 Serv',
      flavor: 'Sour Apple Crush',
      size: '40 Servings',
      price: 39.99,
      originalPrice: 39.99,
      isSubscription: false,
      quantity: 1,
      badge: 'IGNITE',
      imageType: 'pre-work',
    });
  };

  return (
    <div className="flex flex-col w-full px-margin-mobile space-y-space-md pb-12 pt-space-xs">
      {/* Milestone Progression: Free Shipping & Tiered Gift */}
      <section
        aria-label="Order Reward Milestones"
        className="bg-surface-container rounded-xl p-space-md shadow-md relative overflow-hidden border border-[#262a30]"
      >
        <div className="flex items-center justify-between mb-space-xs">
          <div className="flex items-center gap-space-xs">
            <span
              className="material-symbols-outlined text-primary-container text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              card_giftcard
            </span>
            <span className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface font-bold">
              Reward Tier
            </span>
          </div>
          <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase tracking-wider font-bold">
            {shakerGiftUnlocked
              ? 'Tier 02 Unlocked'
              : freeShippingUnlocked
              ? 'Tier 01 Unlocked'
              : 'Protocol Active'}
          </span>
        </div>

        <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-sm">
          {shakerGiftUnlocked ? (
            <span className="text-primary-container font-bold">
              🎉 Maximum Tier Reached! Free Express Logistics + Matte Pro Shaker unlocked!
            </span>
          ) : freeShippingUnlocked ? (
            <>
              Add{' '}
              <span className="font-label-data-sm text-primary-container font-bold">
                ${nextMilestoneAmount.toFixed(2)}
              </span>{' '}
              to unlock <strong className="text-on-surface">Matte Pro Shaker (28oz)</strong>!
            </>
          ) : (
            <>
              Add{' '}
              <span className="font-label-data-sm text-primary-container font-bold">
                ${nextMilestoneAmount.toFixed(2)}
              </span>{' '}
              to unlock <strong className="text-on-surface">Free Cold-Chain Express Shipping</strong>!
            </>
          )}
        </p>

        {/* Progress Track & Markers */}
        <div className="relative w-full h-2.5 bg-surface-container-high rounded-full overflow-hidden mb-space-xs">
          <div
            className="h-full bg-primary-container transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(195,244,0,0.45)]"
            style={{ width: `${milestoneProgressPercent}%` }}
          />
        </div>

        {/* Milestones Info Nodes */}
        <div className="flex justify-between items-center text-on-surface-variant">
          <div
            className={`flex items-center gap-1 ${
              freeShippingUnlocked ? 'text-primary-container font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {freeShippingUnlocked ? 'check_circle' : 'lock'}
            </span>
            <span className="font-label-data-sm text-[10px] uppercase tracking-wider">
              Free Express ($50)
            </span>
          </div>
          <div
            className={`flex items-center gap-1 ${
              shakerGiftUnlocked ? 'text-primary-container font-bold' : 'text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-[14px]">
              {shakerGiftUnlocked ? 'check_circle' : 'lock'}
            </span>
            <span className="font-label-data-sm text-[10px] uppercase tracking-wider">
              Metal Shaker ($85)
            </span>
          </div>
        </div>
      </section>

      {/* Cart Items List */}
      <section aria-label="Shopping Cart Items" className="space-y-space-sm">
        <div className="flex items-center justify-between px-space-xs">
          <h2 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface font-bold">
            Cart Manifest{' '}
            <span className="font-label-data-md text-label-data-md text-primary-container font-bold">
              ({totalItemCount})
            </span>
          </h2>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase hover:text-on-surface transition-colors cursor-pointer"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-8 bg-surface-container rounded-xl text-center flex flex-col items-center justify-center gap-3 border border-[#262a30]">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant">
              shopping_cart
            </span>
            <p className="font-body-md text-on-surface-variant">Your cart manifest is empty.</p>
            <button
              onClick={() => onNavigate('product')}
              className="px-4 py-2 bg-primary-container text-on-primary font-headline-sm text-xs font-bold uppercase rounded-lg"
            >
              EXPLORE HYDRO-ISO
            </button>
          </div>
        ) : (
          items.map((item) => (
            <article
              key={item.id}
              className="bg-surface-container-low rounded-xl p-space-md shadow-sm relative group flex gap-space-md border border-[#262a30]/60"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-24 rounded-lg bg-surface-container-highest flex-shrink-0 overflow-hidden flex items-center justify-center p-1 border border-[#31353b]">
                <ProductVisual type={item.imageType} className="w-full h-full" />
                {item.badge && (
                  <span className="absolute bottom-1 left-1 px-1 py-0.5 rounded bg-surface-container-lowest text-primary-container font-label-data-sm text-[9px] uppercase font-bold">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Item Meta */}
              <div className="flex flex-col flex-1 min-w-0 justify-between">
                <div>
                  <div className="flex items-start justify-between gap-space-xs">
                    <h3 className="font-headline-sm text-[15px] leading-snug uppercase tracking-tight text-on-surface truncate font-bold">
                      {item.name}
                    </h3>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                      className="text-on-surface-variant hover:text-error transition-colors p-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">close</span>
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-xs mt-0.5">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high font-label-data-sm text-[10px] text-on-surface-variant border border-[#31353b]/40">
                      {item.subtitle}
                    </span>
                    {item.isSubscription ? (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-highest text-secondary font-label-data-sm text-[10px] font-bold border border-[#00daf3]/30">
                        SUB {item.intervalWeeks || 4}-WKS (-20%)
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-surface-container-high font-label-data-sm text-[10px] text-on-surface-variant border border-[#31353b]/40">
                        One-Time
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-space-sm pt-space-xs">
                  {/* Stepper Control */}
                  <div className="inline-flex items-center rounded-lg bg-surface-container-high p-0.5 border border-[#31353b]/50">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      aria-label="Decrease quantity"
                      className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-bright rounded text-sm transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">remove</span>
                    </button>
                    <span className="font-label-data-sm text-label-data-sm px-2 text-on-surface font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      aria-label="Increase quantity"
                      className="w-7 h-7 flex items-center justify-center text-on-surface hover:bg-surface-bright rounded text-sm transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="font-label-data-sm text-[11px] text-on-surface-variant line-through block leading-none">
                        ${(item.originalPrice * item.quantity).toFixed(2)}
                      </span>
                    )}
                    <span
                      className={`font-label-data-lg text-[18px] font-bold leading-tight ${
                        item.isSubscription ? 'text-primary-container' : 'text-on-surface'
                      }`}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </section>

      {/* 1-Tap Quick Boost Upsells */}
      <section aria-label="Athletes Also Add" className="space-y-space-xs">
        <div className="flex items-center justify-between px-space-xs">
          <span className="font-label-data-sm text-label-data-sm uppercase tracking-wider text-on-surface-variant font-bold flex items-center gap-1">
            <span className="material-symbols-outlined text-secondary text-[16px]">bolt</span>
            Athletes Also Add
          </span>
          <span className="font-label-data-sm text-[10px] text-secondary font-bold">
            {shakerGiftUnlocked ? 'FREE GIFT UNLOCKED' : 'UNLOCK FREE GIFT AT $85'}
          </span>
        </div>

        {/* Upsell Cards Row */}
        <div className="grid grid-cols-2 gap-space-sm">
          {/* Upsell 1: Pro Shaker */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col justify-between shadow-sm relative border border-[#262a30]">
            <div className="relative w-full h-24 rounded-lg bg-surface-container-high overflow-hidden mb-space-xs flex items-center justify-center border border-[#31353b]/40">
              <ProductVisual type="shaker" className="w-16 h-20" />
            </div>
            <div>
              <h4 className="font-headline-sm text-[12px] leading-tight uppercase tracking-tight text-on-surface truncate font-bold">
                PRO SHAKER (28OZ)
              </h4>
              <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Heavy Stainless Core
              </p>
            </div>
            <div className="flex items-center justify-between mt-space-sm pt-space-xs">
              <span className="font-label-data-md text-label-data-md font-bold text-on-surface">
                +$14.99
              </span>
              <button
                onClick={handleAddShakerUpsell}
                className="px-2 py-1 rounded bg-secondary-container text-on-secondary-container font-headline-sm text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[12px]">add</span> Add
              </button>
            </div>
          </div>

          {/* Upsell 2: Ignition Pre-Workout */}
          <div className="bg-surface-container rounded-xl p-space-sm flex flex-col justify-between shadow-sm relative border border-[#262a30]">
            <div className="relative w-full h-24 rounded-lg bg-surface-container-high overflow-hidden mb-space-xs flex items-center justify-center border border-[#31353b]/40">
              <ProductVisual type="pre-work" className="w-16 h-20" />
            </div>
            <div>
              <h4 className="font-headline-sm text-[12px] leading-tight uppercase tracking-tight text-on-surface truncate font-bold">
                IGNITION PRE-WORK
              </h4>
              <p className="font-body-sm text-[11px] text-on-surface-variant mt-0.5">
                Sour Apple • 40 Serv
              </p>
            </div>
            <div className="flex items-center justify-between mt-space-sm pt-space-xs">
              <span className="font-label-data-md text-label-data-md font-bold text-on-surface">
                +$39.99
              </span>
              <button
                onClick={handleAddPreWorkUpsell}
                className="px-2 py-1 rounded bg-primary-container text-on-primary-container font-headline-sm text-[11px] font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-0.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[12px]">add</span> Add
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Code Voucher Section */}
      <section
        aria-label="Discount Code"
        className="bg-surface-container-low rounded-xl p-space-md shadow-sm border border-[#262a30]/60"
      >
        <label
          className="block font-label-data-sm text-label-data-sm uppercase tracking-wider text-on-surface-variant mb-space-xs font-semibold"
          htmlFor="promo-input"
        >
          Athlete Privilege / Referral Code
        </label>
        <div className="flex gap-space-xs">
          <div className="relative flex-1">
            <input
              id="promo-input"
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value.toUpperCase())}
              placeholder="APEX20"
              className="w-full uppercase h-11 px-space-md rounded-lg bg-surface-container-highest text-on-surface font-label-data-md text-label-data-md placeholder:text-outline focus:outline-none focus:bg-surface-bright border border-[#31353b]"
            />
            {isPromoApplied && (
              <span className="absolute right-3 top-3 material-symbols-outlined text-primary-container text-[18px]">
                verified
              </span>
            )}
          </div>
          <button
            onClick={handleApplyPromo}
            className={`h-11 px-space-md rounded-lg font-headline-sm text-[13px] font-bold uppercase tracking-wider transition-colors cursor-pointer border ${
              isPromoApplied
                ? 'bg-surface-container-high text-primary-container border-primary-container/40'
                : 'bg-primary-container text-on-primary hover:bg-primary-fixed-dim border-transparent'
            }`}
          >
            {isPromoApplied ? 'APPLIED' : 'APPLY'}
          </button>
        </div>
      </section>

      {/* Order Breakdown Manifest */}
      <section
        aria-label="Order Summary"
        className="bg-surface-container rounded-xl p-space-md shadow-md space-y-space-sm border border-[#262a30]"
      >
        <div className="flex items-center justify-between pb-space-xs border-b border-[#262a30]">
          <h3 className="font-headline-sm text-headline-sm uppercase tracking-tight text-on-surface font-bold">
            Order Summary
          </h3>
          <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase">
            USD Valuation
          </span>
        </div>

        <div className="space-y-space-xs text-body-md text-body-md">
          <div className="flex justify-between items-center text-on-surface-variant">
            <span>Cart Subtotal</span>
            <span className="font-label-data-md text-label-data-md text-on-surface">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="flex items-center gap-1">
              Subscription Privilege (20%)
              <span className="material-symbols-outlined text-[14px] text-primary-container">
                sync
              </span>
            </span>
            <span className="font-label-data-md text-label-data-md text-primary-container font-bold">
              -${subscriptionDiscount.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-on-surface-variant">
            <span className="flex items-center gap-1">
              Express Cold-Chain Logistics
              <span className="px-1 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-data-sm text-[9px] font-bold uppercase">
                {shippingCost === 0 ? 'Unlocked' : 'Calculated'}
              </span>
            </span>
            <span className="font-label-data-md text-label-data-md text-primary-container font-bold">
              {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2 border-t border-[#262a30] text-white">
            <span className="font-headline-sm text-[16px] font-bold uppercase">Estimated Total</span>
            <span className="font-label-data-lg text-label-data-lg text-primary font-bold">
              ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Direct Checkout Action CTA */}
        <button
          onClick={triggerCheckout}
          className="w-full mt-3 py-3.5 px-4 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-[15px] uppercase tracking-wider font-bold rounded-lg transition-transform active:scale-[0.98] shadow-[0_0_20px_-4px_rgba(195,244,0,0.4)] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
          <span>PROCEED TO CHECKOUT</span>
        </button>
      </section>
    </div>
  );
};
