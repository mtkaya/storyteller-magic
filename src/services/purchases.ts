/**
 * RevenueCat-ready purchase service
 *
 * If VITE_REVENUECAT_KEY is set, this will use real RevenueCat SDK (not implemented yet)
 * If not set, operates in mock mode for development and testing
 */

export type PurchasePackageId = 'monthly' | 'yearly';

export interface PurchasePackage {
  id: PurchasePackageId;
  price: string;      // Localized price (e.g., "$11.99")
  priceTr: string;    // Turkish price (e.g., "₺299,99")
  period: string;     // "month" or "year"
  tier: 'pro' | 'family';  // Maps to subscription tier
}

export interface PurchaseResult {
  success: boolean;
  error?: string;
  tier?: 'pro' | 'family';
}

export interface RestoreResult {
  isPro: boolean;
  tier?: 'pro' | 'family';
}

// Available packages
export const PACKAGES: PurchasePackage[] = [
  {
    id: 'monthly',
    price: '$11.99',
    priceTr: '₺299,99',
    period: 'month',
    tier: 'pro'
  },
  {
    id: 'yearly',
    price: '$79.99',
    priceTr: '₺2.499,99',
    period: 'year',
    tier: 'family'
  }
];

/**
 * Check if RevenueCat is properly configured
 */
export function isConfigured(): boolean {
  return !!import.meta.env.VITE_REVENUECAT_KEY;
}

/**
 * Get available subscription packages
 */
export async function getOfferings(): Promise<PurchasePackage[]> {
  if (isConfigured()) {
    // TODO: When RevenueCat SDK is integrated, fetch real offerings
    // const offerings = await Purchases.getOfferings();
    // return parseOfferings(offerings);
    console.warn('RevenueCat SDK not yet integrated, returning mock packages');
  }

  // Mock mode: return static packages
  return Promise.resolve(PACKAGES);
}

/**
 * Purchase a subscription package
 */
export async function purchasePackage(pkg: PurchasePackage): Promise<PurchaseResult> {
  if (isConfigured()) {
    // TODO: When RevenueCat SDK is integrated, make real purchase
    // try {
    //   const result = await Purchases.purchasePackage(pkg.id);
    //   return {
    //     success: true,
    //     tier: pkg.tier
    //   };
    // } catch (error) {
    //   return {
    //     success: false,
    //     error: error.message
    //   };
    // }
    console.warn('RevenueCat SDK not yet integrated, simulating purchase');
  }

  // Mock mode: simulate successful purchase after delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return {
    success: true,
    tier: pkg.tier
  };
}

/**
 * Restore previous purchases
 */
export async function restorePurchases(): Promise<RestoreResult> {
  if (isConfigured()) {
    // TODO: When RevenueCat SDK is integrated, restore real purchases
    // try {
    //   const customerInfo = await Purchases.restorePurchases();
    //   const activeTier = getActiveTier(customerInfo);
    //   return {
    //     isPro: activeTier !== 'free',
    //     tier: activeTier !== 'free' ? activeTier : undefined
    //   };
    // } catch (error) {
    //   console.error('Restore failed:', error);
    //   return { isPro: false };
    // }
    console.warn('RevenueCat SDK not yet integrated, simulating restore');
  }

  // Mock mode: no purchases to restore
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    isPro: false
  };
}
