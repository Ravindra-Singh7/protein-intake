import React from 'react';
import { useCart } from '../context/CartContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { promoCode, isPromoApplied } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#181c21] border border-[#262a30] rounded-2xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl flex flex-col gap-4 text-on-surface">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#262a30] pb-3">
          <div className="flex items-center gap-3">
            <img
              alt="Athlete"
              className="w-12 h-12 rounded-full object-cover ring-2 ring-primary-container"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjOk5lUr5mLvXaGRJKuNq6qdLJM-KCRWv0J2SLBGYdSPqWUFraqSeMQQMPOVzinemb5bwHYuteEqZo2X-1mHmSvOuE2-mmskx0rRAQjRc-4xTtxOM3IcW0WDAh-MPUfVBMQN9TRbzwpkzerwKSy_w2DhSSvco_pNlm96CmPIboi26eMcUyso2dXDnuQwKxMN85FvnVJbhXr3pjyip9nQvGVYri2Nm-o3XNDU8PVdF3hB3p6m3k4hWs"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-[16px] uppercase font-bold text-white tracking-tight">
                DEVON STERLING
              </span>
              <span className="font-label-data-sm text-[11px] text-primary-container uppercase">
                TIER 01 ELITE ATHLETE // #APX-994
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#262a30] flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Bio-Performance Status */}
        <div className="grid grid-cols-3 gap-2">
          <div className="p-3 bg-[#1c2025] rounded-xl flex flex-col text-center">
            <span className="font-label-data-lg text-[18px] text-primary-container font-bold">14</span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              BATCHES AUDITED
            </span>
          </div>
          <div className="p-3 bg-[#1c2025] rounded-xl flex flex-col text-center">
            <span className="font-label-data-lg text-[18px] text-secondary font-bold">2,480</span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              REWARD PTS
            </span>
          </div>
          <div className="p-3 bg-[#1c2025] rounded-xl flex flex-col text-center">
            <span className="font-label-data-lg text-[18px] text-white font-bold">4-WKS</span>
            <span className="font-label-data-sm text-[10px] text-on-surface-variant uppercase mt-1">
              SUB CADENCE
            </span>
          </div>
        </div>

        {/* Active Protocol Details */}
        <div className="p-3.5 bg-[#1c2025] rounded-xl flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-data-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
              ACTIVE MACRO PROTOCOL
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-data-sm text-[10px] font-bold">
              HYPERTROPHY V2.4
            </span>
          </div>
          <div className="flex flex-col gap-1 text-xs text-on-surface">
            <div className="flex justify-between py-1 border-b border-[#262a30]">
              <span className="text-on-surface-variant">Daily Protein Target:</span>
              <span className="font-bold font-label-data-sm">180g (6x Hydro-Iso Scoops)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#262a30]">
              <span className="text-on-surface-variant">Active Athlete Discount:</span>
              <span className="text-primary-container font-bold font-label-data-sm">
                {isPromoApplied ? `${promoCode} (Active 20%)` : 'Standard'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">Shipping Logistics:</span>
              <span className="font-semibold text-white">Cold-Chain Express Priority</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-[#262a30] hover:bg-[#31353b] text-white font-headline-sm text-xs font-bold uppercase rounded-lg transition-colors text-center"
        >
          CLOSE PROFILE
        </button>
      </div>
    </div>
  );
};
