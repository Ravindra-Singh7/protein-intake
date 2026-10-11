import React, { useState } from 'react';
import { ScreenType } from '../types';
import { useCart } from '../context/CartContext';
import { ProductVisual } from '../components/ProductVisual';

interface HomeViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCOA: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenCOA }) => {
  const { addToCart, applyPromoCode } = useCart();
  const [selectedHomeFlavor, setSelectedHomeFlavor] = useState<string>('Triple Chocolate');
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [dealApplied, setDealApplied] = useState<boolean>(false);

  const flavorColors: Record<string, string> = {
    'Triple Chocolate': '#4a2e1d',
    'Glacial Vanilla': '#e8e0d5',
    'Arctic Berry Blast': '#7a1d36',
  };

  const handleQuickAdd = () => {
    addToCart({
      name: 'APEX HYDRO-ISO',
      subtitle: `${selectedHomeFlavor} • 2.0 lbs`,
      flavor: selectedHomeFlavor,
      size: '2.0 lbs',
      price: 54.99,
      originalPrice: 54.99,
      isSubscription: false,
      quantity: 1,
      badge: '25G PRO',
      imageType: 'hydro-iso',
    });
  };

  const handleApplyDeal = () => {
    applyPromoCode('APEX20');
    setDealApplied(true);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Dynamic Audio/Haptic Alert Banner */}
      <div className="px-gutter-mobile pt-space-sm pb-space-xs">
        <div className="flex items-center justify-between px-space-md py-space-xs bg-surface-container-high rounded-lg shadow-sm border border-[#31353b]/40">
          <div className="flex items-center gap-space-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase tracking-wider font-bold">
              LAB BATCH #894 LIVE
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-data-sm text-label-data-sm">
            <span>ISO-CERTIFIED</span>
            <span className="material-symbols-outlined text-[14px] text-primary-container">
              verified
            </span>
          </div>
        </div>
      </div>

      {/* Hero Performance Showcase */}
      <section className="relative px-gutter-mobile py-space-md overflow-hidden">
        <div className="relative bg-surface-container rounded-xl p-space-md overflow-hidden shadow-xl border border-[#262a30]">
          {/* Ambient Glow Behind Product */}
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-primary-container/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

          {/* Tag & Kinetic Superheading */}
          <div className="flex items-center gap-space-xs mb-space-xs flex-wrap">
            <span className="px-2 py-0.5 bg-primary-container text-on-primary font-label-data-sm text-label-data-sm font-bold uppercase rounded">
              V2.4 BIO-FORMULA
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
              COLD ULTRA-FILTERED
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary uppercase font-bold tracking-tight leading-none mb-space-xs">
            FUEL MAXIMUM<br />
            <span className="text-primary-container">OUTPUT</span>
          </h1>

          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md max-w-[280px]">
            100% cold-processed hydrolyzed whey isolate engineered for rapid gastric transit and zero GI strain.
          </p>

          {/* Hero Visual Representation */}
          <div className="relative w-full h-56 mb-space-md rounded-lg overflow-hidden bg-surface-container-lowest flex items-center justify-center shadow-inner border border-[#1c2025]">
            <ProductVisual
              type="hydro-iso"
              flavorColor="#4a2e1d"
              className="w-48 h-48"
              showPedestal={true}
            />

            {/* Floating Live Assay Hologram Badge */}
            <div className="absolute bottom-2 left-2 px-2.5 py-1.5 bg-surface-container-highest/90 backdrop-blur-md rounded flex items-center gap-2 shadow-lg border border-[#36393f]/80">
              <span className="material-symbols-outlined text-primary-container text-[16px]">
                science
              </span>
              <div className="flex flex-col">
                <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase leading-tight">
                  HPLC PURITY
                </span>
                <span className="font-label-data-sm text-label-data-sm text-primary font-bold leading-tight">
                  99.4% BIO-ACTIVE
                </span>
              </div>
            </div>
          </div>

          {/* Kinetic CTAs */}
          <div className="flex flex-col gap-space-xs">
            <button
              onClick={() => onNavigate('product')}
              className="w-full min-h-[48px] py-space-sm px-space-md bg-primary-container text-on-primary font-headline-sm text-[15px] uppercase font-bold rounded-lg flex items-center justify-center gap-space-xs active:scale-95 transition-transform shadow-[0_0_20px_-4px_rgba(195,244,0,0.4)] cursor-pointer"
              id="hero-cta"
            >
              <span>SHOP HYDRO-ISO SERIES</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
            <button
              onClick={() => {
                onNavigate('lab');
                onOpenCOA();
              }}
              className="w-full min-h-[44px] py-space-sm px-space-md bg-surface-container-high text-secondary font-headline-sm text-[14px] uppercase font-bold rounded-lg flex items-center justify-center gap-space-xs hover:bg-surface-variant transition-colors cursor-pointer border border-[#31353b]/40"
            >
              <span className="material-symbols-outlined text-[18px]">biotech</span>
              <span>INSPECT LAB CERTS (COA)</span>
            </button>
          </div>
        </div>
      </section>

      {/* Precision Macro Metric Bar */}
      <section className="px-gutter-mobile pb-space-md">
        <div className="grid grid-cols-4 gap-space-xs bg-surface-container-low p-space-xs rounded-xl shadow-md border border-[#262a30]/60">
          <div className="flex flex-col items-center justify-center py-space-sm px-1 bg-surface-container rounded-lg text-center">
            <span className="font-label-data-lg text-label-data-lg text-primary-container leading-none font-bold">
              30G
            </span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              PROTEIN
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-space-sm px-1 bg-surface-container rounded-lg text-center">
            <span className="font-label-data-lg text-label-data-lg text-secondary-fixed-dim leading-none font-bold">
              6.8G
            </span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              BCAAS
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-space-sm px-1 bg-surface-container rounded-lg text-center">
            <span className="font-label-data-lg text-label-data-lg text-primary leading-none font-bold">
              0G
            </span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              SUGAR
            </span>
          </div>
          <div className="flex flex-col items-center justify-center py-space-sm px-1 bg-surface-container rounded-lg text-center">
            <span className="font-label-data-lg text-label-data-lg text-primary leading-none font-bold">
              110
            </span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              KCAL
            </span>
          </div>
        </div>
      </section>

      {/* Special Offer Interactive Banner */}
      <section className="px-gutter-mobile pb-space-md">
        <div className="relative bg-gradient-to-r from-surface-container-high to-surface-container p-space-md rounded-xl overflow-hidden shadow-lg border border-[#31353b]/50">
          <div className="flex items-start justify-between gap-space-sm">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-primary-container/20 text-primary-container rounded font-label-data-sm text-label-data-sm uppercase mb-1">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span>ATHLETE PROTOCOL</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-primary font-bold uppercase tracking-tight">
                SAVE 20% + FREE SHAKER
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Automated delivery every 30 days. Pause or cancel anytime.
              </span>
            </div>
            <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary-container shadow">
              <span className="material-symbols-outlined text-[28px]">redeem</span>
            </div>
          </div>
          {/* Toggle Action Pill */}
          <div className="mt-space-md flex items-center justify-between pt-space-xs">
            <span className="font-label-data-sm text-label-data-sm text-on-surface uppercase">
              PROMO CODE: <span className="text-primary-container font-bold">APEX20</span>
            </span>
            <button
              onClick={handleApplyDeal}
              className={`px-space-md py-1.5 font-label-data-sm text-label-data-sm font-bold uppercase rounded active:scale-95 transition-all cursor-pointer ${
                dealApplied
                  ? 'bg-[#262a30] text-primary-container border border-primary-container/40'
                  : 'bg-primary-container text-on-primary hover:bg-primary-fixed-dim'
              }`}
            >
              {dealApplied ? 'DEAL APPLIED ✓' : 'APPLY DEAL'}
            </button>
          </div>
        </div>
      </section>

      {/* Best Seller Product Deck */}
      <section className="px-gutter-mobile pb-space-lg">
        <div className="flex items-end justify-between mb-space-sm">
          <div className="flex flex-col">
            <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase tracking-wider font-bold">
              CORE COLLECTION
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight">
              APEX HYDRO-ISO
            </h2>
          </div>
          <div className="flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded border border-[#31353b]/40">
            <span
              className="material-symbols-outlined text-[16px] text-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-label-data-sm text-label-data-sm text-primary font-bold">4.9</span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant">(4,820)</span>
          </div>
        </div>

        {/* Flavor Tab Selector */}
        <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs mb-space-sm">
          {['Triple Chocolate', 'Glacial Vanilla', 'Arctic Berry Blast'].map((flv) => {
            const isTabActive = selectedHomeFlavor === flv;
            return (
              <button
                key={flv}
                onClick={() => setSelectedHomeFlavor(flv)}
                className={`flavor-tab px-3 py-1.5 font-label-data-sm text-label-data-sm uppercase font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-surface-container-high text-primary-container shadow-sm border border-primary-container/30'
                    : 'bg-surface-container text-on-surface-variant hover:text-white'
                }`}
              >
                {flv}
              </button>
            );
          })}
        </div>

        {/* Main Feature Product Card */}
        <div className="bg-surface-container rounded-xl overflow-hidden shadow-xl border border-[#262a30]">
          {/* Media Frame */}
          <div className="relative w-full h-64 bg-surface-container-lowest flex items-center justify-center">
            <ProductVisual
              type="hydro-iso"
              flavorColor={flavorColors[selectedHomeFlavor]}
              className="w-52 h-52"
              showPedestal={true}
            />
            <div className="absolute top-space-sm left-space-sm px-2 py-0.5 bg-surface-container-high/90 text-primary font-label-data-sm text-label-data-sm uppercase rounded backdrop-blur border border-[#36393f]">
              BATCH 100% HYDROLYZED
            </div>
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              aria-label="Add to favorites"
              className={`absolute top-space-sm right-space-sm w-8 h-8 rounded-full bg-surface-container-high/90 flex items-center justify-center transition-colors cursor-pointer ${
                isFavorited ? 'text-primary-container' : 'text-on-surface hover:text-primary-container'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={isFavorited ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Card Details */}
          <div className="p-space-md">
            <div className="flex items-start justify-between gap-space-sm mb-space-xs">
              <div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  HYDRO-ISO FORMULA
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Rapid gastric digestion • DigeZyme® fortified
                </p>
              </div>
              <span className="font-label-data-lg text-label-data-lg text-primary font-bold">
                $54.99
              </span>
            </div>

            {/* Serving Specs */}
            <div className="flex items-center gap-space-md py-space-xs mb-space-sm text-on-surface-variant font-label-data-sm text-label-data-sm">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  scale
                </span>
                <span>2.0 LBS (907G)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary-container">
                  timer
                </span>
                <span>30 SERVINGS</span>
              </div>
            </div>

            {/* Split Fast Add CTA Button */}
            <div className="flex items-stretch rounded-lg overflow-hidden bg-primary-container text-on-primary">
              <div className="px-space-md py-space-sm bg-primary-container/90 flex flex-col justify-center border-r border-[#161e00]/20">
                <span className="font-label-data-sm text-[10px] uppercase leading-none opacity-80 font-bold">
                  TOTAL
                </span>
                <span className="font-label-data-md text-label-data-md font-bold leading-tight">
                  $54.99
                </span>
              </div>
              <button
                onClick={handleQuickAdd}
                className="flex-1 py-space-sm px-space-md font-headline-sm text-[15px] font-bold uppercase tracking-wider flex items-center justify-center gap-space-xs active:bg-primary-fixed-dim transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                <span>QUICK ADD TO CART</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Science Pillars */}
      <section className="px-gutter-mobile pb-space-lg">
        <div className="flex flex-col mb-space-sm">
          <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase tracking-wider font-bold">
            LAB VERIFIED STANDARDS
          </span>
          <h2 className="font-headline-sm text-headline-sm text-primary uppercase font-bold tracking-tight">
            WHY APEX OUTPERFORMS
          </h2>
        </div>

        <div className="flex flex-col gap-space-xs">
          {/* Pillar 1 */}
          <div className="p-space-md bg-surface-container rounded-xl flex items-start gap-space-md shadow-md border border-[#262a30]/50">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-primary-container">
              <span className="material-symbols-outlined text-[24px]">filter_alt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] text-primary uppercase font-bold">
                ZERO BLOAT MICRO-FILTRATION
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Cross-flow micro-filtration strips 99.8% of lactose and fat, leaving bioavailable pure protein.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="p-space-md bg-surface-container rounded-xl flex items-start gap-space-md shadow-md border border-[#262a30]/50">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-secondary-container">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] text-primary uppercase font-bold">
                THIRD-PARTY BATCH VERIFIED
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Informed-Sport certified. Every batch screened for 250+ banned substances and heavy metals.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="p-space-md bg-surface-container rounded-xl flex items-start gap-space-md shadow-md border border-[#262a30]/50">
            <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-primary-container">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] text-primary uppercase font-bold">
                RAPID GASTRIC CLEARANCE
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Enzymatically hydrolyzed peptide chains enter the bloodstream in under 15 minutes post-workout.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
