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
        name: 'Masal Avcısı',
        oldPrice: '₺149,99',
        price: '₺99,99',
        period: '/Hafta',
        savingsBadge: 'Haftada ₺50,00 tasarruf et',
        description: 'Hareket halindeki masalcılar için ideal, haftalık 10 masal oluştur ve premium özellikleri keşfet.',
        cta: 'Şimdi Satın Al',
        features: [
          'Haftalık 10 yapay zeka destekli masal oluştur',
          'Tüm masal türlerine ve temalarına sınırsız erişim',
          'Premium görsel tarzlara erişim',
          'Her sahne için benzersiz görseller',
          'Her masal için 25 sahne',
          'Sınırsız masalı toplulukta yayınla',
          'Reklamsız deneyimin keyfini çıkar'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'monthly',
        name: 'Usta Masalcı',
        oldPrice: '₺499,99',
        price: '₺299,99',
        period: '/Ay',
        savingsBadge: 'Aylık ₺200,00 tasarruf et',
        description: 'En popüler tercih. Her gün yeni hikayeler üret, çocuk profilleriyle ilerlemeyi takip et.',
        cta: 'Aylığı Başlat',
        badge: 'En Popüler',
        features: [
          'Aylık 45 yapay zeka destekli masal',
          'Tüm interaktif hikaye dallarına tam erişim',
          'Sınırsız ses ve müzik seçeneği',
          'Ebeveyn raporları ve okuma istatistikleri',
          'Öncelikli üretim kuyruğu',
          'Yeni çıkan özelliklere erken erişim',
          'Reklamsız ve kesintisiz kullanım'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'yearly',
        name: 'Aile Büyüsü',
        oldPrice: '₺3.999,99',
        price: '₺2.499,99',
        period: '/Yıl',
        savingsBadge: 'Yıllık ₺1.500,00 tasarruf et',
        description: 'Aileler için en ekonomik plan. Çoklu profil, uzun dönem takip ve tüm premium içerik bir arada.',
        cta: 'Yıllığı Başlat',
        features: [
          'Yıllık 600 yapay zeka destekli masal',
          '5 farklı çocuk profili oluşturma',
          'Hikaye haritası ve rozet takibinde detaylı görünüm',
          'Sınırsız kapak ve sahne görsel stili',
          'Tüm premium seslendirme seçenekleri',
          'Öncelikli teknik destek',
          'Otomatik yenileme öncesi hatırlatma'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ]
    : [
      {
        id: 'weekly',
        name: 'Story Hunter',
        oldPrice: '$4.99',
        price: '$2.99',
        period: '/Week',
        savingsBadge: 'Save $2.00 every week',
        description: 'Great for active readers. Generate 10 stories per week and unlock premium features.',
        cta: 'Buy Now',
        features: [
          'Create 10 AI-powered stories weekly',
          'Unlimited access to all themes',
          'Premium illustration styles',
          'Unique images for each scene',
          'Up to 25 scenes per story',
          'Publish unlimited stories to community',
          'Ad-free reading experience'
        ],
        cardGradient: 'from-[#27145d] to-[#1a0f43]',
        buttonGradient: 'from-[#3f33ff] to-[#7e35ff]'
      },
      {
        id: 'monthly',
        name: 'Story Master',
        oldPrice: '$19.99',
        price: '$11.99',
        period: '/Month',
        savingsBadge: 'Save $8.00 every month',
        description: 'Most popular. Generate fresh stories daily and track progress with child profiles.',
        cta: 'Start Monthly',
        badge: 'Most Popular',
        features: [
          '45 AI-powered stories each month',
          'Full access to interactive branching stories',
          'Unlimited voice and music options',
          'Parent insights and reading analytics',
          'Priority generation queue',
          'Early access to new features',
          'No ads, no interruptions'
        ],
        cardGradient: 'from-[#201455] to-[#160b3e]',
        buttonGradient: 'from-[#5a39ff] to-[#9a40ff]'
      },
      {
        id: 'yearly',
        name: 'Family Magic',
        oldPrice: '$119.99',
        price: '$79.99',
        period: '/Year',
        savingsBadge: 'Save $40.00 yearly',
        description: 'Best value for families. Multi-profile access, long-term tracking, and full premium content.',
        cta: 'Start Yearly',
        features: [
          '600 AI-powered stories yearly',
          'Create up to 5 child profiles',
          'Detailed map and badge progression tracking',
          'Unlimited cover and scene style options',
          'All premium voice narrators',
          'Priority support',
          'Renewal reminder before billing'
        ],
        cardGradient: 'from-[#1d1450] to-[#130a36]',
        buttonGradient: 'from-[#6a3cff] to-[#b14bff]'
      }
    ];

  const activePlan = plans.find((plan) => plan.id === selectedPlan) || plans[0];

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-bg-dark text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(127,19,236,0.25),transparent_42%),radial-gradient(circle_at_82%_20%,rgba(238,140,43,0.08),transparent_45%)]" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 pb-2">
        <div className="text-left">
          <p className="text-xs text-white/55">
            {isTr ? 'Premium' : 'Premium'}
          </p>
          <p className="text-[11px] text-white/35">
            {isTr ? 'Yükseltme seçenekleri' : 'Upgrade options'}
          </p>
        </div>
        <button
          onClick={onBack}
          className="size-10 rounded-full bg-white/5 text-white hover:bg-white/10 active:scale-95"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="relative z-10 flex-1 overflow-y-auto pb-8">
        <div className="px-5 pb-3">
          <h1 className="text-center text-2xl font-bold tracking-tight">
            {isTr ? 'Premium Masal Planları' : 'Premium Story Plans'}
          </h1>
          <p className="mt-2 text-center text-sm text-white/60">
            {isTr
              ? 'Aşağıdaki planlardan birini seç, masal dünyasının kilidini aç.'
              : 'Choose a plan below and unlock your full story world.'}
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 px-4 pb-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                selectedPlan === plan.id
                  ? 'bg-secondary text-white'
                  : 'bg-white/8 text-white/70 hover:bg-white/12'
              }`}
            >
              {plan.name}
            </button>
          ))}
        </div>

        <div className="px-4">
          <article className={`relative rounded-3xl border border-white/15 bg-gradient-to-b ${activePlan.cardGradient} p-5 shadow-[0_12px_30px_rgba(0,0,0,0.28)]`}>
            {activePlan.badge && (
              <div className="absolute right-4 top-4 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold">
                {activePlan.badge}
              </div>
            )}

            <h2 className="text-2xl font-bold tracking-tight">{activePlan.name}</h2>

            <div className="mt-3">
              {activePlan.oldPrice && (
                <p className="text-sm text-white/45 line-through">{activePlan.oldPrice}</p>
              )}
              <div className="mt-1 flex items-end gap-1.5">
                <span className="text-4xl font-extrabold leading-none">{activePlan.price}</span>
                <span className="pb-0.5 text-base text-white/65">{activePlan.period}</span>
              </div>
            </div>

            <div className="mt-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/90">
              {activePlan.savingsBadge}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-white/85">
              {activePlan.description}
            </p>

            <button
              className={`mt-5 w-full rounded-full bg-gradient-to-r py-3 text-base font-bold text-white shadow-[0_10px_20px_rgba(92,64,255,0.28)] active:scale-[0.98] ${activePlan.buttonGradient}`}
            >
              {activePlan.cta}
            </button>

            <ul className="mt-5 space-y-2.5 text-sm text-white/90">
              {activePlan.features.map((feature) => (
                <li key={`${activePlan.id}-${feature}`} className="flex items-start gap-2">
                  <span className="pt-0.5 text-xs">✦</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 border-t border-white/15 pt-3 text-center text-xs text-white/65">
              {isTr ? 'Otomatik yenilenir, dilediğinde iptal et' : 'Auto renews, cancel anytime'}
            </div>
          </article>
        </div>

        <div className="mt-4 px-6 text-center text-[11px] text-white/45">
          {isTr
            ? 'Ödeme App Store/Google Play üzerinden güvenli şekilde alınır. Fiyatlar bölgeye göre değişebilir.'
            : 'Payments are securely processed by App Store/Google Play. Prices may vary by region.'}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
