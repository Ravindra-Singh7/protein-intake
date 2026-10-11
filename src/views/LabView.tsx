import React, { useState } from 'react';
import { ScreenType } from '../types';

interface LabViewProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenCOA: () => void;
}

export const LabView: React.FC<LabViewProps> = ({ onNavigate, onOpenCOA }) => {
  const [lotInput, setLotInput] = useState<string>('LOT-2024-H914');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifiedLot, setVerifiedLot] = useState<string>('LOT-2024-H914');
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifiedLot(lotInput.trim().toUpperCase() || 'LOT-2024-H914');
      setScanMessage('ISO 17025 Spectrometry Assays Authenticated');
      setTimeout(() => setScanMessage(null), 3000);
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-gutter-mobile gap-space-lg pb-14 text-on-surface">
      {/* Section 1: Transparency Lead Banner */}
      <section className="flex flex-col gap-space-xs mt-space-sm">
        <div className="flex items-center gap-space-xs">
          <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="font-label-data-sm text-label-data-sm uppercase tracking-widest text-primary-container font-bold">
            BIOCHEMISTRY PROTOCOL 04-A
          </span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase tracking-tight font-bold">
          LAB TRANSPARENCY & PURITY ASSURANCE
        </h2>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Zero proprietary blends. Every batch independently audited by third-party ISO 17025 certified spectrometry facilities.
        </p>
      </section>

      {/* Section 2: Interactive Lot / Batch Verification Tool */}
      <section className="flex flex-col bg-surface-container p-space-md rounded-xl shadow-lg relative overflow-hidden border border-[#262a30]">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/5 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]">biotech</span>
            <span className="font-label-data-sm text-label-data-sm uppercase tracking-wider text-on-surface font-semibold">
              Active Assay Scanner
            </span>
          </div>
          <span className="font-label-data-sm text-label-data-sm uppercase px-2 py-0.5 rounded bg-surface-container-high text-primary-container font-bold border border-primary-container/30">
            Live DB Sync
          </span>
        </div>

        <label
          className="font-label-data-sm text-label-data-sm uppercase tracking-wider text-on-surface-variant mb-space-xs font-semibold"
          htmlFor="batch-input"
        >
          Enter Lot / Batch ID (Found on base of container)
        </label>

        <div className="flex flex-col gap-space-sm">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
              qr_code_scanner
            </span>
            <input
              id="batch-input"
              type="text"
              value={lotInput}
              onChange={(e) => setLotInput(e.target.value.toUpperCase())}
              placeholder="e.g. LOT-2024-H914"
              className="w-full bg-surface-container-lowest text-on-surface font-label-data-md text-label-data-md pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:bg-surface-container-high transition-colors border border-[#31353b]"
            />
          </div>

          <button
            id="verify-batch-btn"
            onClick={handleVerify}
            disabled={isVerifying}
            className="w-full py-3.5 px-4 bg-primary-container hover:bg-primary-fixed-dim text-on-primary font-headline-sm text-[15px] uppercase tracking-wider font-bold rounded-lg transition-transform active:scale-[0.98] shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>{isVerifying ? 'AUDITING MASS SPECTRA...' : 'Verify Certificate of Analysis (COA)'}</span>
          </button>
        </div>

        {scanMessage && (
          <div className="mt-2 text-xs font-label-data-sm text-primary-container flex items-center gap-1 animate-in fade-in">
            <span className="material-symbols-outlined text-[14px]">check</span>
            <span>{scanMessage}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-space-sm pt-space-xs border-t border-[#262a30]">
          <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">
            Spectrometry: LC-MS/MS &amp; ICP-MS
          </span>
          <span className="font-label-data-sm text-label-data-sm text-secondary font-bold">
            Status: Online
          </span>
        </div>
      </section>

      {/* Section 3: Verified Active Batch Card & Micro-Telemetry */}
      <section className="flex flex-col bg-surface-container p-space-md rounded-xl shadow-lg relative gap-space-md border border-[#262a30]">
        {/* Batch Meta Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-label-data-lg text-label-data-lg text-on-surface font-bold tracking-tight">
                {verifiedLot}
              </span>
              <span className="inline-flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded text-primary-container font-label-data-sm text-label-data-sm font-bold border border-primary-container/30">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> PASSED
              </span>
            </div>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant mt-0.5">
              Iso-Apex Native Whey Isolate • Unflavored Pure
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">
              Assay Date
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface font-semibold">
              18-OCT-2024
            </span>
          </div>
        </div>

        {/* Lab Highlights Matrix (3 Cells) */}
        <div className="grid grid-cols-1 gap-space-xs">
          {/* Metric 1: Protein */}
          <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-[#262a30]/50">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
                  Tested Protein Content
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  Label Guarantee: 90.0% min
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-data-lg text-label-data-lg text-primary-container font-bold leading-none">
                91.4%
              </span>
              <span className="font-label-data-sm text-label-data-sm text-secondary font-semibold mt-0.5">
                +1.4% Over Label
              </span>
            </div>
          </div>

          {/* Metric 2: Heavy Metals & Microbials */}
          <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-[#262a30]/50">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
                  Heavy Metals &amp; Microbials
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  Lead, Cadmium, Arsenic, Mercury
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-data-lg text-label-data-lg text-on-surface font-bold leading-none">
                ND
              </span>
              <span className="font-label-data-sm text-label-data-sm text-on-surface-variant mt-0.5">
                Non-Detectable / Pass
              </span>
            </div>
          </div>

          {/* Metric 3: Banned Substance Screen */}
          <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg border border-[#262a30]/50">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded bg-surface-container-high flex items-center justify-center text-primary-container">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-data-sm text-label-data-sm text-on-surface-variant uppercase">
                  Banned Substance Screen
                </span>
                <span className="font-body-sm text-body-sm text-on-surface">
                  WADA / NSF Athletic Standard
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-label-data-lg text-label-data-lg text-primary-container font-bold leading-none">
                280+
              </span>
              <span className="font-label-data-sm text-label-data-sm text-on-surface-variant mt-0.5">
                Compounds Screened
              </span>
            </div>
          </div>
        </div>

        {/* Download / View Official COA Action */}
        <button
          onClick={onOpenCOA}
          className="w-full py-3 px-space-md bg-surface-container-high hover:bg-surface-bright text-on-surface font-headline-sm text-[14px] uppercase tracking-wider font-semibold rounded-lg flex items-center justify-between transition-colors shadow-sm cursor-pointer border border-[#31353b]/40"
        >
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-secondary text-[20px]">description</span>
            <span>Download Official COA Report (PDF)</span>
          </div>
          <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">1.4 MB</span>
        </button>
      </section>

      {/* Section 4: Amino Acid Profile Breakdown */}
      <section className="flex flex-col bg-surface-container p-space-md rounded-xl shadow-lg gap-space-md border border-[#262a30]">
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary-container text-[20px]">hub</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold tracking-tight">
                Complete Amino Spectrum
              </h3>
            </div>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant mt-0.5">
              Expressed per standard 30g scoop assay
            </span>
          </div>
          <span className="font-label-data-sm text-label-data-sm bg-surface-container-lowest text-primary-container px-2 py-1 rounded font-bold border border-primary-container/30">
            100% UNADULTERATED
          </span>
        </div>

        {/* High-Impact Macro Badges (EAAs / BCAAs) */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="flex flex-col p-space-sm bg-surface-container-low rounded-lg border border-[#262a30]/60">
            <div className="flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md font-bold text-primary-container leading-none">
                14.2<span className="text-sm">g</span>
              </span>
              <span className="font-label-data-sm text-label-data-sm text-secondary uppercase font-bold">
                Total
              </span>
            </div>
            <span className="font-label-data-sm text-label-data-sm text-on-surface uppercase font-bold mt-1">
              Essential Aminos (EAAs)
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">
              Cellular repair &amp; protein synthesis driver
            </span>
          </div>

          <div className="flex flex-col p-space-sm bg-surface-container-low rounded-lg border border-[#262a30]/60">
            <div className="flex items-baseline justify-between">
              <span className="font-headline-md text-headline-md font-bold text-secondary leading-none">
                6.8<span className="text-sm">g</span>
              </span>
              <span className="font-label-data-sm text-label-data-sm text-primary-container uppercase font-bold">
                2:1:1
              </span>
            </div>
            <span className="font-label-data-sm text-label-data-sm text-on-surface uppercase font-bold mt-1">
              BCAAs Ratio Cluster
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] leading-tight mt-0.5">
              Leucine, Isoleucine, Valine anabolic core
            </span>
          </div>
        </div>

        {/* BCAA Granular Breakout */}
        <div className="flex flex-col gap-space-xs bg-surface-container-low p-space-sm rounded-lg border border-[#262a30]/60">
          <div className="flex items-center justify-between mb-1">
            <span className="font-label-data-sm text-label-data-sm text-on-surface font-bold uppercase tracking-wider">
              Branched-Chain Trio
            </span>
            <span className="font-label-data-sm text-label-data-sm text-on-surface-variant">
              Target Anabolic Trigger
            </span>
          </div>

          {/* Leucine Bar */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                L-Leucine (mTOR Initiator)
              </span>
              <span className="font-label-data-sm text-label-data-sm text-primary-container font-bold">
                2,910 mg
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full rounded-full" style={{ width: '88%' }} />
            </div>
          </div>

          {/* Isoleucine Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                L-Isoleucine (Glucose Uptake)
              </span>
              <span className="font-label-data-sm text-label-data-sm text-secondary font-bold">
                1,940 mg
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-secondary-container h-full rounded-full" style={{ width: '58%' }} />
            </div>
          </div>

          {/* Valine Bar */}
          <div className="flex flex-col gap-1 mt-1">
            <div className="flex justify-between items-center text-xs">
              <span className="font-body-sm text-body-sm text-on-surface font-semibold">
                L-Valine (Endurance / Anti-Catabolic)
              </span>
              <span className="font-label-data-sm text-label-data-sm text-secondary font-bold">
                1,950 mg
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-secondary-container h-full rounded-full" style={{ width: '59%' }} />
            </div>
          </div>
        </div>

        {/* Non-Essential & Conditional Spectrum Grid */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-data-sm text-label-data-sm uppercase tracking-wider text-on-surface-variant font-semibold">
            Conditionally Essential &amp; Non-Essential Assay (mg / svg)
          </span>

          <div className="grid grid-cols-2 gap-space-xs">
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">Glutamic Acid</span>
              <span className="text-on-surface font-bold">4,620 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">Aspartic Acid</span>
              <span className="text-on-surface font-bold">2,780 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Lysine</span>
              <span className="text-on-surface font-bold">2,610 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Threonine</span>
              <span className="text-on-surface font-bold">1,790 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Proline</span>
              <span className="text-on-surface font-bold">1,650 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Serine</span>
              <span className="text-on-surface font-bold">1,420 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Alanine</span>
              <span className="text-on-surface font-bold">1,480 mg</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded bg-surface-container-low font-label-data-sm text-label-data-sm border border-[#262a30]/50">
              <span className="text-on-surface">L-Tyrosine</span>
              <span className="text-on-surface font-bold">980 mg</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
