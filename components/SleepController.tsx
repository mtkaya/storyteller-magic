import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface SleepControllerProps {
    isActive: boolean;
    onSleepDetected: () => void;
    onUserAwake: () => void;
    inactivityTimeout?: number; // seconds before showing prompt
    goodnightDelay?: number; // seconds before closing after goodnight
}

const SleepController: React.FC<SleepControllerProps> = ({
    isActive,
    onSleepDetected,
    onUserAwake,
    inactivityTimeout = 30,
    goodnightDelay = 5,
}) => {
    const { t } = useLanguage();
    const [showPrompt, setShowPrompt] = useState(false);
    const [showGoodnight, setShowGoodnight] = useState(false);
    const [countdown, setCountdown] = useState(goodnightDelay);
    const [lastActivity, setLastActivity] = useState(Date.now());

    // Reset activity timer on any interaction
    const handleActivity = useCallback(() => {
        setLastActivity(Date.now());
        if (showPrompt) {
            setShowPrompt(false);
            setShowGoodnight(false);
            setCountdown(goodnightDelay);
            onUserAwake();
        }
    }, [showPrompt, goodnightDelay, onUserAwake]);

    // Listen for user activity
    useEffect(() => {
        if (!isActive) return;

        const events = ['touchstart', 'mousedown', 'keydown', 'scroll'];

        events.forEach(event => {
            window.addEventListener(event, handleActivity);
        });

        return () => {
            events.forEach(event => {
                window.removeEventListener(event, handleActivity);
            });
        };
    }, [isActive, handleActivity]);

    // Check for inactivity
    useEffect(() => {
        if (!isActive || showPrompt) return;

        const interval = setInterval(() => {
            const timeSinceActivity = (Date.now() - lastActivity) / 1000;

            if (timeSinceActivity >= inactivityTimeout) {
                setShowPrompt(true);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isActive, lastActivity, inactivityTimeout, showPrompt]);

    // Countdown after showing prompt
    useEffect(() => {
        if (!showPrompt) return;

        // Wait 10 seconds for user response before showing goodnight
        const promptTimer = setTimeout(() => {
            setShowGoodnight(true);
        }, 10000);

        return () => clearTimeout(promptTimer);
    }, [showPrompt]);

    // Countdown to close
    useEffect(() => {
        if (!showGoodnight) return;

        if (countdown <= 0) {
            onSleepDetected();
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [showGoodnight, countdown, onSleepDetected]);

    if (!isActive || (!showPrompt && !showGoodnight)) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-dark/95 backdrop-blur-xl"
            onClick={handleActivity}
        >
            {!showGoodnight ? (
                // "Still Listening?" prompt
                <div className="text-center animate-fade-in">
                    <div className="text-8xl mb-6 animate-bounce">🌙</div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">{t.sleep_still_listening}</h2>
                    <p className="text-white/60 text-lg mb-8">{t.sleep_tap_to_continue}</p>

                    <div className="flex justify-center gap-2">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="w-3 h-3 bg-primary rounded-full animate-pulse"
                                style={{ animationDelay: `${i * 0.3}s` }}
                            />
                        ))}
                    </div>
                </div>
            ) : (
                // "Goodnight" message with countdown
                <div className="text-center animate-fade-in">
                    <div className="relative mb-8">
                        <div className="text-9xl animate-float">😴</div>
                        <div className="absolute -top-2 -right-2 text-4xl animate-twinkle">✨</div>
                        <div className="absolute -bottom-2 -left-2 text-3xl animate-twinkle" style={{ animationDelay: '0.5s' }}>⭐</div>
                    </div>

                    <h2 className="text-4xl font-serif font-bold text-white mb-4">{t.sleep_goodnight}</h2>
                    <p className="text-white/60 text-xl mb-6">{t.sleep_sweet_dreams}</p>

                    <div className="bg-white/10 rounded-2xl px-8 py-4 inline-block">
                        <p className="text-white/50 text-sm">{t.sleep_closing}</p>
                        <p className="text-4xl font-bold text-primary">{countdown}</p>
                    </div>

                    <p className="text-white/40 text-sm mt-6">{t.sleep_tap_to_continue}</p>
                </div>
            )}

            <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default SleepController;
