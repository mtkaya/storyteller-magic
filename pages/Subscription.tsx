import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SubscriptionTier, useAppState } from '../context/AppStateContext';
import { purchasePackage, restorePurchases, isMockMode, type PurchasePackage } from '../src/services/purchases';

interface SubscriptionProps {
  onBack: () => void;
}

interface PremiumPlan {
  id: SubscriptionTier;
  name: string;
  oldPrice?: string;
  price: string;
  period: string;
  savingsBadge: string;
  description: string;
  cta: string;
  badge?: string;
  features: string[];
  cardGradient: string;
  buttonGradient: string;
}

const Subscription: React.FC<SubscriptionProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const { subscription, setSubscriptionTier } = useAppState();
  const isTr = language === 'tr';
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionTier>(subscription.tier);
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mockMode = isMockMode();

  const plans: PremiumPlan[] = isTr
    ? [
      {
        id: 'free',
        name: 'Serbest',
        price: '₺0',
        period: '/Ay',
        savingsBadge: 'Temel kullanım',
        description: 'Başlangıç için yeterli temel plan. Günlük sınırlı üretim ve çekirdek okuma deneyimi sunar.',
        cta: 'Serbest Planı Kullan',
        features: [
          'Günlük 3 yeni hikaye üretimi',
          '1 çocuk profili',
          'Yerel hikaye havuzu',
          'Temel ses/müzik desteği',
          'İnteraktif hikayelerde sınırlı derinlik'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'pro',
        name: 'Pro',
        oldPrice: '₺499,99',
        price: '₺299,99',
        period: '/Ay',
        savingsBadge: 'En popüler plan',
        description: 'Düzenli kullanım için dengeli plan. Daha geniş hikaye seçkisi, daha iyi rotasyon ve daha yüksek günlük kota sunar.',
        cta: "Pro'yu Aç",
        badge: 'Önerilen Plan',
        features: [
          'Günlük 20 yeni hikaye üretimi',
          '2 çocuk profili',
          'Gelişmiş interaktif dallanma',
          'Öncelikli hikaye havuzu rotasyonu',
          'Tam ses/müzik paketleri',
          'Gelişmiş ebeveyn analizi'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'family',
        name: 'Aile Kulübü',
        oldPrice: '₺3.999,99',
        price: '₺2.499,99',
        period: '/Yıl',
        savingsBadge: 'Aile paketi',
        description: 'Birden fazla çocuk için tasarlandı. Profil bazlı takip, daha yüksek kapasite ve aile kullanımına uygun akış sağlar.',
        cta: 'Aile Planını Aç',
        features: [
          'Günlük 60 yeni hikaye üretimi',
          '5 ayrı çocuk profili',
          'Profil bazlı tekrar engelleme',
          'Tam harita + rozet + raporlama',
          'Tüm Pro özellikleri',
          'Öncelikli destek'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ]
    : [
      {
        id: 'free',
        name: 'Free',
        price: '$0',
        period: '/Month',
        savingsBadge: 'Starter access',
        description: 'A simple starter plan with limited daily generation and the core reading experience.',
        cta: 'Use Free Plan',
        features: [
          '3 new stories per day',
          '1 child profile',
          'Local story-vault access',
          'Basic audio/music support',
          'Limited interactive depth'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'pro',
        name: 'Pro',
        oldPrice: '$19.99',
        price: '$11.99',
        period: '/Month',
        savingsBadge: 'Most popular',
        description: 'A balanced plan for regular use with more variety, better rotation, and richer branching.',
        cta: 'Activate Pro',
        badge: 'Recommended',
        features: [
          '20 new stories per day',
          '2 child profiles',
          'Advanced interactive branching',
          'Priority vault rotation',
          'Full audio/music packs',
          'Parent insights and analytics'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'family',
        name: 'Family Circle',
        oldPrice: '$119.99',
        price: '$79.99',
        period: '/Year',
        savingsBadge: 'Family tier',
        description: 'Built for families with multiple profiles, higher capacity, and fuller tracking.',
        cta: 'Unlock Family',
        features: [
          '60 new stories per day',
          'Up to 5 child profiles',
          'Per-profile no-repeat logic',
          'Complete map, badges, and reports',
          'All Pro features',
          'Priority support'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ];

  const activePlan = plans.find((plan) => plan.id === selectedPlan) || plans[0];

  const handlePurchase = async () => {
    if (activePlan.id === 'free') {
      setSubscriptionTier('free');
      setSavedNotice(isTr ? 'Plan kaydedildi' : 'Plan saved');
      setTimeout(() => setSavedNotice(null), 1800);
      return;
    }

    setIsLoading(true);
    try {
      // Map plan to purchase package
      const packageId: 'monthly' | 'yearly' = activePlan.id === 'pro' ? 'monthly' : 'yearly';
      const pkg: PurchasePackage = {
        id: packageId,
        price: activePlan.price,
        priceTr: activePlan.price,
        period: activePlan.id === 'pro' ? 'month' : 'year',
        tier: activePlan.id as 'pro' | 'family'
      };

      const result = await purchasePackage(pkg);

      if (result.success && result.tier) {
        setSubscriptionTier(result.tier);
        setSavedNotice(isTr ? '✨ Abonelik aktif!' : '✨ Subscription active!');
        setTimeout(() => setSavedNotice(null), 2500);
      } else {
        setSavedNotice(result.error || (isTr ? '❌ Satın alma başarısız' : '❌ Purchase failed'));
        setTimeout(() => setSavedNotice(null), 3000);
      }
    } catch (error) {
      setSavedNotice(isTr ? '❌ Bir hata oluştu' : '❌ An error occurred');
      setTimeout(() => setSavedNotice(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestore = async () => {
    setIsLoading(true);
    try {
      const result = await restorePurchases();
      if (result.isPro && result.tier) {
        setSubscriptionTier(result.tier);
        setSavedNotice(isTr ? '✨ Satın alımlar geri yüklendi!' : '✨ Purchases restored!');
      } else {
        setSavedNotice(isTr ? 'Satın alım bulunamadı' : 'No purchases found');
      }
      setTimeout(() => setSavedNotice(null), 2500);
    } catch (error) {
      setSavedNotice(isTr ? '❌ Geri yükleme başarısız' : '❌ Restore failed');
      setTimeout(() => setSavedNotice(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(118,88,255,0.17),transparent_46%),radial-gradient(circle_at_84%_16%,rgba(238,140,43,0.05),transparent_50%)]" />

      {/* Header */}
      <div
        className="relative z-10 flex items-center justify-between px-4 pb-1.5"
        style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
      >
        <div className="text-left">
          <p className="text-[11px] uppercase tracking-[0.18em] text-white/45">
            {isTr ? 'Pro' : 'Pro'}
          </p>
          <p className="text-[11px] text-white/35 mt-0.5">
            {isTr ? 'Yükseltme seçenekleri' : 'Upgrade options'}
          </p>
        </div>
        <button
          onClick={onBack}
          className="size-10 rounded-full bg-white/5 text-white hover:bg-white/10 active:scale-95 touch-manipulation"
          style={{ touchAction: 'manipulation' }}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto pb-7">
        <div className="px-5 pb-2">
          <h1 className="text-center text-[27px] font-bold tracking-tight leading-tight">
            {isTr ? 'Storyteller Planları' : 'Storyteller Plans'}
          </h1>
          <p className="mt-1.5 text-center text-[13px] text-white/58 leading-relaxed">
            {isTr
              ? 'Ailen için doğru kapasiteyi seç: daha fazla hikaye, daha fazla profil, daha az tekrar.'
              : 'Choose the right capacity for your family: more stories, more profiles, less repetition.'}
          </p>

          {mockMode && (
            <div className="mt-3 mx-4 rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-3 py-2 text-center">
              <p className="text-[11px] text-yellow-200/90 leading-relaxed">
                🧪 {isTr ? 'Test modu — gerçek ödeme yok' : 'Test mode — no real payments'}
              </p>
            </div>
          )}
        </div>

        <div className="px-4 pb-3">
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`rounded-xl px-2 py-2 text-[11px] font-semibold transition-colors ${
                  selectedPlan === plan.id
                    ? 'bg-gradient-to-r from-primary/80 to-secondary/80 text-white shadow-[0_4px_14px_rgba(87,58,243,0.25)]'
                    : 'text-white/68 hover:bg-white/8'
                }`}
              >
                {plan.name}
              </button>
            ))}
          </div>
        </div>

        <div className="px-4">
          <article className={`relative rounded-2xl border border-white/14 bg-gradient-to-b ${activePlan.cardGradient} px-4 py-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.22)]`}>
            {activePlan.badge && (
              <div className="absolute right-3.5 top-3.5 rounded-full border border-white/15 bg-white/8 px-2 py-0.5 text-[10px] font-semibold text-white/90">
                {activePlan.badge}
              </div>
            )}

            <h2 className="text-[24px] font-semibold tracking-tight">{activePlan.name}</h2>

            <div className="mt-2.5">
              {activePlan.oldPrice && (
                <p className="text-[13px] text-white/42 line-through">{activePlan.oldPrice}</p>
              )}
              <div className="mt-0.5 flex items-end gap-1.5">
                <span className="text-[36px] font-bold leading-none">{activePlan.price}</span>
                <span className="pb-0.5 text-[15px] text-white/60">{activePlan.period}</span>
              </div>
            </div>

            <div className="mt-2.5 inline-flex rounded-full border border-white/15 bg-white/8 px-2.5 py-0.5 text-[10px] font-semibold text-white/90">
              {activePlan.savingsBadge}
            </div>

            <p className="mt-3 text-[13px] leading-relaxed text-white/82">
              {activePlan.description}
            </p>

            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className={`mt-4 w-full rounded-full bg-gradient-to-r py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_16px_rgba(92,64,255,0.22)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${activePlan.buttonGradient}`}
            >
              {isLoading ? (isTr ? 'İşleniyor...' : 'Processing...') : activePlan.cta}
            </button>
            {savedNotice && (
              <p className="mt-2 text-center text-xs text-green-200">{savedNotice}</p>
            )}

            <ul className="mt-4.5 grid grid-cols-1 gap-2 text-[13px] text-white/90">
              {activePlan.features.map((feature) => (
                <li key={`${activePlan.id}-${feature}`} className="flex items-start gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-2.5 py-1.5">
                  <span className="pt-0.5 text-[10px] text-accent-peach">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 border-t border-white/12 pt-2.5 text-center text-[11px] text-white/62">
              {isTr ? 'Otomatik yenilenir, dilediğinde iptal et' : 'Auto renews, cancel anytime'}
            </div>
          </article>
        </div>

        <div className="mt-3 px-6 text-center text-[10px] text-white/42 leading-relaxed">
          {isTr
            ? 'Ödeme App Store/Google Play üzerinden güvenli şekilde alınır. Fiyatlar bölgeye göre değişebilir.'
            : 'Payments are securely processed by App Store/Google Play. Prices may vary by region.'}
        </div>

        <div className="mt-4 px-4">
          <button
            onClick={handleRestore}
            disabled={isLoading}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-[13px] font-medium text-white/70 hover:bg-white/[0.06] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (isTr ? 'İşleniyor...' : 'Processing...') : (isTr ? 'Satın Alımları Geri Yükle' : 'Restore Purchases')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
