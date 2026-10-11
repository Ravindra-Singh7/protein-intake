import React from 'react';
import { useCart } from '../context/CartContext';

export const ReceiptToastModal: React.FC = () => {
  const {
    recentReceipt,
    isReceiptModalOpen,
    closeReceiptModal,
    toastMessage,
    closeToast,
    clearCart,
  } = useCart();

  return (
    <>
      {/* Floating Tactical Toast */}
      {toastMessage && (
        <div className="fixed top-20 inset-x-4 z-50 flex justify-center pointer-events-none">
          <div className="pointer-events-auto max-w-sm w-full bg-[#1c2025]/95 border border-[#c3f400]/40 backdrop-blur-xl px-4 py-3 rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#c3f400] animate-pulse shrink-0" />
              <span className="font-label-data-sm text-[12px] text-[#e0e2ea] font-semibold truncate uppercase tracking-wider">
                {toastMessage}
              </span>
            </div>
            <button
              onClick={closeToast}
              className="text-[#c4c9ac] hover:text-white p-1 rounded transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Mock Order Receipt Slide-up Sheet */}
      {isReceiptModalOpen && recentReceipt && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#181c21] border-t sm:border border-[#262a30] rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto p-5 shadow-2xl flex flex-col gap-4">
            {/* Grab Handle */}
            <div className="w-12 h-1 bg-[#31353b] rounded-full mx-auto sm:hidden" />

            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#262a30] pb-3">
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-primary-container">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                  <span className="font-headline-sm text-[16px] uppercase font-bold tracking-tight text-white">
                    ORDER DISPATCH CONFIRMED
                  </span>
                </div>
                <span className="font-label-data-sm text-[11px] text-[#8e9379] uppercase mt-0.5">
                  RECEIPT #{recentReceipt.orderId} • {recentReceipt.timestamp}
                </span>
              </div>
              <button
                onClick={closeReceiptModal}
                className="w-8 h-8 rounded-lg bg-[#262a30] flex items-center justify-center text-[#c4c9ac] hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {/* Logistics Status Badge */}
            <div className="p-3 bg-[#1c2025] rounded-xl border border-[#c3f400]/30 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#262a30] flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-[13px] uppercase font-bold text-white">
                    COLD-CHAIN AIR COURIER
                  </span>
                  <span className="font-label-data-sm text-[10px] text-[#c4c9ac]">
                    {recentReceipt.estimatedDelivery}
                  </span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-data-sm text-[10px] font-bold uppercase">
                ACTIVE
              </span>
            </div>

            {/* Order Items Breakdown */}
            <div className="flex flex-col gap-2">
              <span className="font-label-data-sm text-[11px] uppercase tracking-wider text-[#8e9379] font-bold">
                MANIFEST ITEMS ({recentReceipt.items.length})
              </span>
              <div className="flex flex-col divide-y divide-[#262a30] bg-[#1c2025] rounded-xl p-3">
                {recentReceipt.items.map((item) => (
                  <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <span className="font-headline-sm text-[13px] text-white uppercase font-bold truncate">
                        {item.name}
                      </span>
                      <span className="font-label-data-sm text-[10px] text-[#c4c9ac]">
                        Qty: {item.quantity} • {item.flavor} ({item.size})
                      </span>
                    </div>
                    <span className="font-label-data-md text-[13px] text-white font-bold shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Unlocked Protocol Perks */}
            {recentReceipt.unlockedGifts.length > 0 && (
              <div className="p-3 rounded-xl bg-[#262a30]/60 border border-[#00e3fd]/30 flex flex-col gap-1.5">
                <span className="font-label-data-sm text-[10px] text-[#00daf3] uppercase font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">card_giftcard</span>
                  UNLOCKED ATHLETE REWARDS
                </span>
                {recentReceipt.unlockedGifts.map((gift, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs text-[#e0e2ea]">
                    <span className="material-symbols-outlined text-[14px] text-primary-container">check</span>
                    <span>{gift}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Financial Ledger */}
            <div className="flex flex-col gap-1.5 p-3 bg-[#101419] rounded-xl font-label-data-sm text-[12px]">
              <div className="flex justify-between text-[#c4c9ac]">
                <span>SUBTOTAL</span>
                <span>${recentReceipt.subtotal.toFixed(2)}</span>
              </div>
              {recentReceipt.discount > 0 && (
                <div className="flex justify-between text-primary-container">
                  <span>DISCOUNTS & PRIVILEGE</span>
                  <span>-${recentReceipt.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#c4c9ac]">
                <span>LOGISTICS</span>
                <span className="text-primary-container font-bold">
                  {recentReceipt.shipping === 0 ? 'FREE' : `$${recentReceipt.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#262a30] text-white font-headline-sm text-[16px] font-bold">
                <span>TOTAL SETTLED</span>
                <span className="text-primary-container">${recentReceipt.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => {
                  clearCart();
                  closeReceiptModal();
                }}
                className="flex-1 py-3 px-4 bg-primary-container text-on-primary font-headline-sm text-[13px] uppercase font-bold rounded-lg active:scale-95 transition-transform flex items-center justify-center gap-2 shadow-lg"
              >
                <span>CONTINUE SHOPPING</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
