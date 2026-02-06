import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { IMAGES } from '../data';

interface OnboardingProps {
    onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
    const { language, setLanguage } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);

    const slides = [
        {
            image: IMAGES.MAGIC_QUILL,
            icon: '✨',
            title: language === 'tr' ? 'Sihirli Hikayeler' : 'Magical Stories',
            description: language === 'tr'
                ? 'Yapay zeka ile kişiselleştirilmiş uyku hikayeleri'
                : 'AI-powered personalized bedtime stories',
        },
        {
            image: IMAGES.FLYING_CARPET,
            icon: '🎮',
            title: language === 'tr' ? 'İnteraktif Maceralar' : 'Interactive Adventures',
            description: language === 'tr'
                ? 'Hikayenin gidişatını sen belirle'
                : 'Choose your own path through the story',
        },
        {
            image: IMAGES.SLEEPING_CLOUD,
            icon: '🌙',
            title: language === 'tr' ? 'Tatlı Rüyalar' : 'Sweet Dreams',
            description: language === 'tr'
                ? 'Uyku zamanlayıcı ve sakinleştirici sesler'
                : 'Sleep timer and calming sounds',
        },
        {
            image: IMAGES.ENCHANTED_CHEST,
            icon: '🏆',
            title: language === 'tr' ? 'Rozetler Kazan' : 'Earn Badges',
            description: language === 'tr'
                ? 'Hikaye okuyarak başarılar aç'
                : 'Unlock achievements by reading stories',
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
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${language === 'en'
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={() => setLanguage('tr')}
                        className={`px-3 py-1 rounded-full text-sm transition-all ${language === 'tr'
                                ? 'bg-primary text-white'
                                : 'bg-white/10 text-white/60'
                            }`}
                    >
                        TR
                    </button>
                </div>
            )}

            {/* Skip Button */}
            <button
                onClick={handleSkip}
                className="absolute top-4 left-4 text-white/50 text-sm hover:text-white"
            >
                {language === 'tr' ? 'Atla' : 'Skip'}
            </button>

            {/* Image Section */}
            <div className="flex-1 relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-all duration-500"
                    style={{ backgroundImage: `url("${currentSlide.image}")` }}
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
