import React, { useMemo, useState } from 'react';
import { ScreenName } from '../types';
import { RECENT_STORIES, LIBRARY_STORIES } from '../data';
import { useLanguage, languageOptions } from '../context/LanguageContext';
import { useAppState } from '../context/AppStateContext';
import { buildStoryPool } from '../services/storyCuration';
import {
    buildCanvaPromptRows,
    buildCanvaPromptCsv,
    downloadCanvaPromptCsv
} from '../services/canvaPromptExport';

interface SettingsProps {
    onNavigate: (screen: ScreenName) => void;
    onBack: () => void;
    onParentReport?: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onNavigate, onBack, onParentReport }) => {
    const { language, setLanguage, t } = useLanguage();
    const { settings, updateSettings, planRule, remainingGeneratedStories, customStories, activeProfile, updateProfile } = useAppState();
    const [isExportingCanva, setIsExportingCanva] = useState(false);

    const readingSpeed = activeProfile?.preferences.readingSpeed ?? 0.9;
    const sleepTimer = settings.sleepDetectionSeconds;
    const notifications = settings.notificationsEnabled;

    const canvaStoryPool = useMemo(
        () => buildStoryPool(RECENT_STORIES, LIBRARY_STORIES, customStories),
        [customStories]
    );
    const canvaScenesPerStory = 8;
    const estimatedCanvaPrompts = canvaStoryPool.length * canvaScenesPerStory;

    const handleCanvaPromptExport = () => {
        if (isExportingCanva) return;
        setIsExportingCanva(true);
        try {
            const rows = buildCanvaPromptRows(canvaStoryPool, {
                language,
                scenesPerStory: canvaScenesPerStory,
            });
            const csv = buildCanvaPromptCsv(rows);
            const dateTag = new Date().toISOString().slice(0, 10);
            const fileName = `storyteller-canva-prompts-${language}-${dateTag}.csv`;
            downloadCanvaPromptCsv(csv, fileName);
        } finally {
            setIsExportingCanva(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-bg-dark text-white">
            <div
                className="sticky top-0 z-40 bg-bg-dark/95 backdrop-blur-md border-b border-white/5 pb-2"
                style={{ paddingTop: 'max(env(safe-area-inset-top), 10px)' }}
            >
                <div className="flex items-center gap-3 px-4 mb-2">
                    <button
                        onClick={onBack}
                        className="size-11 flex items-center justify-center rounded-full hover:bg-white/5 active:scale-95 text-white touch-manipulation"
                        style={{ touchAction: 'manipulation' }}
                    >
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
                            {language === 'tr' ? 'Üyelik Planı' : 'Membership Plan'}
                        </p>
                        <p className="text-white/80 text-xs mt-1">
                            {language === 'tr'
                                ? `${planRule.nameTr} • Bugün ${remainingGeneratedStories === Infinity ? 'sınırsız' : remainingGeneratedStories} oluşturma hakkı`
                                : `${planRule.name} • ${remainingGeneratedStories === Infinity ? 'Unlimited' : remainingGeneratedStories} generations left today`}
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

                {/* Canva Prompt Export */}
                <section>
                    <h3 className="text-sm font-bold text-white/50 uppercase tracking-wider mb-3 px-1">
                        {language === 'tr' ? 'Canva İçerik Üretimi' : 'Canva Content Production'}
                    </h3>
                    <div className="bg-white/5 rounded-2xl overflow-hidden border border-white/5 p-4 space-y-3">
                        <p className="text-sm text-white/80">
                            {language === 'tr'
                                ? `${canvaStoryPool.length} hikaye için yaklaşık ${estimatedCanvaPrompts} sahne promptu indir.`
                                : `Download about ${estimatedCanvaPrompts} scene prompts for ${canvaStoryPool.length} stories.`}
                        </p>
                        <p className="text-xs text-white/50">
                            {language === 'tr'
                                ? 'CSV dosyasını Canva Bulk Create içine yükleyip görselleri toplu üretebilirsin.'
                                : 'Upload the CSV into Canva Bulk Create to generate visuals in batch.'}
                        </p>
                        <button
                            onClick={handleCanvaPromptExport}
                            disabled={isExportingCanva}
                            className="w-full py-3 rounded-xl font-bold bg-gradient-to-r from-primary to-secondary text-bg-dark disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isExportingCanva
                                ? (language === 'tr' ? 'Hazırlanıyor...' : 'Preparing...')
                                : (language === 'tr' ? 'Canva Prompt CSV İndir' : 'Download Canva Prompt CSV')}
                        </button>
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
                                        onClick={() => updateSettings({ sleepDetectionSeconds: time })}
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
                                    onClick={() => {
                                        if (!activeProfile) return;
                                        updateProfile(activeProfile.id, {
                                            preferences: {
                                                ...activeProfile.preferences,
                                                readingSpeed: speed,
                                            },
                                        });
                                    }}
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
                                <span className="material-symbols-outlined text-white/60">
                                    {settings.theme === 'dark' ? 'dark_mode' : 'light_mode'}
                                </span>
                                <span>{language === 'tr' ? 'Tema' : 'Theme'}</span>
                            </div>
                            <button
                                onClick={() => {
                                    const newTheme = settings.theme === 'dark' ? 'light' : 'dark';
                                    updateSettings({ theme: newTheme });
                                    document.documentElement.classList.remove('dark', 'light');
                                    document.documentElement.classList.add(newTheme);
                                }}
                                className={`w-12 h-7 rounded-full relative transition-colors ${settings.theme === 'dark' ? 'bg-primary' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.theme === 'dark' ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="p-4 bg-bg-card">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/60">music_note</span>
                                    <span>{language === 'tr' ? 'Müzik Sesi' : 'Music Volume'}</span>
                                </div>
                                <span className="text-primary font-bold text-sm">{Math.round(settings.musicVolume * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={Math.round(settings.musicVolume * 100)}
                                onChange={(e) => updateSettings({ musicVolume: Math.min(1, Math.max(0, Number(e.target.value) / 100)) })}
                                className="w-full accent-primary h-2 rounded-full"
                            />
                        </div>
                        <div className="p-4 bg-bg-card">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/60">graphic_eq</span>
                                    <span>{language === 'tr' ? 'Efekt Sesi' : 'Effects Volume'}</span>
                                </div>
                                <span className="text-secondary font-bold text-sm">{Math.round(settings.effectsVolume * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={Math.round(settings.effectsVolume * 100)}
                                onChange={(e) => updateSettings({ effectsVolume: Math.min(1, Math.max(0, Number(e.target.value) / 100)) })}
                                className="w-full accent-secondary h-2 rounded-full"
                            />
                        </div>
                        <div className="p-4 bg-bg-card">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="material-symbols-outlined text-white/60">record_voice_over</span>
                                    <span>{language === 'tr' ? 'Anlatım Sesi' : 'Narration Volume'}</span>
                                </div>
                                <span className="text-accent-peach font-bold text-sm">{Math.round(settings.narrationVolume * 100)}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={Math.round(settings.narrationVolume * 100)}
                                onChange={(e) => updateSettings({ narrationVolume: Math.min(1, Math.max(0, Number(e.target.value) / 100)) })}
                                className="w-full accent-primary h-2 rounded-full"
                            />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-bg-card">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">volume_up</span>
                                <span>{language === 'tr' ? 'Ses Efektleri' : 'Sound Effects'}</span>
                            </div>
                            <button
                                onClick={() => updateSettings({ soundEffects: !settings.soundEffects })}
                                className={`w-12 h-7 rounded-full relative transition-colors ${settings.soundEffects ? 'bg-primary' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${settings.soundEffects ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-bg-card">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-white/60">notifications</span>
                                <span>{language === 'tr' ? 'Bildirimler' : 'Notifications'}</span>
                            </div>
                            <button
                                onClick={() => updateSettings({ notificationsEnabled: !notifications })}
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

                <p className="text-center text-white/20 text-xs py-4">
                    {language === 'tr' ? 'Sürüm' : 'Version'} 1.1.0
                </p>
            </div>
        </div>
    );
};

export default Settings;
