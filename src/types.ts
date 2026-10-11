export type ScreenType = 'home' | 'product' | 'cart' | 'lab';

export interface CartItem {
  id: string;
  name: string;
  subtitle: string;
  flavor: string;
  size: string;
  badge?: string;
  price: number;
  originalPrice?: number;
  isSubscription: boolean;
  intervalWeeks?: number;
  quantity: number;
  imageType: 'hydro-iso' | 'electro' | 'shaker' | 'pre-work';
}

export interface FlavorOption {
  id: string;
  name: string;
  badge: string;
  color: string;
  caffeineNotice?: string;
}

export interface SizeOption {
  id: string;
  weight: string;
  servings: string;
  regularPrice: number;
  subPrice: number;
  savingsBadge?: string;
  pricePerServing: string;
}

export interface BatchAssayData {
  lotId: string;
  productName: string;
  subTitle: string;
  assayDate: string;
  status: 'PASSED' | 'FAILED';
  proteinTested: string;
  proteinLabel: string;
  proteinDelta: string;
  heavyMetals: string;
  heavyMetalsDetail: string;
  bannedSubstances: string;
  bannedSubstancesDetail: string;
  spectrometry: string;
  hplcBioActive: string;
}

export interface AminoAcidEntry {
  name: string;
  amountMg: number;
  type?: 'eaa' | 'bcaa' | 'cond' | 'non-ess';
}

export interface AthleteProfile {
  name: string;
  membershipId: string;
  tier: string;
  avatarUrl: string;
  activeSubscriptions: number;
  rewardsPoints: number;
  currentGoal: string;
}
