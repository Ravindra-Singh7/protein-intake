import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useCart } from '../context/CartContext';
import { ProductVisual } from '../components/ProductVisual';

interface ProductViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const ProductView: React.FC<ProductViewProps> = ({ onNavigate }) => {
  const { addToCart } = useCart();

  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('Triple Dutch Chocolate');
  const [selectedSize, setSelectedSize] = useState<'standard' | 'pro'>('standard');
  const [isSubscription, setIsSubscription] = useState<boolean>(true);
  const [intervalWeeks, setIntervalWeeks] = useState<number>(4);

  const flavorDetails = [
    {
      id: 'triple-dutch',
      name: 'Triple Dutch Chocolate',
      shortName: 'Triple Dutch Choc',
      color: '#4a2e1d',
      tag: 'Top Rated',
      tagColor: 'text-primary-container',
    },
    {
      id: 'ghost-vanilla',
      name: 'Ghost Vanilla',
      shortName: 'Ghost Vanilla',
      color: '#e8e0d5',
      tag: 'Smooth Silk',
      tagColor: 'text-on-surface-variant',
    },
    {
      id: 'iced-mocha',
      name: 'Iced Mocha Cold Brew',
      shortName: 'Iced Mocha Brew',
      color: '#291b16',
      tag: '+50mg Caffeine',
      tagColor: 'text-secondary',
    },
    {
      id: 'cookies-cream',
      name: 'Cookies & Cream',
      shortName: 'Cookies & Cream',
      color: '#7a7876',
      tag: 'Real Crumbles',
      tagColor: 'text-on-surface-variant',
    },
  ];

  const currentFlavorObj = flavorDetails.find((f) => f.name === selectedFlavor) || flavorDetails[0];

  const regularPrice = selectedSize === 'standard' ? 54.99 : 99.99;
  const subPrice = selectedSize === 'standard' ? 43.99 : 79.99;
  const currentPrice = isSubscription ? subPrice : regularPrice;

  const handleAddToCart = () => {
    addToCart({
      name: 'APEX HYDRO-ISO',
      subtitle: `${selectedFlavor} • ${selectedSize === 'standard' ? '2.2 lbs' : '5.0 lbs'}`,
      flavor: selectedFlavor,
      size: selectedSize === 'standard' ? '2.2 lbs' : '5.0 lbs',
      price: currentPrice,
      originalPrice: regularPrice,
      isSubscription,
      intervalWeeks: isSubscription ? intervalWeeks : undefined,
      quantity: 1,
      badge: '25G PRO',
      imageType: 'hydro-iso',
    });
  };

  return (
    <div className="flex flex-col w-full text-on-surface pb-12">
      {/* TOP PRODUCT HERO / VISUAL STAGE */}
      <div className="relative w-full bg-surface-container-lowest px-gutter-mobile pt-space-md pb-space-lg flex flex-col items-center overflow-hidden">
        {/* Ambient Neon Laser Glow */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-20 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

        {/* Floating Trust Badges Row */}
        <div className="w-full flex items-center justify-between z-10 mb-space-sm">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md border border-[#31353b]/50">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-data-sm text-label-data-sm text-primary-container tracking-wider uppercase font-bold">
              BATCH LOT #8849-V
            </span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-high/90 text-on-surface-variant border border-[#31353b]/50">
            <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
            <span className="font-label-data-sm text-label-data-sm tracking-widest uppercase">
              INFORMED-SPORT
            </span>
          </div>
        </div>

        {/* Tub Centerpiece Presentation */}
        <div className="relative w-full aspect-[4/3] max-w-sm flex items-center justify-center my-space-xs">
          <ProductVisual
            type="hydro-iso"
            flavorColor={currentFlavorObj.color}
            className="w-56 h-56 z-10"
            showPedestal={true}
          />
          {/* Subtle Pedestal Floor Gradient */}
          <div className="absolute bottom-2 inset-x-8 h-4 bg-gradient-to-r from-transparent via-primary-container/20 to-transparent blur-md" />
        </div>

        {/* Gallery Dot Indicators */}
        <div className="flex items-center justify-center gap-2 mt-space-xs z-10">
          {[0, 1, 2].map((idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              aria-label={`Slide ${idx + 1}`}
              className={`rounded-full transition-all cursor-pointer ${
                activeSlide === idx
                  ? 'w-6 h-1.5 bg-primary-container'
                  : 'w-1.5 h-1.5 bg-surface-container-highest hover:bg-surface-bright'
              }`}
            />
          ))}
        </div>
      </div>

      {/* TITLE, REVIEWS & CORE ATTRIBUTES */}
      <div className="px-gutter-mobile pt-space-md flex flex-col gap-space-xs">
        <div className="flex items-center gap-2">
          <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase tracking-widest px-2 py-0.5 rounded bg-surface-container-high border border-[#31353b]/50">
            SERIES 01 // BIO-ENZYMATIC
          </span>
          <div className="flex items-center gap-1 ml-auto text-primary-container">
            <span
              className="material-symbols-outlined text-[16px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface font-bold">4.96</span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">(1,482)</span>
          </div>
        </div>

        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight font-bold mt-1">
          APEX HYDRO-ISO
        </h1>
        <p className="font-body-sm text-body-sm text-on-surface-variant -mt-1">
          Hydrolyzed Cross-Flow Microfiltered Whey Protein Isolate. Ultra-fast bio-absorption within 15 minutes.
        </p>

        {/* Rapid Pill Highlights */}
        <div className="flex items-center gap-2 mt-space-xs overflow-x-auto pb-1">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface shrink-0 border border-[#262a30]">
            <span className="material-symbols-outlined text-[16px] text-primary-container">bolt</span>
            <span className="font-label-data-sm text-label-data-sm">ZERO BLOAT PEPTIDES</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container text-on-surface shrink-0 border border-[#262a30]">
            <span className="material-symbols-outlined text-[16px] text-secondary">water_drop</span>
            <span className="font-label-data-sm text-label-data-sm">INSTANT DISPERSION</span>
          </div>
        </div>
      </div>

      {/* MACRO TRANSPARENCY DASHBOARD */}
      <div className="px-gutter-mobile mt-space-lg">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="font-headline-sm text-headline-sm uppercase text-primary font-bold">
            BIO-SPECS PER SCOOP
          </span>
          <span className="font-label-data-sm text-label-data-sm text-primary-container font-semibold">
            33.5G SERVING
          </span>
        </div>

        {/* Macro Metrics Matrix */}
        <div className="grid grid-cols-3 gap-2">
          {/* Protein Box */}
          <div className="flex flex-col p-3 rounded bg-surface-container-high justify-between border border-[#31353b]/40">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">PROTEIN</span>
            <div className="my-1">
              <span className="font-label-data-lg text-label-data-lg text-primary-container font-bold">
                30<span className="text-xs font-normal">G</span>
              </span>
            </div>
            <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-[60%]" />
            </div>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant mt-1.5 leading-none">
              60% DAILY VAL
            </span>
          </div>

          {/* BCAAs Box */}
          <div className="flex flex-col p-3 rounded bg-surface-container-high justify-between border border-[#31353b]/40">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">BCAAS</span>
            <div className="my-1">
              <span className="font-label-data-lg text-label-data-lg text-secondary font-bold">
                6.8<span className="text-xs font-normal">G</span>
              </span>
            </div>
            <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[85%]" />
            </div>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant mt-1.5 leading-none">
              2:1:1 RATIO
            </span>
          </div>

          {/* Leucine Box */}
          <div className="flex flex-col p-3 rounded bg-surface-container-high justify-between border border-[#31353b]/40">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">LEUCINE</span>
            <div className="my-1">
              <span className="font-label-data-lg text-label-data-lg text-primary font-bold">
                2.7<span className="text-xs font-normal">G</span>
              </span>
            </div>
            <div className="w-full bg-surface-container-lowest h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[90%]" />
            </div>
            <span className="font-label-data-sm text-[10px] text-primary-container mt-1.5 leading-none">
              ANABOLIC KEY
            </span>
          </div>
        </div>

        {/* Secondary Row Details */}
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="flex items-center justify-between p-2.5 rounded bg-surface-container text-on-surface border border-[#262a30]">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">TOTAL SUGAR</span>
            <span className="font-label-data-md text-label-data-md text-primary-container font-bold">0.0G</span>
          </div>
          <div className="flex items-center justify-between p-2.5 rounded bg-surface-container text-on-surface border border-[#262a30]">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">CALORIES</span>
            <span className="font-label-data-md text-label-data-md text-primary font-bold">110 KCAL</span>
          </div>
        </div>
      </div>

      {/* SELECTORS: FLAVOR & CONTAINER SIZE */}
      <div className="px-gutter-mobile mt-space-lg flex flex-col gap-space-md">
        {/* Flavor Selection */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
              FLAVOR PROFILE
            </span>
            <span className="font-label-data-sm text-label-data-sm text-primary-container font-bold uppercase">
              {selectedFlavor}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2" id="flavor-options">
            {flavorDetails.map((f) => {
              const isSelected = selectedFlavor === f.name;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFlavor(f.name)}
                  type="button"
                  className={`flavor-pill flex items-center gap-2 p-2.5 rounded text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-surface-container-high text-primary border-primary-container/50 shadow-[0_0_12px_rgba(195,244,0,0.25)]'
                      : 'bg-surface-container text-on-surface-variant border-[#262a30] hover:text-on-surface'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: f.color }}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-data-sm text-label-data-sm font-bold truncate">
                      {f.shortName}
                    </span>
                    <span className={`font-label-data-sm text-[10px] uppercase font-semibold ${f.tagColor}`}>
                      {f.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tub Size Toggle */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
              UNIT CAPACITY
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">
              {selectedSize === 'standard' ? '$1.83 / SERVING' : '$1.46 / SERVING'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2" id="size-options">
            {/* 2.2 LBS */}
            <button
              onClick={() => setSelectedSize('standard')}
              type="button"
              className={`size-pill p-3 rounded flex flex-col text-left transition-all cursor-pointer border ${
                selectedSize === 'standard'
                  ? 'bg-surface-container-high text-primary border-primary-container/50 shadow-[0_0_12px_rgba(195,244,0,0.2)]'
                  : 'bg-surface-container text-on-surface-variant border-[#262a30]'
              }`}
            >
              <span className="font-label-data-md text-label-data-md font-bold text-on-surface">
                2.2 LBS
              </span>
              <span className="font-label-data-sm text-[11px] text-on-surface-variant mt-0.5">
                30 Full Servings
              </span>
              <span className="font-label-data-sm text-label-data-sm text-primary mt-2">
                $54.99 REG
              </span>
            </button>

            {/* 5.0 LBS */}
            <button
              onClick={() => setSelectedSize('pro')}
              type="button"
              className={`size-pill relative p-3 rounded flex flex-col text-left transition-all cursor-pointer border ${
                selectedSize === 'pro'
                  ? 'bg-surface-container-high text-primary border-primary-container/50 shadow-[0_0_12px_rgba(195,244,0,0.2)]'
                  : 'bg-surface-container text-on-surface-variant border-[#262a30]'
              }`}
            >
              <span className="absolute -top-2 right-2 px-1.5 py-0.5 rounded bg-primary-container text-on-primary font-label-data-sm text-[9px] font-bold uppercase">
                SAVE 24% PER OZ
              </span>
              <span className="font-label-data-md text-label-data-md font-bold text-primary-container">
                5.0 LBS
              </span>
              <span className="font-label-data-sm text-[11px] text-on-surface-variant mt-0.5">
                68 Heavy Servings
              </span>
              <span className="font-label-data-sm text-label-data-sm text-primary mt-2">
                $99.99 REG
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* PURCHASE OPTION CARDS (SUBSCRIBE VS ONE-TIME) */}
      <div className="px-gutter-mobile mt-space-lg flex flex-col gap-2.5">
        {/* Option A: Subscribe & Save 20% */}
        <div
          onClick={() => setIsSubscription(true)}
          className={`plan-card relative p-3.5 rounded transition-all cursor-pointer border ${
            isSubscription
              ? 'bg-surface-container-high border-primary-container/50 shadow-md'
              : 'bg-surface-container border-[#262a30]'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  isSubscription ? 'bg-primary-container text-on-primary' : 'bg-[#262a30] text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    SUBSCRIBE & SAVE
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-data-sm text-[10px] font-bold uppercase">
                    SAVE 20%
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Free express shipping + pause or cancel anytime
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-label-data-sm text-[11px] text-on-surface-variant line-through block">
                ${regularPrice.toFixed(2)}
              </span>
              <span className="font-label-data-lg text-label-data-lg text-primary-container font-bold">
                ${subPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Delivery Cadence Selector */}
          {isSubscription && (
            <div className="mt-3 pt-2.5 border-t border-[#262a30] flex items-center justify-between">
              <span className="font-label-data-sm text-[11px] text-on-surface-variant uppercase">
                DELIVERY CADENCE:
              </span>
              <div className="flex items-center gap-1">
                {[3, 4, 6].map((w) => (
                  <button
                    key={w}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIntervalWeeks(w);
                    }}
                    className={`px-2 py-0.5 rounded font-label-data-sm text-[11px] transition-colors cursor-pointer ${
                      intervalWeeks === w
                        ? 'bg-primary-container text-on-primary font-bold'
                        : 'bg-[#262a30] text-on-surface-variant hover:text-white'
                    }`}
                  >
                    Every {w} Wks
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Option B: One-Time Purchase */}
        <div
          onClick={() => setIsSubscription(false)}
          className={`plan-card relative p-3.5 rounded transition-all cursor-pointer border ${
            !isSubscription
              ? 'bg-surface-container-high border-primary-container/50 shadow-md'
              : 'bg-surface-container border-[#262a30]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                  !isSubscription ? 'bg-primary-container text-on-primary' : 'bg-[#262a30] text-transparent'
                }`}
              >
                <span className="material-symbols-outlined text-[14px] font-bold">check</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  ONE-TIME ORDER
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Standard single delivery shipment
                </span>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-label-data-lg text-label-data-lg text-primary font-bold">
                ${regularPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Fast Add CTA Button */}
      <div className="px-gutter-mobile mt-space-lg">
        <div className="flex items-stretch rounded-lg overflow-hidden bg-primary-container text-on-primary shadow-xl">
          <div className="px-space-md py-space-sm bg-primary-container/90 flex flex-col justify-center border-r border-[#161e00]/20">
            <span className="font-label-data-sm text-[10px] uppercase leading-none opacity-80 font-bold">
              TOTAL
            </span>
            <span className="font-label-data-md text-label-data-md font-bold leading-tight">
              ${currentPrice.toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-space-sm px-space-md font-headline-sm text-[15px] font-bold uppercase tracking-wider flex items-center justify-center gap-space-xs active:bg-primary-fixed-dim transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
            <span>ADD TO CART</span>
          </button>
        </div>
      </div>
    </div>
  );
};
