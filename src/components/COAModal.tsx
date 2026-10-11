import React from 'react';

interface COAModalProps {
  isOpen: boolean;
  onClose: () => void;
  lotId?: string;
}

export const COAModal: React.FC<COAModalProps> = ({
  isOpen,
  onClose,
  lotId = 'LOT-2024-H914',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#181c21] border border-[#262a30] rounded-2xl max-h-[92vh] overflow-y-auto p-5 shadow-2xl flex flex-col gap-4 text-on-surface">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-[#262a30] pb-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 text-primary-container">
              <span className="material-symbols-outlined text-[20px]">science</span>
              <span className="font-headline-sm text-[16px] uppercase font-bold text-white tracking-tight">
                CERTIFICATE OF ANALYSIS (COA)
              </span>
            </div>
            <span className="font-label-data-sm text-[11px] text-on-surface-variant uppercase mt-0.5">
              ISO/IEC 17025:2017 ACCREDITED FACILITY
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#262a30] flex items-center justify-center text-on-surface-variant hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Certificate Overview Box */}
        <div className="p-3 bg-[#1c2025] rounded-xl border border-[#c3f400]/40 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-data-lg text-[16px] font-bold text-primary-container">
              {lotId}
            </span>
            <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary-container font-label-data-sm text-[10px] font-bold uppercase flex items-center gap-1">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              AUDIT VERIFIED
            </span>
          </div>
          <p className="font-body-sm text-[12px] text-on-surface-variant">
            Product: Apex Iso-Native Hydrolyzed Whey Isolate 100%
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-label-data-sm">
            <div>
              <span className="text-on-surface-variant block">TEST DATE:</span>
              <span className="text-white font-semibold">18-OCT-2024</span>
            </div>
            <div>
              <span className="text-on-surface-variant block">EXPIRY DATE:</span>
              <span className="text-white font-semibold">18-OCT-2026</span>
            </div>
          </div>
        </div>

        {/* Assay Test Results Table */}
        <div className="flex flex-col gap-1.5">
          <span className="font-label-data-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            PHYSICAL & CHEMICAL ASSAYS
          </span>
          <div className="bg-[#1c2025] rounded-xl overflow-hidden text-xs">
            <div className="grid grid-cols-3 bg-[#262a30] p-2 font-label-data-sm text-[10px] text-on-surface-variant uppercase">
              <span>PARAMETER</span>
              <span className="text-center">SPECIFICATION</span>
              <span className="text-right">RESULT</span>
            </div>
            <div className="divide-y divide-[#262a30] p-2 font-label-data-sm">
              <div className="grid grid-cols-3 py-1.5 items-center">
                <span className="text-white font-medium">Protein (Dry Basis)</span>
                <span className="text-center text-on-surface-variant">≥ 90.0%</span>
                <span className="text-right text-primary-container font-bold">91.4% (Pass)</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 items-center">
                <span className="text-white font-medium">Moisture Content</span>
                <span className="text-center text-on-surface-variant">&lt; 5.0%</span>
                <span className="text-right text-white">4.1% (Pass)</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 items-center">
                <span className="text-white font-medium">Lipid (Fat) Content</span>
                <span className="text-center text-on-surface-variant">&lt; 1.0%</span>
                <span className="text-right text-white">0.3% (Pass)</span>
              </div>
              <div className="grid grid-cols-3 py-1.5 items-center">
                <span className="text-white font-medium">Lactose Residue</span>
                <span className="text-center text-on-surface-variant">&lt; 0.2%</span>
                <span className="text-right text-secondary font-bold">0.05% (Pass)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Heavy Metals & Toxic Elements */}
        <div className="flex flex-col gap-1.5">
          <span className="font-label-data-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            HEAVY METAL SPECTROMETRY (ICP-MS)
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-2.5 bg-[#1c2025] rounded-lg flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-label-data-sm">Lead (Pb)</span>
              <span className="text-primary-container font-bold font-label-data-sm">&lt; 0.02 ppm (ND)</span>
            </div>
            <div className="p-2.5 bg-[#1c2025] rounded-lg flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-label-data-sm">Arsenic (As)</span>
              <span className="text-primary-container font-bold font-label-data-sm">&lt; 0.02 ppm (ND)</span>
            </div>
            <div className="p-2.5 bg-[#1c2025] rounded-lg flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-label-data-sm">Cadmium (Cd)</span>
              <span className="text-primary-container font-bold font-label-data-sm">&lt; 0.01 ppm (ND)</span>
            </div>
            <div className="p-2.5 bg-[#1c2025] rounded-lg flex items-center justify-between text-xs">
              <span className="text-on-surface-variant font-label-data-sm">Mercury (Hg)</span>
              <span className="text-primary-container font-bold font-label-data-sm">&lt; 0.005 ppm (ND)</span>
            </div>
          </div>
        </div>

        {/* Banned Substance Verification */}
        <div className="p-3 rounded-xl bg-[#262a30] border border-[#00daf3]/30 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-secondary">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span className="font-label-data-sm text-[11px] font-bold uppercase">
              INFORMED-SPORT BANNED SUBSTANCE SCREEN
            </span>
          </div>
          <p className="font-body-sm text-[11px] text-on-surface-variant">
            Screened against 280+ WADA &amp; Olympic athletic prohibited compounds. LC-MS/MS &amp; GC-MS methodology. Zero contaminants detected.
          </p>
        </div>

        {/* Footer & Close */}
        <div className="pt-2 border-t border-[#262a30] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-data-sm text-[10px] text-on-surface-variant">
              CERTIFIED BIOCHEMIST
            </span>
            <span className="font-headline-sm text-[12px] text-white">
              Dr. Marcus Vance, Ph.D.
            </span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-container text-on-primary font-headline-sm text-xs font-bold uppercase rounded-lg active:scale-95 transition-transform"
          >
            DISMISS REPORT
          </button>
        </div>
      </div>
    </div>
  );
};
