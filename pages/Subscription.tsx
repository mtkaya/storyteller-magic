import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SubscriptionProps {
  onBack: () => void;
}

interface PremiumPlan {
  id: string;
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
  const isTr = language === 'tr';
  const [selectedPlan, setSelectedPlan] = useState<string>('weekly');

  const plans: PremiumPlan[] = isTr
    ? [
      {
        id: 'weekly',
        name: 'Masal Başlangıç',
        oldPrice: '₺149,99',
        price: '₺99,99',
        period: '/Hafta',
        savingsBadge: 'Yeni başlayanlar için haftalık paket',
        description: 'Düzenli okumaya giriş için ideal plan. Her hafta yeni masallar üretip pro araçları dene.',
        cta: 'Paketi Etkinleştir',
        features: [
          'Haftalık 10 yapay zeka masalı oluştur',
          'Tüm tema türleri açılır',
          'Gelişmiş görsel stil seçenekleri',
          'Her sahne için özgün görseller',
          'Masal başına 25 sahne limiti',
          'Toplulukta paylaşım erişimi',
          'Reklamsız okuma deneyimi'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'monthly',
        name: 'Hayal Atölyesi',
        oldPrice: '₺499,99',
        price: '₺299,99',
        period: '/Ay',
        savingsBadge: 'Aylık üretimde en dengeli seçenek',
        description: 'Her gün masal üreten aileler için önerilen plan. Üretim, takip ve kişiselleştirme bir arada.',
        cta: "Pro'yu Aç",
        badge: 'Önerilen Plan',
        features: [
          'Aylık 45 yapay zeka masalı',
          'Tüm interaktif hikaye yolları',
          'Ses ve müzik paketlerinin tamamı',
          'Ebeveyn içgörüleri ve okuma analizi',
          'Öncelikli üretim kuyruğu',
          'Yeni özelliklere erken erişim',
          'Kesintisiz reklamsız kullanım'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'yearly',
        name: 'Aile Kulübü',
        oldPrice: '₺3.999,99',
        price: '₺2.499,99',
        period: '/Yıl',
        savingsBadge: 'En yüksek tasarruflu yıllık plan',
        description: 'Uzun vadeli kullanım için tam paket. Çoklu profil, derin takip ve tüm pro içerikler tek planda.',
        cta: 'Aile Planını Aç',
        features: [
          'Yıllık 600 yapay zeka masalı',
          '5 ayrı çocuk profili',
          'Harita ve rozet ilerleme görünümü',
          'Sınırsız kapak/sahne stili',
          'Tüm pro seslendirme seçenekleri',
          'Öncelikli teknik destek',
          'Yenileme öncesi bilgilendirme'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ]
    : [
      {
        id: 'weekly',
        name: 'Story Start',
        oldPrice: '$4.99',
        price: '$2.99',
        period: '/Week',
        savingsBadge: 'Starter weekly pack',
        description: 'A light plan for consistent bedtime reading and trying out pro tools.',
        cta: 'Activate Plan',
        features: [
          '10 AI stories each week',
          'Access to all story themes',
          'Advanced illustration styles',
          'Unique visuals per scene',
          'Up to 25 scenes per story',
          'Community publishing access',
          'Ad-free reading'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'monthly',
        name: 'Dream Studio',
        oldPrice: '$19.99',
        price: '$11.99',
        period: '/Month',
        savingsBadge: 'Balanced monthly value',
        description: 'Recommended for daily creators: generation, personalization, and family tracking in one plan.',
        cta: 'Unlock Pro',
        badge: 'Recommended',
        features: [
          '45 AI stories monthly',
          'Full interactive story paths',
          'Complete voice and music packs',
          'Parent insights and analytics',
          'Priority generation queue',
          'Early access to new features',
          'No ads or interruptions'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'yearly',
        name: 'Family Circle',
        oldPrice: '$119.99',
        price: '$79.99',
        period: '/Year',
        savingsBadge: 'Best yearly savings',
        description: 'Full long-term package for families with multi-profile access and complete pro content.',
        cta: 'Unlock Family',
        features: [
          '600 AI stories yearly',
          'Create up to 5 child profiles',
          'Detailed map and badge tracking',
          'Unlimited cover and scene styles',
          'All pro narration voices',
          'Priority support',
          'Renewal reminders'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ];

  const activePlan = plans.find((plan) => plan.id === selectedPlan) || plans[0];

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
            {isTr ? 'Pro Masal Planları' : 'Pro Story Plans'}
          </h1>
          <p className="mt-1.5 text-center text-[13px] text-white/58 leading-relaxed">
            {isTr
              ? 'Aşağıdaki planlardan birini seç, masal dünyasının kilidini aç.'
              : 'Choose a plan below and unlock your full story world.'}
          </p>
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
              className={`mt-4 w-full rounded-full bg-gradient-to-r py-2.5 text-[15px] font-semibold text-white shadow-[0_8px_16px_rgba(92,64,255,0.22)] active:scale-[0.98] ${activePlan.buttonGradient}`}
            >
              {activePlan.cta}
            </button>

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
      </div>
    </div>
  );
};

export default Subscription;
