import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../data';
import { getIllustratedImageUrl } from '../services/illustrationCovers';

interface OnboardingProps {
    onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const { language, setLanguage } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const slides = [
        {
            image: IMAGES.MAGIC_QUILL,
            icon: '✦',
            title: language === 'tr' ? 'Kişisel Uyku Hikayeleri' : 'Personalized Bedtime Stories',
            description: language === 'tr'
                ? 'Tema, ton ve süre seçerek her geceye uygun hikaye oluştur.'
                : 'Create stories that match the theme, tone, and length you want for the night.',
        },
        {
            image: IMAGES.FLYING_CARPET,
            icon: '➜',
            title: language === 'tr' ? 'İnteraktif Akış' : 'Interactive Story Flow',
            description: language === 'tr'
                ? 'Çocuk hikayenin yönünü seçimleriyle belirlesin.'
                : 'Let the child shape the story with simple choices.',
        },
        {
            image: IMAGES.SLEEPING_CLOUD,
            icon: '☾',
            title: language === 'tr' ? 'Sakin Gece Deneyimi' : 'A Calmer Night Routine',
            description: language === 'tr'
                ? 'Okuma hızı, sesler ve uyku algılama tek akışta çalışsın.'
                : 'Keep reading speed, sounds, and sleep flow in one simple experience.',
        },
        {
            image: IMAGES.ENCHANTED_CHEST,
            icon: '✓',
            title: language === 'tr' ? 'Takip ve İlerleme' : 'Progress That Feels Real',
            description: language === 'tr'
                ? 'Profiller, rozetler ve okuma geçmişiyle düzenli kullanım oluştur.'
                : 'Use profiles, badges, and reading history to build a repeat habit.',
        },
    ];

    const handleNext = () => {
        if (currentStep < slides.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            localStorage.setItem('onboarding_complete', 'true');
            onComplete();
        }
    };

    const handleSkip = () => {
        localStorage.setItem('onboarding_complete', 'true');
        onComplete();
    };

    const currentSlide = slides[currentStep];

    return (
        <div className="fixed inset-0 z-[200] bg-bg-dark flex flex-col">
            {/* Language Selector (only on first slide) */}
            {currentStep === 0 && (
                <div
                    className="absolute z-20 right-4 flex gap-2"
                    style={{ top: 'max(env(safe-area-inset-top), 12px)' }}
                >
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3.5 py-1.5 rounded-full text-sm transition-all active:scale-95 touch-manipulation ${language === 'en'
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                        style={{ touchAction: 'manipulation' }}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage('tr')}
                        className={`px-3.5 py-1.5 rounded-full text-sm transition-all active:scale-95 touch-manipulation ${language === 'tr'
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                        style={{ touchAction: 'manipulation' }}
                    >
                        TR
                    </button>
                </div>
            )}

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute z-20 left-4 text-white/50 text-sm hover:text-white active:scale-95 touch-manipulation"
                style={{
                    top: 'max(env(safe-area-inset-top), 12px)',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent'
                }}
            >
                {language === 'tr' ? 'Atla' : 'Skip'}
            </button>

            {/* Image Section */}
            <div className="flex-1 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{
                        backgroundImage: `url("${getIllustratedImageUrl({
                            title: currentSlide.title,
                            subtitle: currentSlide.description,
                            theme: currentSlide.title,
                            src: currentSlide.image,
                            icon: currentSlide.icon
                        })}")`
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/40 to-transparent" />
                </div>
            </div>

            {/* Content Section */}
            <div className="relative z-10 px-8 pb-12 pt-6 text-center">
                {/* Icon */}
                <div className="text-6xl mb-4 animate-bounce-slow">
                    {currentSlide.icon}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-white mb-3">
                    {currentSlide.title}
                </h1>

                {/* Description */}
                <p className="text-white/60 mb-8">
                    {currentSlide.description}
                </p>

                {/* Progress Dots */}
                <div className="flex items-center justify-center gap-2 mb-8">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentStep(index)}
                            className={`h-2 rounded-full transition-all ${index === currentStep
                                    ? 'w-8 bg-primary'
                                    : 'w-2 bg-white/20'
                                }`}
                        />
                    ))}
                </div>

                {/* Next Button */}
                <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold text-lg shadow-lg shadow-primary/30"
                >
                    {currentStep === slides.length - 1
                        ? (language === 'tr' ? 'Başla' : 'Get Started')
                        : (language === 'tr' ? 'Devam' : 'Continue')}
                </button>
            </div>

            <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default Onboarding;
