/**
 * RevenueCat purchase service
 *
 * Real behavior:
 * - If VITE_REVENUECAT_KEY is missing, app stays in mock/test mode.
 * - If VITE_REVENUECAT_KEY is present, the Web Billing SDK is configured and
 *   purchases use RevenueCat's checkout flow.
 *
 * Notes:
 * - The configured key must be a RevenueCat Web Billing public key.
 * - Offerings/products must already exist in the RevenueCat dashboard.
 */

export type PurchasePackageId = 'monthly' | 'yearly';

export interface PurchasePackage {
  id: PurchasePackageId;
  price: string;
  priceTr: string;
  period: string;
  tier: 'pro' | 'family';
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

const STORAGE_KEY = 'storyteller-revenuecat-app-user-id';
const OFFERING_PACKAGE_CANDIDATES: Record<PurchasePackageId, string[]> = {
  monthly: ['$rc_monthly', 'monthly', 'pro', 'pro_monthly'],
  yearly: ['$rc_annual', 'annual', 'yearly', 'family', 'family_yearly'],
};

function getRevenueCatKey(): string | undefined {
  return import.meta.env.VITE_REVENUECAT_KEY?.trim() || undefined;
}

export function isConfigured(): boolean {
  return !!getRevenueCatKey();
}

export function isMockMode(): boolean {
  return !isConfigured();
}

function getOrCreateAppUserId(): string {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const generated = `storyteller-${crypto.randomUUID()}`;
  localStorage.setItem(STORAGE_KEY, generated);
  return generated;
}

async function getPurchasesInstance(): Promise<any | null> {
  const apiKey = getRevenueCatKey();
  if (!apiKey) return null;

  const module = await import('@revenuecat/purchases-js');
  const Purchases = module.Purchases;
  if (Purchases.isConfigured()) {
    return Purchases.getSharedInstance();
  }

  return Purchases.configure({
    apiKey,
    appUserId: getOrCreateAppUserId(),
  });
}

function findRevenueCatPackage(offering: any, packageId: PurchasePackageId): any | null {
  if (!offering) return null;

  for (const candidate of OFFERING_PACKAGE_CANDIDATES[packageId]) {
    if (offering.packagesById?.[candidate]) return offering.packagesById[candidate];
    if (offering[candidate]) return offering[candidate];
  }

  const availablePackages = Array.isArray(offering.availablePackages) ? offering.availablePackages : [];
  if (packageId === 'monthly') {
    return availablePackages.find((pkg: any) => {
      const identifier = String(pkg?.identifier || '').toLowerCase();
      return identifier.includes('month') || identifier.includes('pro');
    }) || null;
  }

  return availablePackages.find((pkg: any) => {
    const identifier = String(pkg?.identifier || '').toLowerCase();
    return identifier.includes('year') || identifier.includes('annual') || identifier.includes('family');
  }) || null;
}

function getLocalizedPrice(rcPackage: any): string {
  return rcPackage?.webBillingProduct?.price?.formattedPrice
    || rcPackage?.rcBillingProduct?.currentPrice?.formattedPrice
    || rcPackage?.webBillingProduct?.currentPrice?.formattedPrice
    || '';
}

function hasActiveProduct(customerInfo: any, packageId: PurchasePackageId): boolean {
  const productHints = packageId === 'monthly'
    ? ['month', 'monthly', 'pro']
    : ['year', 'annual', 'family'];

  const subscriptions = customerInfo?.subscriptionsByProductIdentifier || {};
  return Object.entries(subscriptions).some(([productId, sub]: [string, any]) => {
    if (!sub?.isActive) return false;
    const lower = productId.toLowerCase();
    return productHints.some((hint) => lower.includes(hint));
  });
}

export async function getOfferings(): Promise<PurchasePackage[]> {
  const purchases = await getPurchasesInstance();
  if (!purchases) {
    return PACKAGES;
  }

  try {
    const offerings = await purchases.getOfferings();
    const current = offerings?.current;
    if (!current) return PACKAGES;

    return PACKAGES.map((pkg) => {
      const rcPackage = findRevenueCatPackage(current, pkg.id);
      const livePrice = getLocalizedPrice(rcPackage);
      return livePrice
        ? { ...pkg, price: livePrice, priceTr: livePrice }
        : pkg;
    });
  } catch (error) {
    console.error('RevenueCat getOfferings failed, falling back to static packages:', error);
    return PACKAGES;
  }
}

export async function purchasePackage(pkg: PurchasePackage): Promise<PurchaseResult> {
  const purchases = await getPurchasesInstance();
  if (!purchases) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, tier: pkg.tier };
  }

  try {
    const offerings = await purchases.getOfferings();
    const current = offerings?.current;
    const rcPackage = findRevenueCatPackage(current, pkg.id);

    if (!rcPackage) {
      return {
        success: false,
        error: `RevenueCat offering package not found for ${pkg.id}`,
      };
    }

    await purchases.purchasePackage(rcPackage);
    return {
      success: true,
      tier: pkg.tier,
    };
  } catch (error: any) {
    const message = error?.message || 'RevenueCat purchase failed';
    console.error('RevenueCat purchase failed:', error);
    return {
      success: false,
      error: message,
    };
  }
}

export async function restorePurchases(): Promise<RestoreResult> {
  const purchases = await getPurchasesInstance();
  if (!purchases) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { isPro: false };
  }

  try {
    const customerInfo = await purchases.getCustomerInfo();

    if (hasActiveProduct(customerInfo, 'yearly')) {
      return { isPro: true, tier: 'family' };
    }

    if (hasActiveProduct(customerInfo, 'monthly')) {
      return { isPro: true, tier: 'pro' };
    }

    return { isPro: false };
  } catch (error) {
    console.error('RevenueCat restore/status check failed:', error);
    return { isPro: false };
  }
}
