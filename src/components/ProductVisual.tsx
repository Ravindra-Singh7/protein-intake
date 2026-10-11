import React from 'react';

interface ProductVisualProps {
  type: 'hydro-iso' | 'electro' | 'shaker' | 'pre-work';
  flavorColor?: string;
  className?: string;
  showPedestal?: boolean;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  type,
  flavorColor = '#4a2e1d',
  className = 'w-full h-full',
  showPedestal = false,
}) => {
  if (type === 'hydro-iso') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        {showPedestal && (
          <div className="absolute -bottom-3 w-4/5 h-6 bg-gradient-to-r from-transparent via-black/80 to-transparent blur-md rounded-full pointer-events-none" />
        )}
        <svg viewBox="0 0 240 280" className="w-full h-full max-h-full drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tubBody" x1="20" y1="50" x2="220" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22272e" />
              <stop offset="30%" stopColor="#12161b" />
              <stop offset="70%" stopColor="#0d1116" />
              <stop offset="100%" stopColor="#1a1e24" />
            </linearGradient>
            <linearGradient id="lidGrad" x1="40" y1="20" x2="200" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2c323b" />
              <stop offset="50%" stopColor="#15191f" />
              <stop offset="100%" stopColor="#2a3038" />
            </linearGradient>
            <linearGradient id="voltSheen" x1="40" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#c3f400" />
              <stop offset="50%" stopColor="#eaff6b" />
              <stop offset="100%" stopColor="#9ec700" />
            </linearGradient>
            <linearGradient id="flavorGrad" x1="50" y1="170" x2="190" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={flavorColor} />
              <stop offset="100%" stopColor="#101419" />
            </linearGradient>
          </defs>

          {/* Pedestal mist glow */}
          {showPedestal && (
            <ellipse cx="120" cy="265" rx="85" ry="12" fill="#c3f400" fillOpacity="0.12" filter="blur(8px)" />
          )}

          {/* Tub Cap */}
          <rect x="58" y="22" width="124" height="26" rx="4" fill="url(#lidGrad)" stroke="#363d47" strokeWidth="1.5" />
          <path d="M62 26H178M62 32H178M62 38H178" stroke="#3d4450" strokeWidth="1" strokeLinecap="round" />

          {/* Tub Neck */}
          <rect x="68" y="46" width="104" height="12" fill="#13171d" />

          {/* Tub Body */}
          <path d="M40 58C40 58 48 248 56 256C64 264 176 264 184 256C192 248 200 58 200 58H40Z" fill="url(#tubBody)" stroke="#2b313b" strokeWidth="1.5" />

          {/* Gloss highlight line */}
          <path d="M52 70C52 70 58 240 62 248" stroke="white" strokeOpacity="0.1" strokeWidth="3" strokeLinecap="round" />

          {/* Label Background Accent */}
          <path d="M44 88C44 88 47 220 50 230H190C193 220 196 88 196 88H44Z" fill="#12161b" />
          
          {/* Neon Foil Header Ribbon */}
          <rect x="46" y="98" width="148" height="24" fill="url(#voltSheen)" rx="2" />
          <text x="120" y="114" fill="#161e00" fontSize="11" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle" letterSpacing="0.08em">
            APEX // BIO-FORMULA
          </text>

          {/* Main Title typography */}
          <text x="120" y="146" fill="#ffffff" fontSize="18" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle" letterSpacing="0.04em">
            HYDRO-ISO
          </text>
          <text x="120" y="160" fill="#c3f400" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.12em">
            COLD ULTRA-FILTERED
          </text>

          {/* Flavor Strip */}
          <rect x="52" y="172" width="136" height="16" fill="url(#flavorGrad)" rx="2" />
          <text x="120" y="184" fill="#ffffff" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing="0.05em">
            100% HYDROLYZED ISOLATE
          </text>

          {/* Specs Micro Matrix */}
          <g transform="translate(56, 198)">
            <rect x="0" y="0" width="38" height="22" rx="2" fill="#1c2025" />
            <text x="19" y="11" fill="#c3f400" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">30G</text>
            <text x="19" y="19" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">PRO</text>

            <rect x="45" y="0" width="38" height="22" rx="2" fill="#1c2025" />
            <text x="64" y="11" fill="#00daf3" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">6.8G</text>
            <text x="64" y="19" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">BCAA</text>

            <rect x="90" y="0" width="38" height="22" rx="2" fill="#1c2025" />
            <text x="109" y="11" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">0G</text>
            <text x="109" y="19" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SUGAR</text>
          </g>

          {/* Bottom Trust Stamp */}
          <circle cx="120" cy="236" r="6" fill="#c3f400" fillOpacity="0.2" stroke="#c3f400" strokeWidth="0.8" />
          <path d="M118 236L119.5 237.5L122.5 234.5" stroke="#c3f400" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  if (type === 'electro') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <svg viewBox="0 0 200 240" className="w-full h-full max-h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pouchGrad" x1="20" y1="20" x2="180" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1e242c" />
              <stop offset="50%" stopColor="#12161b" />
              <stop offset="100%" stopColor="#0d1014" />
            </linearGradient>
            <linearGradient id="cyanSheen" x1="30" y1="70" x2="170" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00e3fd" />
              <stop offset="100%" stopColor="#0094a6" />
            </linearGradient>
          </defs>

          {/* Sachet Notch & Top Seal */}
          <path d="M30 40C30 35 35 30 40 30H160C165 30 170 35 170 40V50H30V40Z" fill="#2a313b" stroke="#363f4b" strokeWidth="1" />
          <path d="M30 44H170" stroke="#161a20" strokeWidth="2" strokeDasharray="4 2" />

          {/* Pouch Main Body */}
          <path d="M30 50L36 215C36 220 40 224 45 224H155C160 224 164 220 164 215L170 50H30Z" fill="url(#pouchGrad)" stroke="#2f3742" strokeWidth="1.5" />

          {/* Gloss reflection */}
          <path d="M44 60L48 205" stroke="white" strokeOpacity="0.08" strokeWidth="3" strokeLinecap="round" />

          {/* Cyan Energy Ribbon */}
          <rect x="42" y="70" width="116" height="20" fill="url(#cyanSheen)" rx="2" />
          <text x="100" y="84" fill="#00363d" fontSize="10" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle" letterSpacing="0.08em">
            RAW HYDRATION
          </text>

          {/* Main Title */}
          <text x="100" y="118" fill="#ffffff" fontSize="16" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle">
            ELECTRO
          </text>
          <text x="100" y="132" fill="#00e3fd" fontSize="10" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle" letterSpacing="0.1em">
            HYDRATE RAW
          </text>

          {/* Flavor Callout */}
          <rect x="48" y="142" width="104" height="18" fill="#1c2025" rx="3" stroke="#00e3fd" strokeWidth="0.8" />
          <text x="100" y="154" fill="#bdf4ff" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" textAnchor="middle">
            CITRUS LIME • 30 PACKETS
          </text>

          {/* Electrolyte Badges */}
          <g transform="translate(52, 172)">
            <text x="20" y="10" fill="#00e3fd" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">1000MG</text>
            <text x="20" y="18" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">SODIUM</text>

            <text x="76" y="10" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">200MG</text>
            <text x="76" y="18" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">POTASSIUM</text>
          </g>
        </svg>
      </div>
    );
  }

  if (type === 'shaker') {
    return (
      <div className={`relative flex items-center justify-center select-none ${className}`}>
        <svg viewBox="0 0 180 240" className="w-full h-full max-h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shakerBody" x1="20" y1="60" x2="160" y2="220" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#2c3038" />
              <stop offset="40%" stopColor="#1a1d22" />
              <stop offset="100%" stopColor="#0f1216" />
            </linearGradient>
            <linearGradient id="capGrad" x1="30" y1="20" x2="150" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1c2026" />
              <stop offset="100%" stopColor="#0e1014" />
            </linearGradient>
          </defs>

          {/* Shaker Flip Cap */}
          <path d="M72 16H108C112 16 115 19 115 23V30H65V23C65 19 68 16 72 16Z" fill="#c3f400" />
          <path d="M82 22H98" stroke="#161e00" strokeWidth="2" strokeLinecap="round" />

          {/* Shaker Main Lid */}
          <path d="M40 30H140L146 54H34L40 30Z" fill="url(#capGrad)" stroke="#38404c" strokeWidth="1.5" />
          <rect x="36" y="48" width="108" height="6" fill="#13161c" />

          {/* Shaker Bottle Body (Tapered) */}
          <path d="M44 54L54 212C55 218 60 222 66 222H114C120 222 125 218 126 212L136 54H44Z" fill="url(#shakerBody)" stroke="#323843" strokeWidth="1.5" />

          {/* Subtle Grip Ridges */}
          <line x1="50" y1="80" x2="130" y2="80" stroke="#1c2026" strokeWidth="2" />
          <line x1="52" y1="92" x2="128" y2="92" stroke="#1c2026" strokeWidth="2" />

          {/* Etched Volt Apex Logo */}
          <g transform="translate(62, 115)">
            <path d="M28 0L48 38H8L28 0Z" fill="none" stroke="#c3f400" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M28 14L38 34H18L28 14Z" fill="#c3f400" />
            <text x="28" y="52" fill="#e0e2ea" fontSize="8" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle" letterSpacing="0.15em">
              APEX LABS
            </text>
            <text x="28" y="62" fill="#8e9379" fontSize="6" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
              28 OZ / 800 ML
            </text>
          </g>

          {/* Stainless Steel Sheen */}
          <path d="M52 64L60 210" stroke="white" strokeOpacity="0.12" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // pre-work
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg viewBox="0 0 200 240" className="w-full h-full max-h-full drop-shadow-[0_12px_20px_rgba(0,0,0,0.7)]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="preTub" x1="20" y1="40" x2="180" y2="220" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#252a32" />
            <stop offset="50%" stopColor="#14181d" />
            <stop offset="100%" stopColor="#0b0e12" />
          </linearGradient>
        </defs>

        {/* Pre-workout Tub Lid */}
        <rect x="44" y="24" width="112" height="22" rx="3" fill="#2d333c" stroke="#3d4653" strokeWidth="1.2" />
        <line x1="48" y1="28" x2="152" y2="28" stroke="#485363" strokeWidth="1" />

        {/* Tub Body */}
        <rect x="36" y="46" width="128" height="164" rx="6" fill="url(#preTub)" stroke="#2e3540" strokeWidth="1.5" />

        {/* Volt Energy Splash Pattern */}
        <path d="M38 72H162V100H38V72Z" fill="#c3f400" />
        <text x="100" y="91" fill="#161e00" fontSize="12" fontWeight="800" fontFamily="Space Grotesk, sans-serif" textAnchor="middle" letterSpacing="0.08em">
          IGNITION PRE-WORK
        </text>

        {/* Flavor & Servings */}
        <text x="100" y="126" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="Space Grotesk, sans-serif" textAnchor="middle">
          SOUR APPLE CRUSH
        </text>
        <text x="100" y="142" fill="#00daf3" fontSize="9" fontWeight="600" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          40 HIGH-ENERGY SERVINGS
        </text>

        {/* Key Actives */}
        <g transform="translate(48, 160)">
          <rect x="0" y="0" width="30" height="20" rx="2" fill="#1c2025" />
          <text x="15" y="10" fill="#c3f400" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">6000MG</text>
          <text x="15" y="17" fill="#8e9379" fontSize="5" fontFamily="JetBrains Mono, monospace" textAnchor="middle">CITRULLINE</text>

          <rect x="37" y="0" width="30" height="20" rx="2" fill="#1c2025" />
          <text x="52" y="10" fill="#ffffff" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">3200MG</text>
          <text x="52" y="17" fill="#8e9379" fontSize="5" fontFamily="JetBrains Mono, monospace" textAnchor="middle">B-ALANINE</text>

          <rect x="74" y="0" width="30" height="20" rx="2" fill="#1c2025" />
          <text x="89" y="10" fill="#00daf3" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace" textAnchor="middle">350MG</text>
          <text x="89" y="17" fill="#8e9379" fontSize="5" fontFamily="JetBrains Mono, monospace" textAnchor="middle">CAFFEINE</text>
        </g>
      </svg>
    </div>
  );
};
