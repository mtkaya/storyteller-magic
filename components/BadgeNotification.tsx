import React, { useEffect, useState } from 'react';
import { useAppState } from '../context/AppStateContext';
import { useLanguage } from '../context/LanguageContext';

const BadgeNotification: React.FC = () => {
    const { newlyUnlockedBadge, clearNewBadge } = useAppState();
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (newlyUnlockedBadge) {
            setIsVisible(true);
            setIsExiting(false);

            // Auto-dismiss after 5 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [newlyUnlockedBadge]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            clearNewBadge();
        }, 300);
    };

    if (!isVisible || !newlyUnlockedBadge) return null;

    return (
        <div
            className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isExiting ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleClose}
        >
            <div
                className={`bg-gradient-to-br from-primary/20 via-bg-card to-secondary/20 rounded-3xl p-8 mx-6 max-w-sm text-center border border-primary/30 shadow-2xl transition-all duration-300 ${isExiting ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
                onClick={e => e.stopPropagation()}
            >
                {/* Confetti effect */}
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}%`,
                                backgroundColor: ['#EE8C2B', '#8B5CF6', '#10B981', '#F59E0B', '#EC4899'][i % 5],
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${1 + Math.random()}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Badge icon */}
                <div className="relative inline-block mb-4">
                    <div className="text-8xl animate-bounce-slow">{newlyUnlockedBadge.icon}</div>
                    <div className="absolute -top-2 -right-2 text-3xl animate-spin-slow">✨</div>
                    <div className="absolute -bottom-2 -left-2 text-2xl animate-pulse">⭐</div>
                </div>

                {/* Text */}
                <h2 className="text-2xl font-bold text-primary mb-2">
                    {language === 'tr' ? 'Rozet Kazandın!' : 'Badge Unlocked!'}
                </h2>
                <h3 className="text-xl font-bold text-white mb-2">
                    {language === 'tr' ? newlyUnlockedBadge.nametr : newlyUnlockedBadge.name}
                </h3>
                <p className="text-white/60 mb-6">
                    {language === 'tr' ? newlyUnlockedBadge.descriptionTr : newlyUnlockedBadge.description}
                </p>

                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="bg-primary hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95"
                >
                    {language === 'tr' ? 'Harika!' : 'Awesome!'}
                </button>
            </div>

            <style>{`
        @keyframes confetti {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-confetti {
          animation: confetti 2s ease-in-out forwards;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default BadgeNotification;
