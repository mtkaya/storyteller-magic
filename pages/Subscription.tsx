import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SubscriptionProps {
  onBack: () => void;
}

const Subscription: React.FC<SubscriptionProps> = ({ onBack }) => {
  const { language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<string>('premium');

  const plans = [
    {
      id: 'free',
      name: language === 'tr' ? 'Ücretsiz' : 'Free',
      price: language === 'tr' ? '₺0' : '$0',
      period: language === 'tr' ? '/ay' : '/month',
      icon: '🌙',
      color: 'bg-white/5',
      features: [
        language === 'tr' ? '3 hikaye/gün' : '3 stories/day',
        language === 'tr' ? 'Temel temalar' : 'Basic themes',
        language === 'tr' ? 'Standart sesler' : 'Standard voices',
        language === 'tr' ? 'Reklamlı' : 'With ads',
      ],
      buttonText: language === 'tr' ? 'Mevcut Plan' : 'Current Plan',
      isPopular: false,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: language === 'tr' ? '₺99' : '$9.99',
      period: language === 'tr' ? '/ay' : '/month',
      icon: '⭐',
      color: 'bg-gradient-to-br from-primary/20 to-secondary/20',
      features: [
        language === 'tr' ? 'Sınırsız hikaye' : 'Unlimited stories',
        language === 'tr' ? 'Tüm temalar' : 'All themes',
        language === 'tr' ? 'Premium sesler' : 'Premium voices',
        language === 'tr' ? 'Reklamsız' : 'Ad-free',
        language === 'tr' ? 'Çevrimdışı mod' : 'Offline mode',
        language === 'tr' ? 'İnteraktif hikayeler' : 'Interactive stories',
      ],
      buttonText: language === 'tr' ? 'Şimdi Başla' : 'Start Now',
      isPopular: true,
    },
    {
      id: 'family',
      name: language === 'tr' ? 'Aile' : 'Family',
      price: language === 'tr' ? '₺149' : '$14.99',
      period: language === 'tr' ? '/ay' : '/month',
      icon: '👨‍👩‍👧‍👦',
      color: 'bg-gradient-to-br from-blue-500/20 to-purple-500/20',
      features: [
        language === 'tr' ? 'Tüm Premium özellikler' : 'All Premium features',
        language === 'tr' ? '5 çocuk profili' : '5 child profiles',
        language === 'tr' ? 'Ebeveyn raporları' : 'Parent reports',
        language === 'tr' ? 'Özel hikaye oluşturma' : 'Custom story creation',
        language === 'tr' ? 'Öncelikli destek' : 'Priority support',
      ],
      buttonText: language === 'tr' ? 'Aileyi Başlat' : 'Start Family',
      isPopular: false,
    },
  ];

  const premiumFeatures = [
    { icon: '✨', title: language === 'tr' ? 'AI Hikaye Oluşturma' : 'AI Story Creation', desc: language === 'tr' ? 'Kişiselleştirilmiş hikayeler' : 'Personalized adventures' },
    { icon: '🎮', title: language === 'tr' ? 'İnteraktif Maceralar' : 'Interactive Adventures', desc: language === 'tr' ? 'Seçimlerle hikaye' : 'Choose your path' },
    { icon: '🎵', title: language === 'tr' ? 'Premium Sesler' : 'Premium Audio', desc: language === 'tr' ? 'Profesyonel seslendirme' : 'Professional voices' },
    { icon: '📚', title: language === 'tr' ? 'Özel Koleksiyonlar' : 'Exclusive Collections', desc: language === 'tr' ? 'Sadece premium içerik' : 'Premium-only content' },
    { icon: '🌙', title: language === 'tr' ? 'Uyku Modu' : 'Sleep Mode', desc: language === 'tr' ? 'Gelişmiş uyku özellikleri' : 'Advanced sleep features' },
    { icon: '📊', title: language === 'tr' ? 'Detaylı Raporlar' : 'Detailed Reports', desc: language === 'tr' ? 'Öğrenme takibi' : 'Learning insights' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-bg-dark">
      {/* Header */}
      <div className="flex items-center p-4">
        <button onClick={onBack} className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white">
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        {/* Hero */}
        <div className="px-6 pb-6 text-center">
          <div className="inline-flex items-center justify-center size-20 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 mb-4">
            <span className="text-4xl">✨</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">
            {language === 'tr' ? 'Sihri Aç' : 'Unlock the Magic'}
          </h1>
          <p className="text-white/60 text-sm">
            {language === 'tr'
              ? 'Sınırsız hikaye oluştur ve hayal gücünü serbest bırak'
              : 'Create unlimited stories and let your imagination soar'}
          </p>
        </div>

        {/* Premium Features Grid */}
        <div className="px-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            {premiumFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white/5 rounded-xl p-3 border border-white/5">
                <span className="text-2xl mb-2 block">{feature.icon}</span>
                <h4 className="text-white font-bold text-sm">{feature.title}</h4>
                <p className="text-white/50 text-[10px]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="px-4 space-y-4">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative w-full rounded-2xl p-4 border text-left transition-all ${selectedPlan === plan.id
                  ? 'border-primary shadow-lg shadow-primary/20'
                  : plan.isPopular
                    ? 'border-secondary/50'
                    : 'border-white/10'
                } ${plan.color}`}
            >
              {plan.isPopular && (
                <div className="absolute -top-2 left-4 bg-secondary text-white text-[10px] font-bold px-3 py-0.5 rounded-full uppercase">
                  {language === 'tr' ? 'En Popüler' : 'Most Popular'}
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="size-12 rounded-full bg-white/10 flex items-center justify-center text-2xl">
                  {plan.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-white">{plan.price}</span>
                    <span className="text-xs text-white/50">{plan.period}</span>
                  </div>
                </div>
                <div className={`size-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id
                    ? 'border-primary bg-primary'
                    : 'border-white/30'
                  }`}>
                  {selectedPlan === plan.id && (
                    <span className="material-symbols-outlined text-sm text-white">check</span>
                  )}
                </div>
              </div>

              <ul className="mt-3 space-y-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs text-white/70">
                    <span className="material-symbols-outlined text-xs text-green-400">check</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="px-4 mt-6">
          <button className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30 hover:shadow-xl transition-all">
            {selectedPlan === 'free'
              ? (language === 'tr' ? 'Devam Et' : 'Continue')
              : (language === 'tr' ? 'Premium Başlat' : 'Start Premium')}
          </button>

          <p className="text-center text-white/40 text-[10px] mt-3">
            {language === 'tr'
              ? '7 gün ücretsiz deneme. İstediğin zaman iptal et.'
              : '7-day free trial. Cancel anytime.'}
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-6 mt-6 px-4">
          <div className="text-center">
            <span className="text-2xl">🔒</span>
            <p className="text-white/40 text-[10px]">{language === 'tr' ? 'Güvenli Ödeme' : 'Secure Payment'}</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">💯</span>
            <p className="text-white/40 text-[10px]">{language === 'tr' ? 'İade Garantisi' : 'Money Back'}</p>
          </div>
          <div className="text-center">
            <span className="text-2xl">⭐</span>
            <p className="text-white/40 text-[10px]">4.9 {language === 'tr' ? 'Puan' : 'Rating'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;