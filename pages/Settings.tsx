import React, { useState } from 'react';
import { ScreenName } from '../types';
import { useLanguage, languageOptions } from '../context/LanguageContext';

interface SettingsProps {
    onNavigate: (screen: ScreenName) => void;
    onBack: () => void;
    onParentReport?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, onBack, onParentReport }) => {
    const { language, setLanguage, t } = useLanguage();
    const [sleepTimer, setSleepTimer] = useState(30); // seconds
    const [soundEffects, setSoundEffects] = useState(true);
    const [notifications, setNotifications] = useState(false);
    const [readingSpeed, setReadingSpeed] = useState(0.9);

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark text-white">
            <div className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pt-4 pb-2">
                <div className="flex items-center gap-3 px-4 mb-2">
                    <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-white/5 text-white">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-xl font-bold">{t.settings_title}</h1>
                </div>
            </div>

            <div className="p-4 space-y-6">

                {/* Subscription Banner */}
                <div
                    onClick={() => onNavigate('subscription')}
                    className="rounded-2xl bg-gradient-to-r from-secondary to-purple-900 p-5 flex items-center justify-between cursor-pointer shadow-lg active:scale-98 transition-transform"
                >
                    <div>
                        <p className="font-bold text-lg">
                            {language === 'tr' ? 'Pro\'ya Yükselt' : 'Upgrade to Pro'}
                        </p>
                        <p className="text-white/80 text-xs mt-1">
                            {language === 'tr' ? 'Sınırsız hikaye ve özelliklerin kilidini aç' : 'Unlock unlimited stories & features'}
                        </p>
                    </div>
                    <div className="size-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </div>
                </div>

                {/* Language Settings */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {t.settings_language}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        {languageOptions.map((lang, idx) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code)}
                                className={`w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${idx !== languageOptions.length - 1 ? 'border-b border-white/5' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{lang.flag}</span>
                                    <span className="font-medium">{lang.name}</span>
                                </div>
                                {language === lang.code && (
                                    <span className="material-symbols-outlined text-primary">check</span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Sleep Timer Settings */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {t.settings_sleep_timer}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-primary">bedtime</span>
                                    <span>{language === 'tr' ? 'Uyku Algılama' : 'Sleep Detection'}</span>
                                </div>
                                <span className="text-primary font-bold">{sleepTimer}s</span>
                            </div>
                            <p className="text-white/50 text-xs mb-4">
                                {language === 'tr'
                                    ? 'Bu süre boyunca etkileşim olmazsa "İyi Geceler" mesajı gösterilir'
                                    : 'Shows "Goodnight" message if no interaction for this duration'}
                            </p>
                            <div className="flex gap-2">
                                {[15, 30, 45, 60].map(time => (
                                    <button
                                        key={time}
                                        onClick={() => setSleepTimer(time)}
                                        className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${sleepTimer === time
                                            ? 'bg-primary text-bg-dark'
                                            : 'bg-white/10 text-white/70 hover:bg-white/20'
                                            }`}
                                    >
                                        {time}s
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Reading Speed */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {t.settings_reading_speed}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="material-symbols-outlined text-secondary">speed</span>
                            <span className="text-secondary font-bold">{readingSpeed}x</span>
                        </div>
                        <div className="flex gap-2">
                            {[0.5, 0.75, 0.9, 1.0, 1.25].map(speed => (
                                <button
                                    key={speed}
                                    onClick={() => setReadingSpeed(speed)}
                                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${readingSpeed === speed
                                        ? 'bg-secondary text-bg-dark'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {speed}x
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* General Settings */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {language === 'tr' ? 'Uygulama Ayarları' : 'App Settings'}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 space-y-[1px]">
                        <div className="flex items-center justify-between p-4 bg-bg-card">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">volume_up</span>
                                <span>{language === 'tr' ? 'Ses Efektleri' : 'Sound Effects'}</span>
                            </div>
                            <button
                                onClick={() => setSoundEffects(!soundEffects)}
                                className={`w-12 h-7 rounded-full relative transition-colors ${soundEffects ? 'bg-primary' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${soundEffects ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-bg-card">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">notifications</span>
                                <span>{language === 'tr' ? 'Bildirimler' : 'Notifications'}</span>
                            </div>
                            <button
                                onClick={() => setNotifications(!notifications)}
                                className={`w-12 h-7 rounded-full relative transition-colors ${notifications ? 'bg-primary' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${notifications ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                    </div>
                </section>

                {/* Parental Controls */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {t.settings_parental_controls}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5">
                        <button
                            onClick={() => onNavigate('parental_settings')}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5"
                        >
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-accent-peach">lock</span>
                                <span>{language === 'tr' ? 'Ebeveyn Kontrolleri' : 'Parental Controls'}</span>
                            </div>
                            <span className="material-symbols-outlined text-white/40">chevron_right</span>
                        </button>
                        <button
                            onClick={onParentReport}
                            className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-green-400">assessment</span>
                                <span>{language === 'tr' ? 'Ebeveyn Raporu' : 'Parent Report'}</span>
                            </div>
                            <span className="material-symbols-outlined text-white/40">chevron_right</span>
                        </button>
                    </div>
                </section>

                {/* Support */}
                <section>
                    <button className="w-full text-left text-white/60 text-sm p-4 hover:text-white transition-colors">
                        {language === 'tr' ? 'Satın Alımları Geri Yükle' : 'Restore Purchases'}
                    </button>
                    <button className="w-full text-left text-white/60 text-sm p-4 hover:text-white transition-colors">
                        {language === 'tr' ? 'Yardım & Destek' : 'Help & Support'}
                    </button>
                    <button className="w-full text-left text-red-400 text-sm p-4 hover:text-red-300 transition-colors">
                        {language === 'tr' ? 'Çıkış Yap' : 'Log Out'}
                    </button>
                </section>

                <p className="text-center text-white/20 text-xs py-4">Version 1.1.0</p>
            </div>
        </div>
    );
};

export default Settings;